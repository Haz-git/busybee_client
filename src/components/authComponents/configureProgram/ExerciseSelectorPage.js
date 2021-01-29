import React from 'react';
import { Link } from 'react-router-dom';
import AddExerciseOptionButton from './AddExerciseOptionButton';

//Styles:
import styled from 'styled-components';
import { NewReleases } from '@styled-icons/material-sharp/NewReleases';
import { Notepad } from '@styled-icons/boxicons-solid/Notepad';
import { Columns } from '@styled-icons/boxicons-regular/Columns';

import {
    HeaderContainer,
    MainHeader,
    ExerciseHeader,
    FlexWrapper,
    BackButton,
    BackIcon,
} from './ConfigureMain';

//Icons:
const NewIcon = styled(NewReleases)`
    height: 4em;
    width: 4em;
    color: #fdbc3d;
`;

const LogIcon = styled(Notepad)`
    height: 4em;
    width: 4em;
    color: #fdbc3d;
`;

const MainLiftIcon = styled(Columns)`
    height: 4em;
    width: 4em;
    color: #fdbc3d;
`;

const MainContainer = styled.div`
    display: block;
    text-align: center;
`;

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em 1.5em;
`;

const ExerciseSelectorPage = ({
    match: {
        params: { name, id },
    },
}) => {
    //From match and params, name === programName and id === programId.
    /* 
        Options for adding new exercises:
        1. Add completely new exercise,
        2. Use exercise recorded in stat log
        3. Use main stat exercise.

    */
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
                        <ExerciseHeader>Select Your Exercise</ExerciseHeader>
                    </FlexWrapper>
                </HeaderContainer>
                <OptionsContainer>
                    <AddExerciseOptionButton
                        buttonLabel="Add a New Exercise"
                        icon={<NewIcon />}
                    />
                    <AddExerciseOptionButton
                        buttonLabel="Use from Stat Log"
                        icon={<LogIcon />}
                    />
                    <AddExerciseOptionButton
                        buttonLabel="Use a Main Lift"
                        icon={<MainLiftIcon />}
                    />
                </OptionsContainer>
            </MainContainer>
        </>
    );
};

export default ExerciseSelectorPage;
