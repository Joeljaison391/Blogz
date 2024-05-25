import React from 'react';
import { motion } from 'framer-motion';

interface SocialLoginButtonProps {
  src: string;
  alt: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ src, alt }) => (
  <motion.img 
    width="60" 
    height="60" 
    src={src} 
    alt={alt} 
    className="transition-transform transform hover:scale-110"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  />
);

const SocialLoginButtons: React.FC = () => {
  const socialLogins = [
    {
      src: 'https://img.icons8.com/plasticine/100/google-logo.png',
      alt: 'google-logo',
    },
    {
      src: 'https://img.icons8.com/plasticine/100/linkedin.png',
      alt: 'linkedin',
    },
    {
      src: 'https://img.icons8.com/plasticine/100/github.png',
      alt: 'github',
    },
  ];

  return (
    <div className="flex justify-center gap-1 mb-6">
      {socialLogins.map((login, index) => (
        <SocialLoginButton key={index} src={login.src} alt={login.alt} />
      ))}
    </div>
  );
};

export default SocialLoginButtons;

