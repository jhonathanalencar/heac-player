import styled from "styled-components"

export const UploadContainer = styled.section`
  width: min(600px, calc(100% - 1rem * 2));
  margin-inline: auto;
  padding-block: 4rem;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    background-color: ${(props) => props.theme['gray-800']};
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: 0.01rem 0.01rem 0.35rem ${(props) => props.theme['gray-900']};

    @media (min-width: 45em){
      padding: 2rem;
    }

    label{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      span{
        font-size: 1rem;
        color: ${(props) => props.theme['gray-300']};

        @media (min-width: 45em){
          font-size: 1.125rem;
        }
      }

      svg{
        width: 2rem;
        height: 2rem;
        color: ${(props) => props.theme['blue-700']};

        @media (min-width: 45em){
          width: 2.5rem;
          height: 2.5rem;
        }
      }

      &.file{
        cursor: pointer;
      }
    }

    input{
      width: 100%;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  button{
    background-color: ${(props) => props.theme['blue-700']};
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    @media (min-width: 45em){
      padding: 0.25rem 0.75rem;
    }

    &:not(:disabled):hover{
      background-color: ${(props) => props.theme['blue-900']};
    }
    
    &:disabled{
      opacity: 0.7;
      cursor: not-allowed;
    }

    &.hide-button{
      display: none;
    }

    
    span{
      font-size: 1rem;
      font-weight: bold;
      color: ${(props) => props.theme['gray-100']};
    }

    svg{
      width: 1.25rem;
      height: 1.25rem;
      color: ${(props) => props.theme['gray-100']};
    }
  }
`;

export const CircularProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

interface CircularProgressBarProps{
  progress: number;
}

export const CircularProgressBar = styled.div<CircularProgressBarProps>`
  width: 4rem;
  height: 4rem;
  position: relative;
  background: ${(props) => props.theme['gray-600']};
  border-radius: 50%;
  background-image: conic-gradient(
    ${(props) => props.theme['blue-900']} calc(3.6deg * ${(props) => props.progress}), 
    ${(props) => props.theme['gray-600']} 0deg
  );
  display: flex;
  align-items: center;
  justify-content: center;

  &::before{
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: ${(props) => props.theme['gray-700']};
    margin: 0.25rem;
  }

  @media (min-width: 45em){
    width: 5rem;
    height: 5rem;

    &::before{
      margin: 0.5rem;
    }
  }
`;

export const ProgressValue = styled.strong`
  position: relative;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-300']};

  @media (min-width: 45em){
    font-size: 1.125rem;
  }
`;

const UploadInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg{
    height: 1.5rem;
    width: 1.5rem;
    flex-shrink: 0;

    @media (min-width: 45em){
      height: 2rem;
      width: 2rem;
    }
  }

  span{
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => props.theme['gray-400']};
  }
`;

export const UploadCompletedContainer = styled(UploadInfoContainer)`
  svg{
    color: ${(props) => props.theme['green-400']};
  }

  button{
    background: none;
    border: none;
    cursor: pointer;
    
    svg{
      color: ${(props) => props.theme['gray-300']};
      transition: color 0.3s ease;
      height: 1.75rem;
      width: 1.75rem;
    }

    &:hover{
      svg{
        color: ${(props) => props.theme['blue-700']};
      }
    }
    
  }
`;

export const UploadFailedContainer = styled(UploadInfoContainer)`
  svg{
    color: ${(props) => props.theme['red-400']};
  }
`;