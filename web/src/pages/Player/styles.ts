import styled from "styled-components";

import { Loader } from "../../Components";

export const PlayerContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.theme['gray-900']};
  padding-block: 4rem;

  h1{
    color: ${(props) => props.theme['gray-200']};
    font-weight: bold;
    font-size: 1.75rem;
    text-align: center;
    line-height: 1;
    margin-bottom: 2rem;
    word-break: break-all;

    @media (min-width: 45em){
      font-size: 2.5rem;
    }
  }
`;

export const GoBackButton = styled.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  
  svg{
    width: 1.75rem;
    height: 1.75rem;
    color: ${(props) => props.theme['red-400']};
    transition: color 0.3s ease;
  }

  span{
    color: ${(props) => props.theme['gray-300']};
    transition: color 0.3s ease;
  }

  &:is(:hover, :focus){
    svg{
      color: ${(props) => props.theme['red-500']};
    }

    span{
      color: ${(props) => props.theme['gray-400']};
    }
  }
`;

export const PlayerCenter = styled.div`
  width: min(1100px, calc(100% - 1rem * 2));
  margin-inline: auto;
`;

export const LoaderContainer = styled(Loader.Root)`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  svg{
    width: 2.5rem;
    height: 2.5rem;
    color: ${(props) => props.theme['blue-700']};
    animation: spin 1.5s linear infinite;

    @media (min-width: 45em){
      width: 3rem;
      height: 3rem;
    }
  }

  strong{
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => props.theme['gray-400']};

    @media (min-width: 45em){
      font-size: 1.125rem;
    }
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