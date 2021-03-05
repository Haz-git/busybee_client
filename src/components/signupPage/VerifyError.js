import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from 'react-device-detect';

//Styles:

const Wrapper = styled.div`
    margin-top: -0.5em;
    position: absolute;
`;

const DeskWrapper = styled.div`
    margin-top: 0.2em;
    position: absolute;
`;

const fadeIn = keyframes`
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
    animation-name: ${fadeIn};
    -webkit-animation: fadeIn 0.8s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadeIn 0.8s; /* Firefox < 16 */
    -ms-animation: fadeIn 0.8s; /* Internet Explorer */
    -o-animation: fadeIn 0.8s; /* Opera < 12.1 */
    animation: fadeIn 0.8s;
`;

const StyledTextVisible = styled.label`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 0.5em;
    font-weight: 100;
    margin: 0;
    z-index: 10;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 0.8em;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 1.2;
    }
`;

const DeskStyledTextVisible = styled.label`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 1.1em;
    font-weight: 500;
    margin: 0;
    z-index: 10;
`;

const StyledTextInvisible = styled.label`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 0.5em;
    font-weight: 100;
    opacity: 0;
    margin: 0;
    z-index: 10;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 0.8em;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 1.2em;
    }
`;

const DeskStyledTextInvisible = styled.label`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 1.1em;
    font-weight: 500;
    opacity: 0;
    margin: 0;
    z-index: 10;
`;

//Render:

const VerifyError = ({ title, render, center }) => {
    const renderError = () => {
        if (isMobile) {
            if (render === undefined || render === false) {
                return (
                    <Wrapper>
                        <StyledTextInvisible>{title}</StyledTextInvisible>
                    </Wrapper>
                );
            } else if (render === true && center === 'true') {
                return (
                    <MainContainer>
                        <StyledTextVisible>{title}</StyledTextVisible>
                    </MainContainer>
                );
            } else if (render === true) {
                return (
                    <Wrapper>
                        <MainContainer>
                            <StyledTextVisible>{title}</StyledTextVisible>
                        </MainContainer>
                    </Wrapper>
                );
            }
        } else if (isBrowser) {
            if (render === undefined || render === false) {
                return (
                    <DeskWrapper>
                        <DeskStyledTextInvisible>
                            {title}
                        </DeskStyledTextInvisible>
                    </DeskWrapper>
                );
            } else if (render === true && center === 'true') {
                return (
                    <MainContainer>
                        <DeskStyledTextVisible>{title}</DeskStyledTextVisible>
                    </MainContainer>
                );
            } else if (render === true) {
                return (
                    <DeskWrapper>
                        <MainContainer>
                            <DeskStyledTextVisible>
                                {title}
                            </DeskStyledTextVisible>
                        </MainContainer>
                    </DeskWrapper>
                );
            }
        }
    };

    return <>{renderError()}</>;
};

export default VerifyError;
