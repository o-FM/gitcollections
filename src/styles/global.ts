import { createGlobalStyle } from 'styled-components';
import imgBG from '../assets/background.svg';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;

    @media screen and (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media screen and (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background-color: #f0f0f5;
    background-image: url(${imgBG});
    background-repeat: no-repeat;
    background-position: top;
    -wekit-font-smoothing: antialiased;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 2.5rem 1.25rem;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
