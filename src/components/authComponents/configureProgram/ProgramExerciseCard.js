import React from 'react';

//styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: white;
    padding: 1em 1em;
    margin: 1em 0;
    border-radius: 0.4em;
`;

const InfoBlock = styled.div`
    background: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const HeaderBlock = styled.div`
    background: salmon;
`;

const ValueBlock = styled.div`
    background: navy;
`;

//Render:

const ProgramExerciseCard = ({ name, id, sets, reps, weight }) => {
    return (
        <>
            <MainContainer>
                <InfoBlock>
                    <HeaderBlock>Exercise</HeaderBlock>
                    <ValueBlock>{name}</ValueBlock>
                </InfoBlock>
                <InfoBlock>
                    <HeaderBlock>sets</HeaderBlock>
                    <ValueBlock>{sets}</ValueBlock>
                </InfoBlock>
                <InfoBlock>
                    <HeaderBlock>reps</HeaderBlock>
                    <ValueBlock>{reps}</ValueBlock>
                </InfoBlock>
                <InfoBlock>
                    <HeaderBlock>weight</HeaderBlock>
                    <ValueBlock>{weight}</ValueBlock>
                </InfoBlock>
            </MainContainer>
        </>
    );
};

export default ProgramExerciseCard;
