import styled from "styled-components";

import { Loader } from "../../Components";

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(1100px, calc(100% - 1rem * 2));
  margin-inline: auto;
  padding: 2rem 0 4rem;
`;

export const FilesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const LoaderContainer = styled(Loader.Root)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 2rem;

  svg{
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme['blue-700']};
    animation: spin 2s linear infinite;
  }

  strong{
    font-size: 1.125rem;
    font-weight: bold;
    color: ${(props) => props.theme['gray-300']};
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes spin{
    from{
      transform: rotate(0);
    }
    to{
      transform: rotate(360deg);
    }
  }

  @keyframes pulse{
    0%{
      opacity: 1;
    }
    50%{
      opacity: 0.6;
    }
    100%{
      opacity: 1;
    }
  }
`;