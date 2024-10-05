import React, { Suspense } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, resetPost } from '../../features/posts/createpostSlice';
import { AppDispatch, RootState } from '../../Context/store';
import { Post } from '../../utils/types';

const TitleField = React.lazy(() => import('../../components/CreatePostComponents/TitleField'));
const ContentField = React.lazy(() => import('../../components/CreatePostComponents/ContentField'));
const SubmitButton = React.lazy(() => import('../../components/CreatePostComponents/SubmitButton'));
const SummaryField = React.lazy(() => import('../../components/CreatePostComponents/SummaryField'));

interface FormValues {
  title: string;
  summary: string;
  tags: string;
  content: string;
}

const CreateNewPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.createpost);

  const extractBase64Images = (htmlContent: string): string[] => {
    const base64Images: string[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const imgTags = doc.getElementsByTagName('img');

    Array.from(imgTags).forEach((img) => {
      const src = img.getAttribute('src');
      if (src?.startsWith('data:image/')) {
        base64Images.push(src);
      }
    });

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
      
      return uploadedImages.reduce((content, { base64Image, imgUrl }) => {
        return content.replace(base64Image, imgUrl || '');
      }, htmlContent);
    } catch (error) {
      console.error('Error handling images:', error);
      return htmlContent;
    }
  };

  React.useEffect(() => {
    // Clean up form state when component unmounts
    return () => {
      dispatch(resetPost());
    };
  }, [dispatch]);

  const handleCreatePost = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      const updatedContent = await handleImages(values.content);

      const newPost: Post = {
        title: values.title,
        summary: values.summary,
        tags: [values.tags],
        content: updatedContent,
      };

       await dispatch(createPost(newPost)).unwrap();
      // console.log('Post created:', resultAction);
      navigate('/dashboard');
    } catch (err) {
      const error = err as { message?: string };
      const errorMessage = error.message || 'An error occurred while creating the post';
      setStatus({ error: errorMessage });
      console.error('Error creating post:', errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    summary: Yup.string().required('Summary is required'),
    tags: Yup.string().required('Tags are required'),
    content: Yup.string().required('Content is required'),
  });

  const renderError = (error: string | null) => {
    if (!error) return null;
    return (
      <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
        {typeof error === 'string' ? error : 'An error occurred'}
      </div>
    );
  };

  const renderLoading = () => (
    <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded" role="status">
      <span className="inline-block align-middle mr-2">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </span>
      Creating post...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <div 
          className="text-blue-600 font-bold text-3xl cursor-pointer" 
          onClick={() => navigate('/')}
        >
          Blogz
        </div>
      </header>
      
      <div>
        <h3 className="pb-7 text-4xl font-bold">Create a new post!</h3>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-6 bg-white shadow-md rounded-lg mb-6 lg:mb-0">
          <Formik
            initialValues={{ title: '', summary: '', tags: '', content: '' }}
            validationSchema={validationSchema}
            onSubmit={handleCreatePost}
          >
            {({ setFieldValue, isSubmitting, status: formikStatus }) => (
              <Form>
                <Suspense fallback={<div>Loading form fields...</div>}>
                  <TitleField />
                  <SummaryField />
                  <ContentField setFieldValue={setFieldValue} />
                  <div className="mt-16 md:mt-0">
                    <SubmitButton isSubmitting={isSubmitting} />
                  </div>
                </Suspense>
                
                {formikStatus?.error && renderError(formikStatus.error)}
                {status === "failed" && renderError(error)}
                {status === "loading" && renderLoading()}
              </Form>
            )}
          </Formik>
        </div>

        <div className="lg:w-1/3 p-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-4">Publishing Tips</h3>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                Ensure your post has a cover image set to make the most of the home feed and social media platforms.
              </li>
              <li className="mb-2">
                Share your post on social media platforms or with your co-workers or local communities.
              </li>
              <li>
                Ask people to leave questions for you in the comments. It's a great way to spark additional discussion.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;