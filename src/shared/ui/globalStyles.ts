import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    color: #212121;
    background-color: #E7F3F1;
  }

  button {
    font-family: 'Inter', sans-serif;
  }
`;
