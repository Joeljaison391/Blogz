import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import Logo from '../../assets/Logo/Logo- Black.svg'
import { useAuth } from '@/Context/AuthContext'


const EnhancedLogin = () => {
  const { login } = useAuth()

  const handleSubmit = (values: { identifier: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    login(values)
    console.log(values)
    setSubmitting(false)
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
            <img src={Logo} alt="Logo" className="h-20 w-20" />
          </motion.div>
          
          <motion.h2 
            className="text-center mb-2 font-bold text-3xl text-gray-800"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Welcome back
          </motion.h2>
          
          <motion.p 
            className="text-center mb-6 text-gray-600"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Please enter your details to login
          </motion.p>

          <motion.div 
            className="flex justify-center space-x-4 mb-6"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {[FaGoogle, FaFacebook, FaApple].map((Icon, index) => (
              <motion.button
                key={index}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 text-gray-700" />
              </motion.button>
            ))}
          </motion.div>

          <Formik
            initialValues={{ identifier: '', password: '', remember: false }}
            validationSchema={Yup.object({
              identifier: Yup.string().required('Required'),
              password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div>
                    <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                      Email or Username
                    </label>
                    <Field
                      type="text"
                      name="identifier"
                      id="identifier"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <ErrorMessage name="identifier" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign in
                  </motion.button>
                </motion.div>
              </Form>
            )}
          </Formik>

          <motion.p 
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Don't have an account?{" "}
            <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default EnhancedLogin