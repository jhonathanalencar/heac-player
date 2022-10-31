import { AnchorHTMLAttributes, forwardRef, LiHTMLAttributes, ReactNode } from "react";
import { Slot } from '@radix-ui/react-slot';

interface OptionRootProps extends LiHTMLAttributes<HTMLLIElement>{
  children: ReactNode;
}

function OptionRoot({ children, ...rest }: OptionRootProps){
  return(
    <li {...rest}>
      {children}
    </li>
  )
}

interface OptionButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement>{
  children: ReactNode;
  asChild?: boolean;
}

const OptionButton = forwardRef<HTMLAnchorElement, OptionButtonProps>(
  ({ children, asChild, ...rest }, ref) =>{
    const Comp = asChild ? Slot : 'a';

    return (
      <Comp {...rest} ref={ref}>
        {children}
      </Comp>
    )
  }
);

interface OptionIconProps{
  icon: JSX.Element;
}

function OptionIcon({ icon }: OptionIconProps){
  return(
    icon
  )
}

export const Option = {
  Root: OptionRoot,
  Button: OptionButton,
  Icon: OptionIcon,
}