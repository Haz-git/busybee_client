import React from 'react';

//Styles:
import styled, { keyframes } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const fadeLoading = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const MainContainer = styled.div`
    position: fixed;
    display: block;
    height: 100vh;
    width: 100vw;
    background-color: ${({ theme }) => theme.background};
    /* animation-name: ${fadeLoading}; */
    -webkit-animation: ${fadeLoading} 0.4s linear; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: ${fadeLoading} 0.4s linear; /* Firefox < 16 */
    -ms-animation: ${fadeLoading} 0.4s linear; /* Internet Explorer */
    -o-animation: ${fadeLoading} 0.4s linear; /* Opera < 12.1 */
    animation: ${fadeLoading} 0.4s linear;
    z-index: 9999;
`;

const SpinnerContainer = styled.div`
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.SpinnerColor};
`;

const LoadingCharacterContainer = styled.div`
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
`;

const LoadingCharacters = styled.h1`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1.5em;
    font-weight: 900;
    color: ${({ theme }) => theme.SpinnerCharacter};
`;

//Render:

const LoadingPage = ({ renderLoading }) => {
    if (renderLoading === true) {
        return (
            <>
                <MainContainer>
                    <SpinnerContainer>
                        <CircularProgress
                            size={120}
                            color="inherit"
                            thickness={1}
                        />
                    </SpinnerContainer>
                    <LoadingCharacterContainer>
                        <LoadingCharacters>
                            Re-racking Dumbbells...
                        </LoadingCharacters>
                    </LoadingCharacterContainer>
                </MainContainer>
            </>
        );
    } else {
        return null;
    }
};

export default LoadingPage;
