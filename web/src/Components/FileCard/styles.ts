import styled from "styled-components";

import { Loader } from "../Loader";

export const FileCardContainer = styled.div`
  max-width: 18rem;
  aspect-ratio: 16 / 9;
  border-radius: 0.25rem;
  overflow: hidden;
  border: 0.2rem solid ${(props) => props.theme['gray-700']};
  outline: 0.15rem solid ${(props) => props.theme['blue-700']};
  background-color: ${(props) => props.theme['gray-900']};
  cursor: pointer;
  transition: opacity 0.3s ease;
  position: relative;
  animation: slideUp 0.5s ease-in-out;

  @keyframes slideUp{
    0%{
      transform: translateY(25%);
      opacity: 0;
    }
    100%{
      transform: translateY(0);
      opacity: 1;
    }
  }

  &:hover{
    img{
      opacity: 0.6;
    }

    button{
      opacity: 1;
    }
  }

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  strong{
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 0.5rem;
    width: 100%;
    height: 1.5rem;
    background-image: linear-gradient(transparent, ${(props) => props.theme['gray-900']});
    backdrop-filter: blur(4px);
    color: ${(props) => props.theme['gray-100']};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
  }

  button{
    transition: opacity 0.3s ease;
    opacity: 0;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  svg{
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
    transition: color 0.3s ease;

    &:hover{
      color: ${(props) => props.theme['red-300']};
    }
  }
`;

export const LoaderContainer = styled(Loader.Root)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);

  svg{
    height: 1.75rem;
    width: 1.75rem;
    color: ${(props) => props.theme['gray-100']};
    animation: spin 0.5s linear infinite;
  }

  @keyframes spin{
    from{
      transform: rotate(0);
    }
    to{
      transform: rotate(360deg);
    }
  }
`;
