import React from 'react'
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast'
import { FaUser, FaGithub, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaCode, FaGraduationCap, FaBriefcase } from 'react-icons/fa'

type EditableUserFields = {
  username: string
  avatarUrl: string
  githubHandle: string
  linkedinHandle: string
  personalWebsite: string
  education: string
  workPronoun: string
  about: string
  skills: string
  availableFor: string
  currentlyHacking: string
  location: string
  currentlyLearning: string
  brandColor: string
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  avatarUrl: Yup.string().url('Invalid URL'),
  githubHandle: Yup.string(),
  linkedinHandle: Yup.string(),
  personalWebsite: Yup.string().url('Invalid URL'),
  education: Yup.string(),
  workPronoun: Yup.string(),
  about: Yup.string().max(500, 'About must be 500 characters or less'),
  skills: Yup.string(),
  availableFor: Yup.string(),
  currentlyHacking: Yup.string(),
  location: Yup.string(),
  currentlyLearning: Yup.string(),
  brandColor: Yup.string().matches(/^#([0-9A-F]{3}){1,2}$/i, 'Invalid color format')
})

const EditProfile: React.FC = () => {
  // Mock data for testing
  const initialValues: EditableUserFields = {
    username: 'johndoe',
    avatarUrl: 'https://example.com/avatar.jpg',
    githubHandle: 'johndoe',
    linkedinHandle: 'johndoe',
    personalWebsite: 'https://johndoe.com',
    education: 'B.Tech in Computer Science',
    workPronoun: 'He/Him',
    about: 'I am a software developer passionate about Web3 technologies.',
    skills: 'JavaScript, React, Node.js, Web3',
    availableFor: 'Freelance, Full-time',
    currentlyHacking: 'A Web3 decentralized app',
    location: 'San Francisco, CA',
    currentlyLearning: 'Solidity, Rust',
    brandColor: '#3498db'
  }

  const handleSubmit = async (values: EditableUserFields) => {
    console.log('Form submitted with values:', values)
    toast.success('Profile updated successfully')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Field
                    name="username"
                    type="text"
                    className={`pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.username && touched.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar URL
                </label>
                <Field
                  name="avatarUrl"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.avatarUrl && touched.avatarUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <ErrorMessage name="avatarUrl" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="githubHandle" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Handle
                </label>
                <div className="relative">
                  <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Field
                    name="githubHandle"
                    type="text"
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="linkedinHandle" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Handle
                </label>
                <div className="relative">
                  <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Field
                    name="linkedinHandle"
                    type="text"
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="personalWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                  Personal Website
                </label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Field
                    name="personalWebsite"
                    type="text"
                    className={`pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.personalWebsite && touched.personalWebsite ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                <ErrorMessage name="personalWebsite" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Field
                    name="location"
                    type="text"
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                About
              </label>
              <Field
                as="textarea"
                name="about"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.about && touched.about ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="about" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma-separated)
              </label>
              <div className="relative">
                <FaCode className="absolute left-3 top-3 text-gray-400" />
                <Field
                  name="skills"
                  type="text"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="availableFor" className="block text-sm font-medium text-gray-700 mb-1">
                Available For (comma-separated)
              </label>
              <Field
                name="availableFor"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="currentlyHacking" className="block text-sm font-medium text-gray-700 mb-1">
                Currently Hacking On
              </label>
              <Field
                name="currentlyHacking"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="currentlyLearning" className="block text-sm font-medium text-gray-700 mb-1">
                Currently Learning
              </label>
              <Field
                name="currentlyLearning"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              <div className="relative">
                <FaGraduationCap className="absolute left-3 top-3 text-gray-400" />
                <Field
                  name="education"
                  type="text"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="workPronoun" className="block text-sm font-medium text-gray-700 mb-1">
                Work Pronoun
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                <Field
                  name="workPronoun"
                  type="text"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="brandColor" className="block text-sm font-medium text-gray-700 mb-1">
                Brand Color
              </label>
              <Field
                name="brandColor"
                type="color"
                className="w-20 h-10 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Save Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
}

export default EditProfile
