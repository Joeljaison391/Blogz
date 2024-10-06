import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '@/Context/AuthContext'

const ForgotPassword: React.FC = () => {
  const { requestPasswordReset } = useAuth()

  const handleSubmit = async (values: { email: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      await requestPasswordReset(values.email)
      // Handle success (e.g., show a success message)
      alert('Password reset link has been sent to your email')
    } catch (error) {
      console.error('Error requesting password reset:', error)
      // Handle error (e.g., show an error message)
      alert('Failed to send password reset link. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 py-4 px-2 flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,0 C30,50 70,50 100,0 L100,100 L0,100 Z"
            fill="rgba(59, 130, 246, 0.1)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <motion.div 
        className="relative bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10">
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaEnvelope className="text-blue-600 text-5xl" />
          </motion.div>
          
          <motion.h2 
            className="text-center mb-2 font-bold text-3xl text-gray-800"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Forgot Password
          </motion.h2>
          
          <motion.p 
            className="text-center mb-6 text-gray-600"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Enter your email address to reset your password
          </motion.p>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset Password
                  </motion.button>
                </motion.div>
              </Form>
            )}
          </Formik>

          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link to="/auth/login" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500">
              <FaArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
