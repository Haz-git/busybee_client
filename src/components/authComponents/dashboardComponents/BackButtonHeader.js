import React from 'react';
import { Link } from 'react-router-dom';
import { isBrowser, isMobileOnly } from 'react-device-detect';

//Styles:

import styled from 'styled-components';

const MainHeaderContainer = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    text-align: left;
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.background};
    padding: 1em 1em;
    z-index: 999 !important;
`;

const MainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 1.8em;
    color: ${({ theme }) => theme.CMHeaderC};
    font-weight: 900;
    margin-bottom: 0.2em;
    text-shadow: 2px 2px 2px #14181f;
    white-space: nowrap;

    @media only screen and (min-width: 375px) {
        font-size: 1.75em;
    }

    @media screen and (min-width: 414px) {
        font-size: 1.9em;
    }
`;

const BrowserMainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 3em;
    color: ${({ theme }) => theme.CMHeaderC};
    font-weight: 900;
    margin-bottom: 0.2em;
    text-shadow: 2px 2px 2px #14181f;
    white-space: nowrap;
`;

const ExerciseHeader = styled.h2`
    font-family: 'Lato';
    font-size: 1.3em;
    color: ${({ theme }) => theme.CMExerciseC};
    font-weight: 900;
    margin-bottom: 0.2em;
    text-shadow: 2px 2px 2px #14181f;

    @media only screen and (min-width: 375px) {
        font-size: 1.5em;
    }
`;

const BrowserExerciseHeader = styled.h2`
    font-family: 'Lato';
    font-size: 2.1em;
    color: ${({ theme }) => theme.CMExerciseC};
    font-weight: 900;
    margin-bottom: 0.2em;
    text-shadow: 2px 2px 2px #14181f;
`;

const BackButton = styled.button`
    border: none;
    background: #3a4e55;
    border-radius: 0.4em;
    margin-right: 0.8em;
    height: 100%;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    cursor: pointer;

    &:hover {
        outline: none;
        background-color: #536870;
    }

    &:focus {
        outline: none;
        background-color: #536870;
    }
`;

const BackButtonLabel = styled.p`
    font-size: 1.1em;
    color: white;
    text-shadow: 2px 2px 2px #14181f;
`;

const BrowserBackButtonLabel = styled.p`
    font-size: 2em;
    color: white;
    text-shadow: 2px 2px 2px #14181f;
`;

const FlexWrapper = styled.div``;

//Render:
const BackButtonHeader = ({
    previousLink,
    previousButtonIcon,
    previousButtonLabel,
    headerName,
    headerDesc,
    buttonColor,
}) => {
    return (
        <>
            {isMobileOnly && (
                <MainHeaderContainer>
                    <Link to={previousLink}>
                        {buttonColor === 'default' ? (
                            <BackButton>
                                {previousButtonIcon}
                                {previousButtonLabel && (
                                    <BackButtonLabel>
                                        {previousButtonLabel}
                                    </BackButtonLabel>
                                )}
                            </BackButton>
                        ) : (
                            <BackButton
                                style={{ backgroundColor: `${buttonColor}` }}
                            >
                                {previousButtonIcon}
                                {previousButtonLabel && (
                                    <BackButtonLabel>
                                        {previousButtonLabel}
                                    </BackButtonLabel>
                                )}
                            </BackButton>
                        )}
                    </Link>
                    <FlexWrapper>
                        <MainHeader>{headerName}</MainHeader>
                        <ExerciseHeader>{headerDesc}</ExerciseHeader>
                    </FlexWrapper>
                </MainHeaderContainer>
            )}
            {isBrowser && (
                <MainHeaderContainer>
                    <Link to={previousLink}>
                        {buttonColor === 'default' ? (
                            <BackButton>
                                {previousButtonIcon}
                                {previousButtonLabel && (
                                    <BrowserBackButtonLabel>
                                        {previousButtonLabel}
                                    </BrowserBackButtonLabel>
                                )}
                            </BackButton>
                        ) : (
                            <BackButton
                                style={{ backgroundColor: `${buttonColor}` }}
                            >
                                {previousButtonIcon}
                                {previousButtonLabel && (
                                    <BrowserBackButtonLabel>
                                        {previousButtonLabel}
                                    </BrowserBackButtonLabel>
                                )}
                            </BackButton>
                        )}
                    </Link>
                    <FlexWrapper>
                        <BrowserMainHeader>{headerName}</BrowserMainHeader>
                        <BrowserExerciseHeader>
                            {headerDesc}
                        </BrowserExerciseHeader>
                    </FlexWrapper>
                </MainHeaderContainer>
            )}
        </>
    );
};

BackButtonHeader.defaultProps = {
    buttonColor: 'default',
};

export default BackButtonHeader;
