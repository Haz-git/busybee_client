import React from 'react';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.button`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.4em;
    /* width: 4em; */
    width: 12em;
    height: 12em;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    padding: 0.8em 0.8em;
    background: #1a222f;
    cursor: pointer;
    transition: 0.1s linear;

    &:hover {
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
    }

    @media screen and (min-width: 414px) {
        height: 14em;
        width: 14em;
    }
`;

const BrowserMainContainer = styled.button`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.4em;
    /* width: 4em; */
    width: 12em;
    height: 12em;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    padding: 0.8em 0.8em;
    background: #1a222f;
    cursor: pointer;
    transition: 0.1s linear;
    margin: 0 1em;

    &:hover {
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
    }

    @media screen and (min-width: 414px) {
        height: 14em;
        width: 14em;
    }
`;

const IconContainer = styled.div``;

const TextContainer = styled.div`
    margin-top: 0.4em;
`;

const TextLabel = styled.h2`
    font-family: 'Lato';
    font-weight: 700;
    font-size: 1.2em;
    color: white;
    text-shadow: rgba(0, 0, 0, 0.8) 0px 2px 4px;

    @media screen and (min-width: 414px) {
        font-size: 1.45em;
    }
`;

const SettingsCard = ({ icon, textLabel, clickFunc }) => {
    return (
        <>
            {isMobileOnly && (
                <MainContainer onClick={clickFunc}>
                    <IconContainer>{icon}</IconContainer>
                    <TextContainer>
                        <TextLabel>{textLabel}</TextLabel>
                    </TextContainer>
                </MainContainer>
            )}
            {isBrowser && (
                <BrowserMainContainer onClick={clickFunc}>
                    <IconContainer>{icon}</IconContainer>
                    <TextContainer>
                        <TextLabel>{textLabel}</TextLabel>
                    </TextContainer>
                </BrowserMainContainer>
            )}
        </>
    );
};

export default SettingsCard;
