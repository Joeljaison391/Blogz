import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import LogoOutline from "../../assets/Logo/Logo- Black.svg";
import AUTHGRAD from "../../assets/AuthPages/AUTH-GRAD.jpg";
import AuthButton from '../../ui/Buttons/AuthButton';
import SocialLoginButtons from '../../ui/Buttons/SocialLoginButtons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Register = () => {
  const { register } = useAuth();

  const handleSubmit = async (values: { username: string; email: string; password: string; confirmPassword: string ;  }) => {
    try {
      await register(values);
     
    } catch (error) {
      console.error('Error registering:', error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white py-4 px-2 flex items-center justify-center relative">
      <motion.img 
        src={AUTHGRAD} 
        alt="Background" 
        className="absolute top-0 left-0 w-full h-full" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }} 
      />
      <motion.div 
        className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-md" 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 left-0 w-full h-52">
          <motion.img 
            src="https://res.cloudinary.com/dmqus2vrc/image/upload/v1716651807/BG_LOGO_fhvflm.jpg" 
            alt="Background" 
            className="w-full h-full" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }} 
          />
        </div>

        <div className="relative z-10">
          <div className="flex justify-center my-4">
            <motion.img 
              src={LogoOutline} 
              alt="Logo" 
              className="h-40 w-36" 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 1 }} 
            />
          </div>
          <motion.p 
            className="text-center mb-1 font-medium font-ubuntu-sans-mono text-3xl" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Register
          </motion.p>
          <motion.p 
            className="text-center mb-6 text-gray-500 text-sm" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            Please enter the details to register
          </motion.p>
          <SocialLoginButtons />

          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              username: Yup.string().required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
              confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <AuthButton  type="submit" text="Register" disabled={isSubmitting} />
                </div>
                <div className="text-center">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="font-medium text-gray-800 hover:text-gray-900">
                      Login
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
