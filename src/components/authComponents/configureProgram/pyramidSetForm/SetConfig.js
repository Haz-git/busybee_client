import React from 'react';
import CustomNumberField from '../../dashboardComponents/CustomNumberField';
import CustomSelector from '../../dashboardComponents/CustomSelector';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    padding: 0.5em 1.3em;
    border-radius: 1em;
    background: #1a222f;
    margin: 1em 0;
`;

const SetLabel = styled.h2`
    font-family: 'Lato';
    font-size: 1.6em;
    font-weight: 900;
    color: #fdbc3d;
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 65% 35%;
`;

const FieldSpacer = styled.div`
    margin: 0 0.3em;
`;

//Render:

const SetConfig = ({ setNum, weightHandler, repHandler }) => {
    return (
        <MainContainer>
            <SetLabel>Set: {setNum}</SetLabel>
            <GridWrapper>
                <FieldSpacer>
                    <CustomNumberField
                        placeholder="Weight"
                        changeFunc={weightHandler}
                    />
                </FieldSpacer>
                <FieldSpacer>
                    <CustomSelector />
                </FieldSpacer>
            </GridWrapper>
            <CustomNumberField placeholder="Reps" changeFunc={repHandler} />
        </MainContainer>
    );
};

/*
    I want to be able to send back the values of Weight and Reps with the corresponding setNum. So far, all I'm thinking is to add a custom props to both Custom Number fields and conditionally rendering a specialized CustomNumberField with an onInput that would have the setNum.

    I also need to have a selector handler...oops.
*/

export default SetConfig;
