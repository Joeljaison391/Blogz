import { Field, ErrorMessage } from 'formik';

const TitleField = () => (
  <div className="mb-4">
    <Field
      type="text"
      name="title"
      placeholder="New post title here..."
      className="w-full text-4xl font-bold border-none focus:ring-0 focus:border-none focus:outline-none mb-2 h-16"
    />
    <Field
      type="text"
      name="tags"
      placeholder="Add up to 4 tags..."
      className="w-full text-lg border-none focus:ring-0 focus:border-none focus:outline-none"
    />
    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
    <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
  </div>
);

export default TitleField;
