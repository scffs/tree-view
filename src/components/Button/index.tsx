import React, { FC } from 'react';

import './Button.css';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: FC<ButtonProps> = ({ onClick, text }) => (
  <button type='button' className='button' onClick={onClick}>{text}</button>
);

export default Button;
