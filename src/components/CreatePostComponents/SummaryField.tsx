import { Field, ErrorMessage } from 'formik';

const SummaryField = () => (
  <div className="mb-4">
    <Field
      as="textarea"
      name="summary"
      placeholder="Add a summary..."
      className="w-full h-20 border border-gray-300 rounded p-2"
    />
    <ErrorMessage name="summary" component="div" className="text-red-500 text-sm" />
  </div>
);

export default SummaryField;
