import React from 'react';

//Styles:
import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
    from {
        transform: translateY(-10%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const MainContainer = styled.div`
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: 65% 35%;
    align-items: center;
    justify-content: space-between;
    padding: 0.7em 0.5em;
    box-shadow: rgba(0, 0, 0, 0.85) 0px 2px 5px;
    background: #27303f;
    border-radius: 0.3em;
    border: none;
    margin: 0.5em 0;
    animation: ${fadeIn} 0.3s ease;
    @media screen and (min-width: 414px) {
        padding: 1em 0.7em;
    }
`;

export const NameLabel = styled.h2`
    font-family: 'Lato', helvetica;
    font-size: 0.9em;
    font-weight: 400;
    color: white;
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 2px;
    word-break: break-word;

    @media screen and (min-width: 414px) {
        font-size: 1.1em;
    }
`;

export const CountLabel = styled.h2`
    font-family: 'Lato', helvetica;
    font-size: 0.9em;
    font-weight: 700;
    color: white;
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 2px;
    text-align: right;

    @media screen and (min-width: 414px) {
        font-size: 1.1em;
    }
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
