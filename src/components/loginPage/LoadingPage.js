import React from 'react';

//Styles:
import styled, { keyframes } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const fadeLoading = keyframes`
    0% { opacity: 0 }
    10% { opacity: 0.1}
    20% { opacity: 0.2}
    30% { opacity: 0.3 }
    40% { opacity: 0.4 }
    50% { opacity: 0.5 }
    60% { opacity: 0.6 }
    70% { opacity: 0.7 }
    80% { opacity: 0.8 }
    90% { opacity: 0.9 }
    100% { opacity: 1 }
`;

const MainContainer = styled.div`
    position: fixed;
    display: block;
    height: 100vh;
    width: 100vw;
    background-color: ${({ theme }) => theme.background};
    animation-name: ${fadeLoading};
    -webkit-animation: fadeLoading 0.8s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadeLoading 0.8s; /* Firefox < 16 */
    -ms-animation: fadeLoading 0.8s; /* Internet Explorer */
    -o-animation: fadeLoading 0.8s; /* Opera < 12.1 */
    animation: fadeLoading 0.8s ease;
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
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
`;

const LoadingCharacters = styled.h1`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1em;
    font-weight: 100;
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
                            size={50}
                            color="inherit"
                            thickness={2}
                        />
                    </SpinnerContainer>
                    <LoadingCharacterContainer>
                        <LoadingCharacters>
                            Re-racking dumbbells...
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
