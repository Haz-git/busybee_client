import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgramExerciseCard from './ProgramExerciseCard';
import { v4 as uuid } from 'uuid';
import TimeSelectModal from './TimeSelectModal';

//Redux:
import {
    getUserProgramExerciseData,
    addNewRestPeriod,
} from '../../../redux/userProgramExercises/programExerciseActions';

//Styles:
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import Button from '@material-ui/core/Button';
import { Zzz } from '@styled-icons/remix-line/Zzz';
import { Running } from '@styled-icons/fa-solid/Running';
import { PostAdd } from '@styled-icons/material/PostAdd';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { CaretBack } from '@styled-icons/ionicons-sharp/CaretBack';
import { ArrowRightSquareFill } from '@styled-icons/bootstrap/ArrowRightSquareFill';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.9em .5em',
        '& .MuiAlert-icon': {
            fontSize: '2.2em',
        },
        '& .MuiAlert-message': {
            fontSize: '1.4em',
            whiteSpace: 'nowrap',
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
}))(MuiAlert);

//Icons:

const ArrowIcon = styled(ArrowRightSquareFill)`
    height: 2.2em;
    width: 2.2em;
    color: ${({ theme }) => theme.AddMoreLabelC};
`;

export const BackIcon = styled(CaretBack)`
    height: 3.8em;
    width: 3.8em;
`;

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

const PlusIcon = styled(Plus)`
    height: 1.5em;
    width: 1.5em;
`;

//Headers/containers:

const MainContainer = styled.div`
    position: relative;
    display: block;
    text-align: center;
    /* padding: 1em 1em; */
    /* overflow-y: scroll; */
`;

export const MainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 1.8em;
    color: ${({ theme }) => theme.CMHeaderC};
    font-weight: 900;
    margin-bottom: 0.2em;

    @media only screen and (min-width: 375px) {
        font-size: 2em;
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    height: fit-content;
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.background};
    padding: 1em 1em;
    z-index: 999 !important;
`;

export const ExerciseHeader = styled.h2`
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
    position: fixed;
    bottom: 5.5em;
    right: 0.4em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
`;

//Custom Buttons:

const RestMove = keyframes`
    from {
        transform: translate(0,0);
        opacity: 0;
    }
    to {
        transform: translate(-0.1em, -5em);
        opacity: 1;
    }
`;

const AddRestButtonOpening = styled.button`
    animation: ${RestMove} 0.3s ease;
    position: absolute;
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: none;
    background: #323875;
    font-family: 'Nunito', 'Lato';
    font-weight: 900;
    font-size: 1.2em;
    padding: 0.4em 0.6em;
    text-transform: capitalize;
    border-radius: 0.4em;
    cursor: pointer;

    //Transforms
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(-0.1em, -5em);

    &:hover {
        outline: none;
        background-color: #535993;
    }

    &:focus {
        outline: none;
        background-color: #535993;
    }
`;

const ExerciseMove = keyframes`
    from {
        transform: translate(0,0);
        opacity: 0;
    }
    to {
        transform: translate(-0.1em, -7.7em);
        opacity: 1;
    }
`;

const AddExerciseButtonOpening = styled(Link)`
    animation: ${ExerciseMove} 0.3s ease;
    position: absolute;
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: none;
    background: #861d29;
    font-family: 'Nunito', 'Lato';
    font-weight: 900;
    font-size: 1.2em;
    padding: 0.4em 0.4em;
    text-transform: capitalize;
    border-radius: 0.4em;
    cursor: pointer;

    //Transforms
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(-0.1em, -7.7em);

    &:hover {
        outline: none;
        background-color: #ae424f;
    }

    &:focus {
        outline: none;
        background-color: #ae424f;
    }
`;

const AddButton = withStyles({
    root: {
        position: 'absolute',
        // position: '-webkit-sticky',
        // top: '0',
        color: '#ffffff',
        margin: '0',
        maxWidth: '5em',
        minWidth: '5em',
        height: '5em',
        backgroundColor: '#096B27',
        borderRadius: '50%',
        padding: '1em 1em',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 8px',
        bottom: '1em',
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
        transform: translate(-0.1em, -7.7em);
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
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: none;
    background: #861d29;
    font-family: 'Nunito', 'Lato';
    font-weight: 900;
    font-size: 1.2em;
    padding: 0.4em 0.4em;
    text-transform: capitalize;
    border-radius: 0.4em;
    transform: translate(0, 0);
    opacity: 0;

    &:hover {
        outline: none;
        background-color: #ae424f;
    }

    &:focus {
        outline: none;
        background-color: #ae424f;
    }
`;

const RestMoveClose = keyframes`
    from {
        transform: translate(-0.1em, -5em);
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
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: none;
    background: #323875;
    font-family: 'Nunito', 'Lato';
    font-weight: 900;
    font-size: 1.2em;
    padding: 0.4em 0.6em;
    text-transform: capitalize;
    border-radius: 0.4em;
    transform: translate(0, 0);
    opacity: 0;

    &:hover {
        outline: none;
        background-color: #535993;
    }

    &:focus {
        outline: none;
        background-color: #535993;
    }
`;

export const BackButton = styled.button`
    border: none;
    background: #3a4e55;
    height: 6em;
    border-radius: 0.4em;
    margin-right: 0.8em;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    cursor: pointer;

    &:hover {
        outline: none;
        background-color: #536870;
    }

    &:focus {
        outline: none;
        background-color: #536870;
    }
`;

export const FlexWrapper = styled.div``;

const CardContainer = styled.div`
    padding: 0em 1em;
    margin-bottom: 8.5em;
`;

const LabelContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 7.25em;
    right: 6em;
`;

const AddMoreLabel = styled.h3`
    padding: 0;
    margin: 0 0.5em;
    font-size: 1.7em;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 700;
    color: ${({ theme }) => theme.AddMoreLabelC};
`;
//Render:

const ConfigureMain = ({
    match: {
        params: { name, id },
    },
    getUserProgramExerciseData,
    programExercises,
    addNewRestPeriod,
}) => {
    //id === programId.

    useEffect(() => {
        getUserProgramExerciseData(id);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [stateCardEndLabel, setStateCardEndLabel] = useState(false);

    const [stateTimeSelectModal, setStateTimeSelectModal] = useState(false);
    const [minInput, setMinInput] = useState(null);
    const [secInput, setSecInput] = useState(null);

    const [stateAddButtons, setStateAddButtons] = useState(true);

    //States for SnackBars:

    const [
        openDeleteProgramExerciseSnackBar,
        setOpenDeleteProgramExerciseSnackBar,
    ] = useState(false);

    const [
        openAddProgramRestSnackBar,
        setOpenAddProgramRestSnackBar,
    ] = useState(false);

    const [
        openDeleteProgramRestSnackBar,
        setOpenDeleteProgramRestSnackBar,
    ] = useState(false);

    //Click function to close state of addButtons:

    const showAddButtons = () => {
        if (stateAddButtons === true) {
            setStateAddButtons(false);
        } else {
            setStateAddButtons(true);
        }
    };

    //Util function to count number of elements in array:
    const returnArrayCount = () => {
        if (
            programExercises.programs !== undefined &&
            programExercises.programs !== null &&
            programExercises.programs.length !== 0
        ) {
            return programExercises.programs.length;
        } else {
            return 0;
        }
    };

    //Function to render out existing programExercise cards:

    const renderProgramExerciseCards = () => {
        if (
            programExercises.programs !== undefined &&
            programExercises.programs !== null
        ) {
            return programExercises.programs.map((programExercise) => (
                <ProgramExerciseCard
                    key={uuid()}
                    name={programExercise.programExerciseName}
                    exerciseId={programExercise.programExerciseId}
                    programId={id}
                    sets={programExercise.sets}
                    reps={programExercise.reps}
                    weight={programExercise.weight}
                    deleteSnackBar={showDeleteProgramExerciseSnackBar}
                    deleteRestSnackBar={showDeleteProgramRestSnackBar}
                    minutes={programExercise.restLengthMinute}
                    seconds={programExercise.restLengthSecond}
                    restId={programExercise.restId}
                />
            ));
        }
    };

    //Handler Functions for snackbars:
    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
    };
    //Controls opening and closing 'Deleting' ProgramExercises snackbar:

    const showDeleteProgramExerciseSnackBar = (bool) => {
        setOpenDeleteProgramExerciseSnackBar(bool);
    };

    const closeDeleteProgramExerciseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteProgramExerciseSnackBar(false);
    };

    //Controls opening and closing 'rest add' snackbar:

    const showAddProgramRestSnackBar = (bool) => {
        setOpenAddProgramRestSnackBar(bool);
    };

    const closeAddProgramRestSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAddProgramRestSnackBar(false);
    };

    const showDeleteProgramRestSnackBar = (bool) => {
        setOpenDeleteProgramRestSnackBar(bool);
    };

    const closeDeleteProgramRestSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteProgramRestSnackBar(false);
    };

    //Handler functions for time select modal:

    const openTimeSelectorModal = () => {
        setStateTimeSelectModal(true);
    };

    const closeTimeSelectorModal = () => {
        setStateTimeSelectModal(false);
    };

    const secInputHandler = (e) => {
        setSecInput(e.target.value);
    };

    const minInputHandler = (e) => {
        setMinInput(e.target.value);
    };

    const timeSelectorSubmitHandler = (e) => {
        e.preventDefault();
        addNewRestPeriod(id, minInput, secInput, showAddProgramRestSnackBar);
        setStateTimeSelectModal(false);
    };

    //Handles the visibility of the 'add more' label, this label should only be visible at the bottom of the card container.

    const handleScroll = (e) => {
        const windowHeight =
            'innerHeight' in window
                ? window.innerHeight
                : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            setStateCardEndLabel(true);
        } else {
            setStateCardEndLabel(false);
        }
    };

    return (
        <>
            <MainContainer>
                <HeaderContainer>
                    <Link to="/programs">
                        <BackButton>
                            <BackIcon />
                        </BackButton>
                    </Link>
                    <FlexWrapper>
                        <MainHeader>{name}</MainHeader>
                        <ExerciseHeader>
                            {returnArrayCount()} Total Exercises
                        </ExerciseHeader>
                    </FlexWrapper>
                </HeaderContainer>
                <CardContainer>{renderProgramExerciseCards()}</CardContainer>
            </MainContainer>
            {stateCardEndLabel && (
                <LabelContainer>
                    <AddMoreLabel>Add more </AddMoreLabel>
                    <ArrowIcon />
                </LabelContainer>
            )}
            <ButtonContainer>
                {stateAddButtons === true ? (
                    <AddExerciseButtonOpening
                        to={`/programs/configure/select/${name}/${id}`}
                    >
                        <PlusIcon />
                        Exercise
                    </AddExerciseButtonOpening>
                ) : (
                    <AddExerciseButtonClosing>
                        <PlusIcon />
                        Exercise
                    </AddExerciseButtonClosing>
                )}
                {stateAddButtons === true ? (
                    <AddRestButtonOpening onClick={openTimeSelectorModal}>
                        <PlusIcon />
                        Rest
                    </AddRestButtonOpening>
                ) : (
                    <AddRestButtonClosing>
                        <PlusIcon />
                        Rest
                    </AddRestButtonClosing>
                )}
                <AddButton onClick={showAddButtons}>
                    <AddIcon />
                </AddButton>
            </ButtonContainer>
            <Slide direction="down" in={openDeleteProgramExerciseSnackBar}>
                <Snackbar
                    open={openDeleteProgramExerciseSnackBar}
                    autoHideDuration={3000}
                    onClose={closeDeleteProgramExerciseSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    transitionDuration={400}
                >
                    <Alert severity="warning">
                        Your Exercise Has Been Removed.
                    </Alert>
                </Snackbar>
            </Slide>
            <Slide direction="down" in={openAddProgramRestSnackBar}>
                <Snackbar
                    open={openAddProgramRestSnackBar}
                    autoHideDuration={5000}
                    onClose={closeAddProgramRestSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    transitionDuration={300}
                >
                    <Alert severity="info">Rest Period Has Been Added.</Alert>
                </Snackbar>
            </Slide>
            <Slide direction="down" in={openDeleteProgramRestSnackBar}>
                <Snackbar
                    open={openDeleteProgramRestSnackBar}
                    autoHideDuration={5000}
                    onClose={closeDeleteProgramRestSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    transitionDuration={300}
                >
                    <Alert severity="warning">
                        Rest Period Has Been Deleted.
                    </Alert>
                </Snackbar>
            </Slide>
            <TimeSelectModal
                openBoolean={stateTimeSelectModal}
                closeFunction={closeTimeSelectorModal}
                buttonSubmitFunction={timeSelectorSubmitHandler}
                modalDesc="Select the length of your rest period."
                modalHeader="Take a Break"
                ariaLabel="Modal for adding a rest period to program"
                ariaDesc="Modal for adding a rest period to program"
                minHandler={minInputHandler}
                secHandler={secInputHandler}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        programExercises: state.programExercises,
    };
};

export default connect(mapStateToProps, {
    getUserProgramExerciseData,
    addNewRestPeriod,
})(ConfigureMain);
