import React from 'react';
import { v4 as uuid } from 'uuid';
import TopProgramCards from './TopProgramCards';

//Styles:
import styled from 'styled-components';
import { MainHeader, MainContainer, StyledDivider } from './UserPowerStats';

const UserTopPrograms = ({ userPrograms }) => {
    const renderTopProgramCards = () => {
        if (userPrograms !== undefined && userPrograms.length !== 0) {
            return userPrograms.map((program) => (
                <TopProgramCards key={uuid()} name={program.programName} />
            ));
        }
    };

    return (
        <MainContainer>
            <MainHeader>Your Top Programs</MainHeader>
            <StyledDivider />
            <div>{renderTopProgramCards()}</div>
        </MainContainer>
    );
};

export default UserTopPrograms;
