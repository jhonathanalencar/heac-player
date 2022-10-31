import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font: inherit;
  }

  html,
  body,
  #root{
    height: 100%;
  }

  body{
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: ${(props) => props.theme['gray-700']};
    color: ${(props) => props.theme['gray-400']};
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
  }

  .visually-hidden{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;