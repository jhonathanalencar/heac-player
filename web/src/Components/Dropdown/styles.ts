import styled from "styled-components";
import { Option } from "./components/Option";

export const DropdownContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme['blue-900']};
  width: 10rem;
  border-radius: 0.25rem;
  margin: auto;
  padding: 0.5rem;
  transition: height 0.3s ease;
  overflow: hidden;
  position: absolute;
  bottom: 0rem;
  right: 2rem;
  
  >div{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  @media (min-width: 30em){
    bottom: 2rem;
    right: 0.75rem;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  width: 100%;
  height: auto;
  transform: translateX(0);
  animation: fadeIn 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @keyframes fadeIn{
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
`;

export const MenuItem = styled(Option.Root)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;

  border-radius: 0.25rem;
  background-color: ${(props) => props.theme['gray-600']};
  color: ${(props) => props.theme['gray-400']};
  width: 100%;
  text-align: left;
  padding: 0.25rem;

  &:focus-within{
    box-shadow: 0 0 0 0.15rem ${(props) => props.theme['red-400']};
  }

  &:hover{
    filter: brightness(1.2);
  }

  &.active{
    a{
      color: ${(props) => props.theme['gray-100']};
    }
  }
  
  button{
    width: 100%;
    display: inline-flex;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme['gray-400']};
    cursor: pointer;
  }

  a{
    width: 100%;
    display: block;
    text-decoration: none;
    color: ${(props) => props.theme['gray-400']};
    line-height: 1;
    outline: none;
    font-weight: bold;
  }

  svg{
    height: 1.25rem;
    width: 1.25rem;
    flex-shrink: 0;
  }

  @media (min-width: 30em){
    padding: 0.5rem;
  }
`;