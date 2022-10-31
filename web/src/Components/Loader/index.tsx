import { HTMLAttributes, ReactNode } from 'react';

interface LoaderRootProps extends HTMLAttributes<HTMLDivElement>{
  children: ReactNode;
}

function LoaderRoot({ children, ...rest }: LoaderRootProps){
  return(
    <div {...rest}>
      {children}
    </div>
  )
}

interface LoaderIconProps{
  icon: JSX.Element;
}

function LoaderIcon({ icon }: LoaderIconProps){
  return(
    icon
  )
}

interface LoaderTitleProps extends HTMLAttributes<HTMLElement>{
  children: ReactNode;
}

function LoaderTitle({ children, ...rest }: LoaderTitleProps){
  return(
    <strong {...rest}>
      {children}
    </strong>
  )
}

export const Loader = {
  Root: LoaderRoot,
  Icon: LoaderIcon,
  Title: LoaderTitle,
}