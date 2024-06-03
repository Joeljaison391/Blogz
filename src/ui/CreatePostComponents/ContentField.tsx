import React from 'react';
import { Field, ErrorMessage, FormikHelpers } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ContentFieldProps {
  setFieldValue: FormikHelpers<any>['setFieldValue'];
}

const ContentField: React.FC<ContentFieldProps> = ({ setFieldValue }) => {
  const [content, setContent] = React.useState<string>('');

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
    <div className="mb-6 pb-4 h-64">
      <ReactQuill
        value={content}
        onChange={(value) => {
          setContent(value);
          setFieldValue('content', value);
        }}
        modules={modules}
        formats={formats}
        className="mt-1 quillIMG h-52"
      />
      <Field type="hidden" name="content" value={content} />
      <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default ContentField;


