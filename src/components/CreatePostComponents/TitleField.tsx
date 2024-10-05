import React from 'react'
import { Field, ErrorMessage } from 'formik'

const TitleField: React.FC = () => {
  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <Field
          type="text"
          name="title"
          placeholder="New post title here..."
          className="w-full text-4xl font-bold bg-transparent border-b border-gray-200 focus:border-blue-500 focus:ring-0 focus:outline-none transition duration-300 pb-2"
        />
        <ErrorMessage name="title">
          {(msg) => <div className="absolute -bottom-6 left-0 text-red-500 text-sm">{msg}</div>}
        </ErrorMessage>
      </div>
      <div className="relative mt-8">
        <Field
          type="text"
          name="tags"
          placeholder="Add up to 4 tags..."
          className="w-full text-lg bg-transparent border-b border-gray-200 focus:border-blue-500 focus:ring-0 focus:outline-none transition duration-300 pb-2"
        />
        <ErrorMessage name="tags">
          {(msg) => <div className="absolute -bottom-6 left-0 text-red-500 text-sm">{msg}</div>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default TitleField