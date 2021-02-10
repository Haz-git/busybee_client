import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddExerciseOptionButton from './AddExerciseOptionButton';
import history from '../../../components/historyObject';

//Redux:
import { addNewProgramExercise } from '../../../redux/userProgramExercises/programExerciseActions';
import { getUserStatData } from '../../../redux/userStats/userStatActions';
import { getUserLiftingData } from '../../../redux/userPowerLifts/powerLiftActions';

//Repurposing StatCardRecordModal to enter a new exercise:
import RecordCardAddModal from '../statsDashboard/RecordCardAddModal';

//AddStatModal:
import StatSelectModal from './StatSelectModal';

//Styles:
import styled from 'styled-components';
import { NewReleases } from '@styled-icons/material-sharp/NewReleases';
import { Notepad } from '@styled-icons/boxicons-solid/Notepad';
import { Columns } from '@styled-icons/boxicons-regular/Columns';
import { Pyramid } from '@styled-icons/boxicons-solid/Pyramid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
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

const CustomSnackBar = withStyles(() => ({
    anchorOriginBottomCenter: {
        marginBottom: '6em',
    },
}))(Snackbar);

//Icons:
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

const ExerciseSelectorPage = ({
    match: {
        params: { name, id },
    },
    addNewProgramExercise,
    getUserStatData,
    getUserLiftingData,
    stats,
    powerStats,
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

    //State controls each modal:
    const [stateAddNewExerciseModal, setStateAddNewExerciseModal] = useState(
        false
    );

    const [stateStatModal, setStateStatModal] = useState(false);

    const [stateMainLiftModal, setStateMainLiftModal] = useState(false);

    //State for add New Exercise Modal:
    const [exerciseName, setExerciseName] = useState(null);
    const [weightInput, setWeightInput] = useState(null);
    const [setsInput, setSetsInput] = useState(null);
    const [repsInput, setRepsInput] = useState(null);
    const [unitSelect, setUnitSelect] = useState(null);

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
                addNewProgramExercise(
                    id,
                    setsInput,
                    repsInput,
                    statSelected,
                    weightInput,
                    unitSelect,
                    showNewProgramExerciseSnackBar
                );

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
            <Slide direction="up" in={openAddProgramExerciseSnackBar}>
                <CustomSnackBar
                    open={openAddProgramExerciseSnackBar}
                    autoHideDuration={2400}
                    onClose={closeNewProgramExerciseSnackBar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transitionDuration={300}
                >
                    <Alert severity="success">
                        Your Exercise Has Been Added.
                    </Alert>
                </CustomSnackBar>
            </Slide>
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
    getUserStatData,
    getUserLiftingData,
})(ExerciseSelectorPage);
