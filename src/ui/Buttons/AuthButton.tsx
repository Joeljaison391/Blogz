import React from 'react'


interface ButtonProps {
    type: "button" | "submit" | "reset";
    text: string;
    onClick?: () => void;
    disabled?: boolean;
  }

const AuthButton: React.FC<ButtonProps> = ({ type, text, onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default AuthButton