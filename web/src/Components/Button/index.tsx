import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
}

function ButtonRoot({children, ...rest}: ButtonRootProps){
  return(
    <button {...rest}>
      {children}
    </button>
  )
}

interface ButtonIconProps{
  icon: JSX.Element;
}

function ButtonIcon({icon}: ButtonIconProps){
  return icon
}

interface ButtonTitleProps extends HTMLAttributes<HTMLSpanElement>{
  children: ReactNode;
}

function ButtonTitle({children, ...rest}: ButtonTitleProps){
  return (
    <span {...rest}>
      {children}
    </span>
  )
}

export const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Title: ButtonTitle,
}