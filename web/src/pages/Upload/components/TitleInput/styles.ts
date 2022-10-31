import styled from "styled-components";

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label{
    font-size: 1.125rem;
    color: ${(props) => props.theme['gray-300']};
  }

  input{
    border-radius: 0.25rem;
    border: none;
    height: 2rem;
    padding: 0 0.5rem;
    font-size: 1rem;
    color: ${(props) => props.theme['gray-400']};
    background-color: ${(props) => props.theme['gray-600']};
    border: 0.15rem solid ${(props) => props.theme['blue-700']};
  }
`;