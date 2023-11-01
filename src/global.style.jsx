import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    }

    .row {
        --bs-gutter-x: 0;
    }

    .container-root {
        height: 100vh;
        width: 100vw;
        padding-top: 8vh;
    }
