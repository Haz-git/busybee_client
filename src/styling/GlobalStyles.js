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
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;
