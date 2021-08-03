import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

body, input, button, textarea {
    font: 400 16px 'Roboto', sans-serif;   
}

body, html{
  background: var(--theme-page-background);
  color: var(--theme-page-text);
}
`