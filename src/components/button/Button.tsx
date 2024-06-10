import React from 'react'
import { iconMap } from '../textToIcon/TextToIcon'

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: typeof iconMap[keyof typeof iconMap];
}

const Button: React.FC<ButtonProps> = ({ label, icon, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 inline-flex items-center px-6 py-2 gap-x-2 font-semibold text-white bg-primary-500 rounded-full hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon && icon}
      {label}
    </button>
  )
}

export default Button
