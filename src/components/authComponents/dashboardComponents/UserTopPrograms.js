import React from 'react';
import { v4 as uuid } from 'uuid';
import TopProgramCards from './TopProgramCards';

//Styles:
import styled from 'styled-components';
import { MainHeader, MainContainer, StyledDivider } from './UserPowerStats';

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InfoLabel = styled.h3`
    font-size: 0.8em;
    font-weight: 900;
    color: ${({ theme }) => theme.AddMoreLabelC};
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 2px;
`;

//Render:

const UserTopPrograms = ({ userPrograms }) => {
    //Filter out any programs without 'runCount' present.
    let filteredArray = userPrograms.filter(
        (program) => program.runCount !== undefined && program.runCount !== null
    );

    //Sort array from high --> low based on runCount

    const sortedArray = filteredArray.sort((a, b) =>
        parseInt(a.orderId) > parseInt(b.orderId) ? -1 : 1
    );

    //Render top 5 objects in array into cards -->

    const renderTopProgramCards = () => {
        if (sortedArray !== undefined && sortedArray.length !== 0) {
            return sortedArray
                .slice(0, 5)
                .map((program) => (
                    <TopProgramCards
                        key={uuid()}
                        name={program.programName}
                        runCount={program.runCount}
                    />
                ));
        }
    };

    return (
        <MainContainer>
            <MainHeader>Your Top Programs</MainHeader>
            <StyledDivider />
            <LabelContainer>
                <InfoLabel>Program Name</InfoLabel>
                <InfoLabel># Of Runs</InfoLabel>
            </LabelContainer>
            <div>{renderTopProgramCards()}</div>
        </MainContainer>
    );
};

export default UserTopPrograms;
