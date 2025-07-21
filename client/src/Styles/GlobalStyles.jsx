import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        margin: 0px;
        padding: 0px;
        font-family: 'Poppins', sans-serif;
    }
`;

export default GlobalStyle;