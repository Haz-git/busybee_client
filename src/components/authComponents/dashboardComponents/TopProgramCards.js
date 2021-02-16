import React from 'react';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7em 0.5em;
    box-shadow: rgba(0, 0, 0, 1) 0px 2px 5px;
    background: #27303f;
    border-radius: 0.3em;
    border: none;
    margin: 0.5em 0;
`;

const NameLabel = styled.h2`
    font-family: 'Lato', helvetica;
    font-size: 1em;
    font-weight: 700;
    color: white;
    text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 2px;
`;

const CountLabel = styled.h2`
    font-family: 'Lato', helvetica;
    font-size: 1em;
    font-weight: 700;
    color: white;
    text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 2px;
`;

//Render:

const TopProgramCards = ({ name, runCount }) => {
    return (
        <MainContainer>
            <NameLabel>{name}</NameLabel>
            <CountLabel>{runCount}</CountLabel>
        </MainContainer>
    );
};

export default TopProgramCards;
