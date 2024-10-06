import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/Context/AuthContext';

const ResetPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: { password: string; confirmPassword: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (!token) {
      console.error('Invalid token');
      return;
    }

    try {
      await resetPassword(token, values.password);
      alert('Password reset successful. You can now log in.');
      navigate('/auth/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 py-4 px-2 flex items-center justify-center">
      <motion.div 
        className="relative bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4 font-bold text-3xl text-gray-800">Reset Password</h2>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={Yup.object({
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter new password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Confirm your new password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
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
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
