import React, { Suspense } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const TitleField = React.lazy(() => import('../../components/CreatePostComponents/TitleField'));
const ContentField = React.lazy(() => import('../../components/CreatePostComponents/ContentField'));
const SubmitButton = React.lazy(() => import('../../components/CreatePostComponents/SubmitButton'));
const SummaryField = React.lazy(() => import('../../components/CreatePostComponents/SummaryField'));

const CreateNewPost = () => {
  const navigate = useNavigate();

  const extractBase64Images = (htmlContent: string): string[] => {
    const base64Images: string[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const imgTags = doc.getElementsByTagName('img');

    for (let i = 0; i < imgTags.length; i++) {
      const src = imgTags[i].getAttribute('src');
      if (src && src.startsWith('data:image/')) {
        base64Images.push(src);
      }
    }

    return base64Images;
  };

  const base64ToBlob = (base64: string): Blob => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const handleImages = async (htmlContent: string): Promise<string> => {
    try {
      const base64Images = extractBase64Images(htmlContent);
      const imgPromises = base64Images.map(async (base64Image, index) => {
        const blob = base64ToBlob(base64Image);
        const file = new File([blob], `image-${index}.png`, { type: blob.type });
        const { uploadImageToAzure } = await import('../../utils/blobService');
        const imgUrl = await uploadImageToAzure(file);
        return { base64Image, imgUrl };
      });

      const uploadedImages = await Promise.all(imgPromises);

      let updatedContent = htmlContent;
      uploadedImages.forEach(({ base64Image, imgUrl }) => {
        if (base64Image) {
          updatedContent = updatedContent.replace(base64Image, imgUrl || '');
        }
      });

      return updatedContent;
    } catch (error) {
      console.error('Error handling images:', error);
      return htmlContent;
    }
  };

  const handleCreatePost = async (values: { title: any; summary: any; tags: any; content: any; }) => {
    try {
      const updatedContent = await handleImages(values.content);

      const newPost = {
        title: values.title,
        summary: values.summary,
        tags: values.tags,
        content: updatedContent,
      };

      console.log(newPost);
      //if successful, send the newPost object to your backend and navigate to /dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    summary: Yup.string().required('Summary is required'),
    tags: Yup.string().required('Tags are required'),
    content: Yup.string().required('Content is required'),
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="text-blue-600 font-bold text-3xl cursor-pointer" onClick={() => navigate('/')}>
          Blogz
        </div>
      </header>
      <div>
        <h3 className='pb-7 text-4xl font-bold '>Create a new post!</h3>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-6 bg-white shadow-md rounded-lg mb-6 lg:mb-0">
          <Formik
            initialValues={{ title: '', summary: '', tags: '', content: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await handleCreatePost(values);
              setSubmitting(false);
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Suspense fallback={<div>Loading...</div>}>
                  <TitleField />
                  <SummaryField />
                  <ContentField setFieldValue={setFieldValue} />
                  <div className="mt-16 md:mt-0"> {/* Apply top margin on mobile */}
                    <SubmitButton isSubmitting={false} />
                  </div>
                </Suspense>
              </Form>
            )}
          </Formik>
        </div>
        <div className="lg:w-1/3 p-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-4">Publishing Tips</h3>
            <ul className="list-disc pl-5">
              <li className="mb-2">Ensure your post has a cover image set to make the most of the home feed and social media platforms.</li>
              <li className="mb-2">Share your post on social media platforms or with your co-workers or local communities.</li>
              <li>Ask people to leave questions for you in the comments. It's a great way to spark additional discussion describing personally why you wrote it or why people might find it helpful.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;
