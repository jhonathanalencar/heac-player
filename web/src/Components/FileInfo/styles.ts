import styled from 'styled-components';

export const FileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const FilePreview = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-width: 25rem;
  margin-inline: auto;
  
  video, img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FileInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  strong{
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => props.theme['gray-300']};
    word-break: break-all; 

    @media (min-width: 45em){
      font-size: 1.125rem;
    }
  }

  span{
    color: ${(props) => props.theme['gray-400']};
  }
`;