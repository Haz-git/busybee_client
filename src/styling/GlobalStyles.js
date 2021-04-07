import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        height: 100%;
        background: ${({ theme }) => theme.background};
        font-family: 'Nunito', sans-serif, helvetica;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h1 {
        margin: 0;
    }

    h2 {
        margin: 0;
    }

    h3 {
        margin: 0;
    }

    [data-tour-elem="controls"] {
        justify-content: center;
        background: #293241;
        padding: .5em .5em;
        border-radius: .4em;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }


`;
