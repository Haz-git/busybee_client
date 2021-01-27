import React from 'react';
import { connect } from 'react-redux';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: block;
    text-align: center;
    padding: 1em 1em;
    /* overflow-y: scroll; */
`;

const MainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 1.8em;
    color: ${({ theme }) => theme.CMHeaderC};
    font-weight: 900;
    margin-bottom: 0.2em;

    @media only screen and (min-width: 375px) {
        font-size: 2em;
    }
`;

const HeaderContainer = styled.div`
    text-align: left;
`;

const ExerciseHeader = styled.h2`
    font-family: 'Lato';
    font-size: 1.3em;
    color: ${({ theme }) => theme.CMExerciseC};
    font-weight: 900;
    margin-bottom: 0.2em;

    @media only screen and (min-width: 375px) {
        font-size: 1.5em;
    }
`;
//Render:

const ConfigureMain = ({
    match: {
        params: { name, id },
    },
}) => {
    //id === programId.

    return (
        <>
            <MainContainer>
                <HeaderContainer>
                    <MainHeader>{name}</MainHeader>
                    <ExerciseHeader>0 Total Exercises</ExerciseHeader>
                </HeaderContainer>
            </MainContainer>
        </>
    );
};

export default ConfigureMain;
