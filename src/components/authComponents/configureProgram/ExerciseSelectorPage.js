import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddExerciseOptionButton from './AddExerciseOptionButton';
import history from '../../../components/historyObject';

//Redux:
import { addNewProgramExercise } from '../../../redux/userProgramExercises/programExerciseActions';

//Repurposing StatCardRecordModal to enter a new exercise:
import RecordCardAddModal from '../statsDashboard/RecordCardAddModal';

//Styles:
import styled from 'styled-components';
import { NewReleases } from '@styled-icons/material-sharp/NewReleases';
import { Notepad } from '@styled-icons/boxicons-solid/Notepad';
import { Columns } from '@styled-icons/boxicons-regular/Columns';
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
    addNewProgramExercise,
}) => {
    //From match and params, name === programName and id === programId.
    /* 
        Options for adding new exercises:
        1. Add completely new exercise,
        2. Use exercise recorded in stat log
        3. Use main stat exercise.

    */
    //States for SnackBars:
    const [
        openAddProgramExerciseSnackBar,
        setOpenAddProgramExerciseSnackBar,
    ] = useState(false);

    //State controls each modal:
    const [stateAddNewExerciseModal, setStateAddNewExerciseModal] = useState(
        false
    );

    //State for add New Exercise Modal:
    const [exerciseName, setExerciseName] = useState(null);
    const [weightInput, setWeightInput] = useState(null);
    const [setsInput, setSetsInput] = useState(null);
    const [repsInput, setRepsInput] = useState(null);
    const [unitSelect, setUnitSelect] = useState(null);

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

                setStateAddNewExerciseModal(false);
            } else {
                alert('Please input values, or press cancel to exit.');
            }
        } else {
            alert('Please input values, or press cancel to exit.');
        }
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
                    />
                    <AddExerciseOptionButton
                        buttonLabel="Use a Main Lift"
                        icon={<MainLiftIcon />}
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
            <Slide direction="down" in={openAddProgramExerciseSnackBar}>
                <Snackbar
                    open={openAddProgramExerciseSnackBar}
                    autoHideDuration={5000}
                    onClose={closeNewProgramExerciseSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    transitionDuration={300}
                >
                    <Alert severity="success">
                        Your Exercise Has Been Added.
                    </Alert>
                </Snackbar>
            </Slide>
        </>
    );
};

export default connect(null, { addNewProgramExercise })(ExerciseSelectorPage);
