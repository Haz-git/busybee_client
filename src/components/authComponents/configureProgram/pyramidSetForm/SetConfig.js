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

const SetConfig = ({ setNum }) => {
    return (
        <MainContainer>
            <SetLabel>{setNum}</SetLabel>
            <GridWrapper>
                <FieldSpacer>
                    <CustomNumberField placeholder="Weight" />
                </FieldSpacer>
                <FieldSpacer>
                    <CustomSelector />
                </FieldSpacer>
            </GridWrapper>
            <CustomNumberField placeholder="Reps" />
        </MainContainer>
    );
};

export default SetConfig;
