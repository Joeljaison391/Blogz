import  { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImageToAzure } from '../../utils/blobService';
import { useNavigate } from 'react-router-dom';

const CreateNewPost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');


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

      setContent(updatedContent);
      return updatedContent;
    } catch (error) {
      console.error('Error handling images:', error);
      return htmlContent;
    }
  };

  const handleCreatePost = async (values: FormikValues) => {
    try {
      const updatedContent = await handleImages(values.content);

      const newPost = {
        title: values.title,
        summary: values.summary,
        tags: values.tags,
        content: updatedContent,
      };

      console.log(newPost);
      //if successful, send the newPost object to your backend and navigate to /dahsboard
      
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

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'align',
    'color',
    'background',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Post</h2>
      <Formik
        initialValues={{ title: '', summary: '', tags: '', content: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleCreatePost(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                Summary
              </label>
              <Field
                as="textarea"
                id="summary"
                name="summary"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="summary" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <Field
                type="text"
                id="tags"
                name="tags"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <ReactQuill
                value={content}
                onChange={(value) => {
                  setContent(value);
                  setFieldValue('content', value);
                }}
                modules={modules}
                formats={formats}
                className="mt-1 quillIMG"
              />
              <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateNewPost;
