import React, { useState } from 'react';
import { connect } from 'react-redux';

//Styles:
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Zzz } from '@styled-icons/remix-line/Zzz';
import { Running } from '@styled-icons/fa-solid/Running';
import { PostAdd } from '@styled-icons/material/PostAdd';

//Icons:
const RestIcon = styled(Zzz)`
    height: 3em;
    width: 3em;
`;

const ExerciseIcon = styled(Running)`
    height: 3em;
    width: 3em;
`;

const AddIcon = styled(PostAdd)`
    position: absolute;
    top: 0.9em;
    right: 0.85em;
    height: 3em;
    width: 3em;
`;

//Headers/containers:

const MainContainer = styled.div`
    position: relative;
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

const ButtonContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    bottom: 17vh;
    right: 3%;
`;

//Custom Buttons:

const RestMove = keyframes`
    from {
        transform: translate(0,0);
        opacity: 0;
    }
    to {
        transform: translate(-.1em, -5em);
        opacity: 1;
    }
`;

const AddRestButtonOpening = styled.button`
    animation: ${RestMove} 0.3s ease;
    position: absolute;
    color: #ffffff;
    max-width: 5em;
    min-width: 5em;
    border: none;
    background: #096b27;
    font-family: 'Nunito', 'Lato';
    font-weight: 300;
    font-size: 1.2em;
    padding: 0.2em 4em;
    text-transform: capitalize;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(-0.1em, -5em);

    &:hover {
        outline: none;
        background-color: #62c267;
    }

    &:focus {
        outline: none;
        background-color: #62c267;
    }
`;

const ExerciseMove = keyframes`
    from {
        transform: translate(0,0);
        opacity: 0;
    }
    to {
        transform: translate(-5em, -.5em);
        opacity: 1;
    }
`;

const AddExerciseButtonOpening = styled.button`
    animation: ${ExerciseMove} 0.3s ease;
    position: absolute;
    color: #ffffff;
    max-width: 5em;
    min-width: 5em;
    border: none;
    background: #096b27;
    font-family: 'Nunito', 'Lato';
    font-weight: 300;
    font-size: 1.2em;
    padding: 0.2em 4em;
    text-transform: capitalize;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(-5em, -0.5em);

    &:hover {
        outline: none;
        background-color: #62c267;
    }

    &:focus {
        outline: none;
        background-color: #62c267;
    }
`;

const AddButton = withStyles({
    root: {
        position: 'relative',
        color: '#ffffff',
        margin: '0',
        maxWidth: '5em',
        minWidth: '5em',
        height: '5em',
        backgroundColor: '#096B27',
        borderRadius: '50%',
        padding: '1em 1em',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 8px',
        '&:hover': {
            backgroundColor: '#62c267',
        },
        '@media only screen and (min-width: 375px)': {
            padding: '1em 1em',
        },
    },
})(Button);

const ExerciseMoveClose = keyframes`
    from {
        transform: translate(-5em, -.5em);
        opacity: 1;
    }
    to {
        transform: translate(0,0);
        opacity: 0;
    }
`;

const AddExerciseButtonClosing = styled.button`
    animation: ${ExerciseMoveClose} 0.3s ease;
    position: absolute;
    color: #ffffff;
    max-width: 5em;
    min-width: 5em;
    border: none;
    background: #096b27;
    font-family: 'Nunito', 'Lato';
    font-weight: 300;
    font-size: 1.2em;
    padding: 0.2em 4em;
    text-transform: capitalize;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(0, 0);
    opacity: 0;

    &:hover {
        outline: none;
        background-color: #62c267;
    }

    &:focus {
        outline: none;
        background-color: #62c267;
    }
`;

const RestMoveClose = keyframes`
    from {
        transform: translate(-.1em, -5em);
        opacity: 1;
    }
    to {
        transform: translate(0,0);
        opacity: 0;
    }

`;

const AddRestButtonClosing = styled.button`
    animation: ${RestMoveClose} 0.3s ease;
    position: absolute;
    color: #ffffff;
    max-width: 5em;
    min-width: 5em;
    border: none;
    background: #096b27;
    font-family: 'Nunito', 'Lato';
    font-weight: 300;
    font-size: 1.2em;
    padding: 0.2em 4em;
    text-transform: capitalize;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(0, 0);
    opacity: 0;

    &:hover {
        outline: none;
        background-color: #62c267;
    }

    &:focus {
        outline: none;
        background-color: #62c267;
    }
`;

// const Rotate = styled.div`
//     display: inline-block;
//     animation: ${rotate} 2s linear infinite;
//     padding: 5px;
//     font-size: 1.2rem;
//     background: 'white';
// `;

//Render:

const ConfigureMain = ({
    match: {
        params: { name, id },
    },
}) => {
    //id === programId.
    const [stateAddButtons, setStateAddButtons] = useState(false);

    //Click function to close state of addButtons:

    const showAddButtons = () => {
        if (stateAddButtons === true) {
            setStateAddButtons(false);
        } else {
            setStateAddButtons(true);
        }
    };

    return (
        <>
            <MainContainer>
                <HeaderContainer>
                    <MainHeader>{name}</MainHeader>
                    <ExerciseHeader>0 Total Exercises</ExerciseHeader>
                </HeaderContainer>
            </MainContainer>
            <ButtonContainer>
                {stateAddButtons === false ? (
                    <AddExerciseButtonOpening>
                        Add Exercise
                    </AddExerciseButtonOpening>
                ) : (
                    <AddExerciseButtonClosing>
                        Add Exercise
                    </AddExerciseButtonClosing>
                )}
                {stateAddButtons === false ? (
                    <AddRestButtonOpening>Add Rest</AddRestButtonOpening>
                ) : (
                    <AddRestButtonClosing>Add Rest</AddRestButtonClosing>
                )}
                <AddButton onClick={showAddButtons}>
                    <AddIcon />
                </AddButton>
            </ButtonContainer>
        </>
    );
};

export default ConfigureMain;
