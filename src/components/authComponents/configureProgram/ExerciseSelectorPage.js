import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddExerciseOptionButton from './AddExerciseOptionButton';
import history from '../../../components/historyObject';

//Importing Constants:
import {
    NEW_PROGRAM_EXERCISE,
    EXISTING_STAT_PROGRAM_EXERCISE,
    MAIN_LIFT_PROGRAM_EXERCISE,
    CARDIO_PROGRAM_EXERCISE,
} from './programExerciseConstants';

//Redux:
import {
    addNewProgramExercise,
    addNewCardio,
} from '../../../redux/userProgramExercises/programExerciseActions';
import { getUserStatData } from '../../../redux/userStats/userStatActions';
import { getUserLiftingData } from '../../../redux/userPowerLifts/powerLiftActions';

//Repurposing StatCardRecordModal to enter a new exercise:
import RecordCardAddModal from '../statsDashboard/RecordCardAddModal';

//AddStatModal:
import StatSelectModal from './StatSelectModal';

//import CardioSelectModal for cardio exercises:
import CardioSelectModal from './CardioSelectModal';

//Styles:
import styled from 'styled-components';
import { NewReleases } from '@styled-icons/material-sharp/NewReleases';
import { Notepad } from '@styled-icons/boxicons-solid/Notepad';
import { Columns } from '@styled-icons/boxicons-regular/Columns';
import { Pyramid } from '@styled-icons/boxicons-solid/Pyramid';
import { Run } from '@styled-icons/boxicons-regular/Run';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    HeaderContainer,
    MainHeader,
    ExerciseHeader,
    FlexWrapper,
    BackButton,
    BackIcon,
} from './ConfigureMain';

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

const CustomSnackBar = withStyles(() => ({
    anchorOriginBottomCenter: {
        marginBottom: '4.5em',
    },
}))(Snackbar);

//Icons:

const RunIcon = styled(Run)`
    height: 4em;
    width: 4em;
    color: #fdbc3d;
`;

const PyramidIcon = styled(Pyramid)`
    height: 4em;
    width: 4em;
    color: #fdbc3d;
`;

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
    margin-bottom: 2.5em;
`;

//Options for MainLiftModal:

const mainLiftOptions = [
    {
        exerciseName: 'Bench',
    },
    {
        exerciseName: 'Squat',
    },
    {
        exerciseName: 'Deadlift',
    },
];

//Slide transition function for MUI:

function slideTransition(props) {
    return (
        <Slide
            {...props}
            direction="up"
            timeout={{
                enter: 400,
                exit: 400,
            }}
        />
    );
}

const ExerciseSelectorPage = ({
    match: {
        params: { name, id },
    },
    addNewProgramExercise,
    getUserStatData,
    getUserLiftingData,
    stats,
    powerStats,
    addNewCardio,
}) => {
    //From match and params, name === programName and id === programId.
    /* 
        Options for adding new exercises:
        1. Add completely new exercise,
        2. Use exercise recorded in stat log
        3. Use main stat exercise.

    */

    useEffect(() => {
        getUserStatData();
        getUserLiftingData();
    }, []);

    //States for SnackBars:
    const [
        openAddProgramExerciseSnackBar,
        setOpenAddProgramExerciseSnackBar,
    ] = useState(false);

    //Modal States:
    const [stateAddNewExerciseModal, setStateAddNewExerciseModal] = useState(
        false
    );
    const [stateStatModal, setStateStatModal] = useState(false);
    const [stateMainLiftModal, setStateMainLiftModal] = useState(false);
    const [stateCardioModal, setStateCardioModal] = useState(false);

    //State for add New Exercise Modal:
    const [exerciseName, setExerciseName] = useState(null);
    const [weightInput, setWeightInput] = useState(null);
    const [setsInput, setSetsInput] = useState(null);
    const [repsInput, setRepsInput] = useState(null);
    const [unitSelect, setUnitSelect] = useState(null);

    //State for adding a new Cardio Exercise:
    const [cardioExerciseName, setCardioExerciseName] = useState(null);
    const [cardioMinutes, setCardioMinutes] = useState(null);
    const [cardioSeconds, setCardioSeconds] = useState(null);

    //Stat select handler state:
    const [statSelected, setStatSelected] = useState(null);

    //The main lift selector will also use the same function:
    const handleStatSelected = (e) => {
        setStatSelected(e.target.value);
    };

    //Function handlers for adding a new exercise//////////////:

    const openAddNewExerciseModal = () => {
        setStateAddNewExerciseModal(true);
    };

    const closeAddNewExerciseModal = () => {
        setStateAddNewExerciseModal(false);
    };

    const handleNameChange = (e) => {
        setExerciseName(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeightInput(e.target.value);
    };

    const handleRepsChange = (e) => {
        setRepsInput(e.target.value);
    };

    const handleSetsChange = (e) => {
        setSetsInput(e.target.value);
    };

    const handleUnitSelect = (e) => {
        setUnitSelect(e.target.value);
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        //Action creator here:
        if (
            exerciseName !== null &&
            weightInput !== null &&
            setsInput !== null &&
            repsInput !== null
        ) {
            if (
                exerciseName.trim() !== '' &&
                weightInput.trim() !== '' &&
                setsInput.trim() !== '' &&
                repsInput.trim() !== ''
            ) {
                addNewProgramExercise(
                    id,
                    NEW_PROGRAM_EXERCISE,
                    setsInput,
                    repsInput,
                    exerciseName,
                    weightInput,
                    unitSelect,
                    showNewProgramExerciseSnackBar
                );

                //Refresh all states:
                setSetsInput(null);
                setRepsInput(null);
                setExerciseName(null);
                setWeightInput(null);
                setUnitSelect(null);

                //Close modal:
                setStateAddNewExerciseModal(false);
            } else {
                alert('Please input values, or press cancel to exit.');
            }
        } else {
            alert('Please input values, or press cancel to exit.');
        }
    };

    //Select existing stat submission handler:
    const handleExistingStatSubmission = (e) => {
        e.preventDefault();
        //Action creator here:
        if (
            statSelected !== null &&
            weightInput !== null &&
            setsInput !== null &&
            repsInput !== null
        ) {
            if (
                statSelected.trim() !== '' &&
                weightInput.trim() !== '' &&
                setsInput.trim() !== '' &&
                repsInput.trim() !== ''
            ) {
                if (stateStatModal === true && stateMainLiftModal !== true) {
                    //Must mean information is derived from stat modal:
                    addNewProgramExercise(
                        id,
                        EXISTING_STAT_PROGRAM_EXERCISE,
                        setsInput,
                        repsInput,
                        statSelected,
                        weightInput,
                        unitSelect,
                        showNewProgramExerciseSnackBar
                    );
                } else if (
                    stateMainLiftModal === true &&
                    stateStatModal !== true
                ) {
                    //Indicates information is dervied from main lift modal:
                    addNewProgramExercise(
                        id,
                        MAIN_LIFT_PROGRAM_EXERCISE,
                        setsInput,
                        repsInput,
                        statSelected,
                        weightInput,
                        unitSelect,
                        showNewProgramExerciseSnackBar
                    );
                }

                //Refresh all states:
                setSetsInput(null);
                setRepsInput(null);
                setStatSelected(null);
                setWeightInput(null);
                setUnitSelect(null);

                //Close modal:
                setStateStatModal(false);

                //Since MainLiftModal is using the same submission function, close mainLift modal on submit:
                setStateMainLiftModal(false);
            } else {
                alert('Please input values, or press cancel to exit.');
            }
        } else {
            alert('Please input values, or press cancel to exit.');
        }
    };

    //Cardio Modal submission handler:

    const handleCardioSubmission = (e) => {
        e.preventDefault();

        if (
            cardioExerciseName !== null &&
            cardioMinutes !== null &&
            cardioSeconds !== null
        ) {
            if (
                cardioExerciseName.trim() !== '' &&
                cardioMinutes.trim() !== '' &&
                cardioSeconds.trim() !== ''
            ) {
                //Attach action creator here:

                addNewCardio(
                    id,
                    CARDIO_PROGRAM_EXERCISE,
                    cardioExerciseName,
                    cardioMinutes,
                    cardioSeconds
                );

                //Refresh all states:
                setCardioExerciseName(null);
                setCardioMinutes(null);
                setCardioSeconds(null);

                //Closing cardio modal:
                setStateCardioModal(false);
            } else {
                alert(
                    'Please input values in all fields, or press cancel to exit.'
                );
            }
        } else {
            alert(
                'Please input values in all fields, or press cancel to exit.'
            );
        }
    };

    //Handlers for adding from stat log:

    const openStatModal = () => {
        setStateStatModal(true);
    };

    const closeStatModal = () => {
        setStateStatModal(false);
    };

    //Handlers for adding an exercise using a main lift log:

    const openMainLiftModal = () => {
        setStateMainLiftModal(true);
    };

    const closeMainLiftModal = () => {
        setStateMainLiftModal(false);
    };

    //Handlers for cardio modal:

    const handleCardioNameInput = (e) => {
        setCardioExerciseName(e.target.value);
    };

    const handleCardioMinuteInput = (e) => {
        setCardioMinutes(e.target.value);
    };

    const handleCardioSecondInput = (e) => {
        setCardioSeconds(e.target.value);
    };

    const openCardioModal = () => {
        setStateCardioModal(true);
    };

    const closeCardioModal = () => {
        setStateCardioModal(false);
    };

    //Handler Functions for snackbars:
    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
    };

    //Controls opening the 'new program exercise' snackbar:
    const showNewProgramExerciseSnackBar = (bool) => {
        setOpenAddProgramExerciseSnackBar(bool);
    };

    //Controls closing the 'New ProgramExercise' snackbar:
    const closeNewProgramExerciseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAddProgramExerciseSnackBar(false);
    };

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
                        clickFunction={openAddNewExerciseModal}
                    />
                    <AddExerciseOptionButton
                        buttonLabel="Select from Stat Log"
                        icon={<LogIcon />}
                        clickFunction={openStatModal}
                    />
                    <AddExerciseOptionButton
                        buttonLabel="Use a Main Lift"
                        icon={<MainLiftIcon />}
                        clickFunction={openMainLiftModal}
                    />
                    <AddExerciseOptionButton
                        buttonLabel="Add a Pyramid Set"
                        icon={<PyramidIcon />}
                        clickFunction={() =>
                            history.push(
                                `/programs/configure/select/pyramid/${name}/${id}`
                            )
                        }
                    />
                    <AddExerciseOptionButton
                        buttonLabel="Add Cardio Session"
                        icon={<RunIcon />}
                        clickFunction={openCardioModal}
                    />
                </OptionsContainer>
            </MainContainer>
            <RecordCardAddModal
                ariaLab="Modal for adding a new exercise to a program"
                ariaDesc="Modal for adding a new exercise to a program"
                modalHeader="Input Exercise Details"
                openBoolean={stateAddNewExerciseModal}
                closeFunction={closeAddNewExerciseModal}
                weightFunction={handleWeightChange}
                setsFunction={handleSetsChange}
                repsFunction={handleRepsChange}
                unitFunction={handleUnitSelect}
                submitHandler={handleSubmission}
                needNameHandler={true}
                nameFunction={handleNameChange}
                maxTextLength="18"
            />
            <StatSelectModal
                ariaLab="Modal for selecting a recorded stat"
                ariaDesc="Modal for selecting a recorded stat"
                modalHeader="Select Your Stat"
                openBoolean={stateStatModal}
                closeFunction={closeStatModal}
                optionsList={stats ? stats : undefined}
                statSelected={handleStatSelected}
                weightFunction={handleWeightChange}
                setsFunction={handleSetsChange}
                repsFunction={handleRepsChange}
                unitFunction={handleUnitSelect}
                submitHandler={handleExistingStatSubmission}
                optionsDefaultValue="Stat"
            />
            <StatSelectModal
                ariaLab="Modal for selecting a main lift"
                ariaDesc="Modal for selecting a main lift"
                modalHeader="Select Your Main Lift"
                openBoolean={stateMainLiftModal}
                closeFunction={closeMainLiftModal}
                optionsList={mainLiftOptions}
                statSelected={handleStatSelected}
                weightFunction={handleWeightChange}
                setsFunction={handleSetsChange}
                repsFunction={handleRepsChange}
                unitFunction={handleUnitSelect}
                submitHandler={handleExistingStatSubmission}
                optionsDefaultValue="Main Lift"
            />
            <CardioSelectModal
                ariaLab="Modal for selecting a Cardio exercise"
                ariaDesc="Modal for selecting a Cardio exercise"
                modalHeader="Cardio Creation"
                openBoolean={stateCardioModal}
                closeFunction={closeCardioModal}
                submitHandler={handleCardioSubmission}
                nameFunction={handleCardioNameInput}
                minHandler={handleCardioMinuteInput}
                secHandler={handleCardioSecondInput}
                maxTextLength={16}
            />
            <CustomSnackBar
                open={openAddProgramExerciseSnackBar}
                autoHideDuration={4000}
                onClose={closeNewProgramExerciseSnackBar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
                        <Alert severity="success">
                            Your Exercise Has Been Added.
                        </Alert>
                    }
                />
            </CustomSnackBar>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        stats: state.stats.stats,
        powerStats: state.powerStats.powerLiftStats,
    };
};

export default connect(mapStateToProps, {
    addNewProgramExercise,
    addNewCardio,
    getUserStatData,
    getUserLiftingData,
})(ExerciseSelectorPage);
