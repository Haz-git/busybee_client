import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Styles:
import styled from 'styled-components';
import {
    HeaderContainer,
    MainHeader,
    ExerciseHeader,
    FlexWrapper,
    BackButton,
    BackIcon,
} from './ConfigureMain';

const MainContainer = styled.div`
    display: block;
    text-align: center;
`;

const BlueprintLayoutSelectionPage = ({
    match: {
        params: { name, id },
    },
}) => {
    return (
        <>
            <MainContainer>
                <HeaderContainer>
                    <Link to={`/programs/configure/${name}/${id}`}>
                        <BackButton>
                            <BackIcon />
                        </BackButton>
                    </Link>
                    <FlexWrapper>
                        <MainHeader>{name}</MainHeader>
                        <ExerciseHeader>Format Blueprint</ExerciseHeader>
                    </FlexWrapper>
                </HeaderContainer>
            </MainContainer>
        </>
    );
};

export default BlueprintLayoutSelectionPage;
