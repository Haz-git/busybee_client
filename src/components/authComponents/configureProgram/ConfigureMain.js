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
import { ChevronsDown } from '@styled-icons/boxicons-solid/ChevronsDown';
import { SortAlt2 } from '@styled-icons/boxicons-regular/SortAlt2';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomLoadingDots from './CustomLoadingDots';
import { withStyles } from '@material-ui/core/styles';
import { SnackbarContent } from '@material-ui/core';
import { Stack } from '@styled-icons/remix-fill/Stack';

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.6em .8em',
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
    filledSuccess: {
        background: '#156711',
    },
    filledError: {
        background: '#76251F',
    },
    filledInfo: {
        background: '#083768',
    },
}))(MuiAlert);
//Icons:
const EmptyExerciseIcon = styled(Stack)`
    height: 6em;
    width: 6em;
    color: #26292f;
`;

const EmptyExerciseContainer = styled.div`
    text-align: center;
    margin: 3em 0;
`;

const EmptyExerciseLabel = styled.h3`
    font-family: 'Lato', 'Nunito';
    font-weight: 600;
    font-size: 1.1em;
    margin: 0.4em 0;
    color: #26292f;
`;

const SortIcon = styled(SortAlt2)`
    height: 1.5em;
    width: 1.5em;
`;

const ArrowIcon = styled(ArrowRightSquareFill)`
    height: 2.2em;
    width: 2.2em;
    color: ${({ theme }) => theme.AddMoreLabelC};
`;

const HideIcon = styled(ChevronsDown)`
    position: absolute;
    top: 1em;
    right: 0.71em;
    height: 3.5em;
    width: 3.5em;
`;

export const BackIcon = styled(CaretBack)`
    height: 3.8em;
    width: 4.3em;
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
    text-shadow: 2px 2px 2px #14181f;

    @media only screen and (min-width: 375px) {
        font-size: 2em;
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    text-align: left;
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
    text-shadow: 2px 2px 2px #14181f;

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

const LayoutMove = keyframes`
    from {
        transform: translate(0,0);
        opacity: 0;
    }
    to {
        transform: translate(-0.1em, -10.4em);
        opacity: 1;
    }
`;

const EditLayoutButtonOpening = styled(Link)`
    animation: ${LayoutMove} 0.3s ease;
    position: absolute;
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: none;
    background: #ca7500;
    font-family: 'Nunito', 'Lato';
    font-weight: 900;
    font-size: 1.2em;
    padding: 0.4em 0.6em;
    text-transform: capitalize;
    border-radius: 0.4em;
    cursor: pointer;
    text-shadow: 2px 2px 2px #14181f;

    //Transforms
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(-0.1em, -10.4em);

    &:hover {
        outline: none;
        background: #fa9100;
    }

    &:focus {
        outline: none;
        background: #fa9100;
    }
`;

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
    text-shadow: 2px 2px 2px #14181f;

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
    background: #72045d;
    font-family: 'Nunito', 'Lato';
    font-weight: 900;
    font-size: 1.2em;
    padding: 0.4em 0.4em;
    text-transform: capitalize;
    border-radius: 0.4em;
    cursor: pointer;
    text-shadow: 2px 2px 2px #14181f;

    //Transforms
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(-0.1em, -7.7em);

    &:hover {
        outline: none;
        background-color: #9e2e89;
    }

    &:focus {
        outline: none;
        background-color: #9e2e89;
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
    background: #72045d;
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
        background-color: #9e2e89;
    }

    &:focus {
        outline: none;
        background-color: #9e2e89;
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

const LayoutMoveClose = keyframes`
    from {
        transform: translate(-0.1em, -10.4em);
        opacity: 1;
    }
    to {
        transform: translate(0,0);
        opacity: 0;
    }
`;

const EditLayoutButtonClosing = styled.button`
    animation: ${LayoutMoveClose} 0.3s ease;
    position: absolute;
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: none;
    background: #ca7500;
    font-family: 'Nunito', 'Lato';
    font-weight: 900;
    font-size: 1.2em;
    padding: 0.4em 0.6em;
    text-transform: capitalize;
    border-radius: 0.4em;
    cursor: pointer;
    opacity: 0;

    //Transforms
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transform: translate(0, 0);

    &:hover {
        outline: none;
        background: #fa9100;
    }

    &:focus {
        outline: none;
        background: #fa9100;
    }
`;

export const BackButton = styled.button`
    border: none;
    background: #3a4e55;
    border-radius: 0.4em;
    margin-right: 0.8em;
    height: 100%;
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
    margin-bottom: 8.7em;
`;

const LabelContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 6.5em;
    right: 6em;
    text-align: left;
`;

const AddMoreLabel = styled.h3`
    padding: 0;
    margin: 0 0.5em;
    font-size: 1.1em;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 700;
    color: ${({ theme }) => theme.AddMoreLabelC};
    white-space: nowrap;
`;

export const LoadingContainer = styled.div`
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

//Slide transition function for MUI:

function slideTransition(props) {
    return (
        <Slide
            {...props}
            direction="down"
            timeout={{
                enter: 400,
                exit: 400,
            }}
        />
    );
}

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

    //LoaderState:

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log('useEffect');
        const getUserInfo = async () => {
            const bool = await getUserProgramExerciseData(id);
            setIsLoaded(bool);
        };

        getUserInfo();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [stateSelfAddButton, setStateSelfAddButton] = useState(true);

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
            setStateSelfAddButton(false);
        } else {
            setStateAddButtons(true);
            setStateSelfAddButton(true);
        }
    };

    //Util function to count number of elements in array:
    const returnArrayCount = () => {
        if (
            programExercises.programs !== undefined &&
            programExercises.programs !== null &&
            programExercises.programs.length !== 0 &&
            isLoaded === true
        ) {
            return programExercises.programs.length;
        } else {
            return 0;
        }
    };

    //Function to render out existing programExercise cards:

    const renderProgramExerciseCards = () => {
        if (
            isLoaded === true &&
            programExercises.programs !== undefined &&
            programExercises.programs !== null &&
            returnArrayCount() !== 0
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
                    restMinutesPerSet={programExercise.restLengthMinutePerSet}
                    restSecondsPerSet={programExercise.restLengthSecondPerSet}
                    restNum={programExercise.numRest}
                    setObjectsArray={programExercise.setObjectsArray}
                />
            ));
        } else if (isLoaded === true && returnArrayCount() === 0) {
            return renderEmptyConfigureMain();
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

        setMinInput(null);
        setSecInput(null);
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

        console.log(windowBottom, docHeight);

        if (windowBottom >= docHeight) {
            //Shouldn't change the state, cause that will cause component re-render and therefore GET request again.
            setStateCardEndLabel(true);
        } else {
            setStateCardEndLabel(false);
        }
    };

    //Render function for no exercises--

    const renderEmptyConfigureMain = () => {
        return (
            <EmptyExerciseContainer>
                <EmptyExerciseIcon />
                <EmptyExerciseLabel>
                    Looks a bit empty here. Stack your favorite exercises and
                    rest periods!
                </EmptyExerciseLabel>
            </EmptyExerciseContainer>
        );
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
                <CardContainer>
                    {isLoaded !== false ? (
                        renderProgramExerciseCards()
                    ) : (
                        <LoadingContainer>
                            <CustomLoadingDots />
                        </LoadingContainer>
                    )}
                </CardContainer>
            </MainContainer>
            {stateCardEndLabel && (
                <LabelContainer>
                    <AddMoreLabel>
                        Add more exercises, or <br />
                        configure your blueprint's <br />
                        layout to finish and save.
                    </AddMoreLabel>
                    <ArrowIcon />
                </LabelContainer>
            )}
            <ButtonContainer>
                {stateAddButtons === true ? (
                    <EditLayoutButtonOpening
                        to={`/programs/configure/blueprint/${name}/${id}`}
                    >
                        <SortIcon />
                        Blueprint
                    </EditLayoutButtonOpening>
                ) : (
                    <EditLayoutButtonClosing>
                        <SortIcon />
                        Blueprint
                    </EditLayoutButtonClosing>
                )}
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
                {stateSelfAddButton === true ? (
                    <AddButton onClick={showAddButtons}>
                        <HideIcon />
                    </AddButton>
                ) : (
                    <AddButton onClick={showAddButtons}>
                        <AddIcon />
                    </AddButton>
                )}
            </ButtonContainer>
            <Snackbar
                open={openDeleteProgramExerciseSnackBar}
                autoHideDuration={4000}
                onClose={closeDeleteProgramExerciseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="error">
                            Exercise Has Been Removed.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={openAddProgramRestSnackBar}
                autoHideDuration={4000}
                onClose={closeAddProgramRestSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="info">
                            Rest Period Has Been Added.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={openDeleteProgramRestSnackBar}
                autoHideDuration={4000}
                onClose={closeDeleteProgramRestSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="error">
                            Rest Period Has Been Deleted.
                        </Alert>
                    }
                />
            </Snackbar>
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
