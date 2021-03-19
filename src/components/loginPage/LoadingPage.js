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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.SpinnerColor};
`;

const LoadingCharacters = styled.h1`
    margin-top: 1em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1.1em;
    font-weight: 900;
    color: ${({ theme }) => theme.SpinnerCharacter};
    white-space: nowrap;
`;

//Render:

const LoadingPage = ({ renderLoading }) => {
    if (renderLoading === true) {
        return (
            <>
                <MainContainer>
                    <SpinnerContainer>
                        <CircularProgress
                            size={70}
                            color="inherit"
                            thickness={1}
                        />
                        <LoadingCharacters>
                            Re-racking Dumbbells...
                        </LoadingCharacters>
                    </SpinnerContainer>
                </MainContainer>
            </>
        );
    } else {
        return null;
    }
};

export default LoadingPage;
