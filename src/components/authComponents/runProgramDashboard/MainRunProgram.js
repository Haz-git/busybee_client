//This component should be immediately rendered after clicking 'Confirm' on program run.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserFormattedProgram } from '../../../redux/userFormattedPrograms/formattedProgramsActions';
import { LoadingContainer } from '../configureProgram/ConfigureMain';
import CustomLoadingDots from '../configureProgram/CustomLoadingDots';

//Styles:
import styled from 'styled-components';
import {
    HeaderContainer,
    BackButton,
    FlexWrapper,
    MainHeader,
    ExerciseHeader,
} from '../configureProgram/ConfigureMain';

import { Close } from '@styled-icons/ionicons-solid/Close';

const CloseIcon = styled(Close)`
    height: 3.8em;
    width: 4.3em;
`;

const MainContainer = styled.div`
    position: relative;
    display: block;
    text-align: center;
`;

const AbortButton = styled(BackButton)`
    background: #90130c;

    &:hover {
        background: #cb484f;
    }
`;

const MainRunProgram = ({
    match: {
        params: { name, id },
    },
    formattedProgram,
    getUserFormattedProgram,
}) => {
    //LoaderState:
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadUserFormattedProgram = async () => {
            const bool = await getUserFormattedProgram(id);
            setIsLoaded(bool);
        };

        loadUserFormattedProgram();
    }, []);

    return (
        <MainContainer>
            <HeaderContainer>
                <Link to="/programs">
                    <AbortButton>
                        <CloseIcon />
                    </AbortButton>
                </Link>
                <FlexWrapper>
                    <MainHeader>{name}</MainHeader>
                    <ExerciseHeader>Test</ExerciseHeader>
                </FlexWrapper>
            </HeaderContainer>
            {isLoaded === true ? (
                <>LOADED</>
            ) : (
                <LoadingContainer>
                    <CustomLoadingDots />
                </LoadingContainer>
            )}
        </MainContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        formattedProgram:
            state.formattedProgram.formattedProgram.formattedProgram,
    };
};

export default connect(mapStateToProps, { getUserFormattedProgram })(
    MainRunProgram
);
