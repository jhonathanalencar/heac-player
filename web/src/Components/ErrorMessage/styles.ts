import styled from "styled-components";

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 1rem;
  padding-top: 2rem;

  h1{
    text-align: center;
    font-size: 1.125rem;
    color: ${(props) => props.theme['gray-200']};
    font-weight: 700;

    @media (min-width: 45em){
      font-size: 1.75rem;
    }
  }
`;