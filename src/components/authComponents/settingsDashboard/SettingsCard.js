import React from 'react';

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
`;

const SettingsCard = ({ icon, textLabel }) => {
    return (
        <MainContainer>
            <IconContainer>{icon}</IconContainer>
            <TextContainer>
                <TextLabel>{textLabel}</TextLabel>
            </TextContainer>
        </MainContainer>
    );
};

export default SettingsCard;
