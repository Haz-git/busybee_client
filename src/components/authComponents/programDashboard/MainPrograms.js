import React, { useState, useEffect } from 'react';

//Redux:
import { connect } from 'react-redux';
import SortByOptions from '../dashboardComponents/SortByOptions';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import {
    getUserProgramData,
    addNewProgram,
    editExistingProgram,
    deleteExistingProgram,
} from '../../../redux/userPrograms/userProgramActions';
import { v4 as uuid } from 'uuid';
import GlobalSnackbar from '../dashboardComponents/GlobalSnackbar';
import CustomLoadingDots from '../configureProgram/CustomLoadingDots';
import { LoadingContainer } from '../configureProgram/ConfigureMain';

//Components:
import { Diagram3Fill } from '@styled-icons/bootstrap/Diagram3Fill';
import SearchBar from '../statsDashboard/SearchBar';
import CreateProgramButton from './CreateProgramButton';
import CreateProgramModal from './CreateProgramModal';
import ProgramCard from './ProgramCard';

//Styles:
import styled from 'styled-components';
import {
    BrowserMainHeader,
    MainHeader,
} from '../dashboardComponents/UserGreeting';

const EmptyProgramIcon = styled(Diagram3Fill)`
    height: 7em;
    width: 7em;
    color: #26292f;
    /* margin: -1.8em 0; */
`;

const BrowserEmptyProgramIcon = styled(Diagram3Fill)`
    height: 10em;
    width: 10em;
    color: white;
    /* margin: -1.8em 0; */
`;

const EmptyProgramContainer = styled.div`
    text-align: center;
    margin: 3em 0;
`;

const BrowserEmptyProgramContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 1em 0;
    background: #26292f;
    border-radius: 0.4em;
    padding: 1em 1em;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 15px;
`;

const EmptyProgramLabel = styled.h3`
    font-family: 'Lato', 'Nunito';
    font-weight: 600;
    font-size: 1em;
    margin: 0.4em 0;
    color: #26292f;
`;

const BrowserEmptyProgramLabel = styled.h3`
    font-family: 'Lato', 'Nunito';
    font-weight: 600;
    font-size: 1.4em;
    margin: 0.4em 0;
    color: white;
`;

const MainContainer = styled.div`
    display: block;
    text-align: center;
    padding: 0.5em 0.5em;
    /* overflow-y: scroll; */
`;

const SecondaryProgramHeader = styled(MainHeader)`
    font-size: 1em;
    font-weight: 400;
    white-space: nowrap;
    margin: 1em 0;
`;

const BrowserSecondaryProgramHeader = styled(MainHeader)`
    text-align: left;
    font-size: 1.2em;
    font-weight: 700;
    white-space: nowrap;
    margin: 0.7em 0;
`;

const SearchBarContainer = styled.div`
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    align-items: center;
    justify-content: center;
    display: grid;
    grid-template-columns: 67% 33%;
    column-gap: 0.5rem;
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0.5em;
    width: 100%;
    max-width: 100%;
    z-index: 100;
`;

const ProgramCardContainer = styled.div`
    padding-top: 1em;
    padding-bottom: 3.5em;
`;

const BrowserProgramCardContainer = styled.div`
    padding-top: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 1em;
    /* align-items: center; */
    justify-content: center;
    align-items: start;
`;

//Render:
const MainPrograms = ({
    addNewProgram,
    editExistingProgram,
    deleteExistingProgram,
    getUserProgramData,
    programs,
}) => {
    //State controls component loaded status:

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (programs.programs === undefined || programs.programs === null) {
            //If these are undefined, that means programs were not persisted and will need retrieval.

            const getUserExistingProgramData = async () => {
                const bool = await getUserProgramData();
                setIsLoaded(bool);
            };

            getUserExistingProgramData();
        } else if (programs.programs !== undefined) {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        //Normally, the data is retrieved on component mount. However, when the user configured his/her program and has formatted it, this component does not update to the correct value because programs.program !== undefined is true.

        //This useEffect serves to handle that, and upon formattedExercise change will update to the correct values enabling program to run.

        getUserProgramData();
    }, [programs.programs.length]);

    //This state controls snackbars:
    const [openAddProgramSnackBar, setOpenAddProgramSnackBar] = useState(false);
    const [openEditProgramSnackBar, setOpenEditProgramSnackBar] = useState(
        false
    );
    const [openDeleteProgramSnackBar, setOpenDeleteProgramSnackBar] = useState(
        false
    );

    //This state controls button disabling for user requests:
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //This state controls the filtered array for programs:
    const [userSearchArray, setUserSearchArray] = useState(null);

    //Controls user search bar value:
    const [userSearchValue, setUserSearchValue] = useState('');
    const [userHasInput, setUserHasInput] = useState(false);

    //This state controls program open/close:
    const [stateProgramAddModal, setStateProgramAddModal] = useState(false);

    //These states control the input text fields to create a new program:
    const [inputProgramName, setInputProgramName] = useState('');
    const [inputProgramDesc, setInputProgramDesc] = useState(undefined);

    //Callback functions for modal and buttonDisabled state:

    const setButtonState = (bool) => {
        setIsButtonDisabled(bool);
    };

    const setProgramAddModalState = (bool) => {
        setStateProgramAddModal(bool);
    };

    //Add Program modal functions:
    const openAddProgramModal = () => {
        setStateProgramAddModal(true);
    };

    const closeAddProgramModal = () => {
        setStateProgramAddModal(false);
    };

    //Add Program Input function controllers:

    const addTitleInput = (e) => {
        setInputProgramName(e.target.value);
    };

    const addDescInput = (e) => {
        setInputProgramDesc(e.target.value);
    };

    const submitUserInputs = () => {
        if (
            inputProgramName !== undefined &&
            inputProgramName !== null &&
            inputProgramName.trim() !== ''
        ) {
            setButtonState(true);
            addNewProgram(
                inputProgramName,
                inputProgramDesc,
                showNewProgramSnackBar,
                undefined,
                setButtonState,
                setProgramAddModalState
            );
            resetUserProgramDetailInput();
        } else {
            alert('Please enter a program name.');
        }
    };

    //Rendering Program Cards based on state:

    const renderProgramCards = () => {
        if (
            renderNumberOfPrograms() !== 0 &&
            programs.programs !== undefined &&
            programs.programs !== null &&
            userSearchArray === null
        ) {
            return programs.programs.map((program) => (
                <ProgramCard
                    key={uuid()}
                    name={program.programName}
                    desc={program.programDesc}
                    programId={program.programId}
                    programExercises={program.programExercises}
                    dateCreated={program.dateCreated}
                    editAction={editExistingProgram}
                    deleteAction={deleteExistingProgram}
                    editProgramSnackbar={showEditProgramSnackBar}
                    deleteProgramSnackbar={showDeleteProgramSnackBar}
                    isFormatted={program.isFormatted}
                />
            ));
        } else if (
            renderNumberOfPrograms() !== 0 &&
            programs.programs !== undefined &&
            programs.programs !== null &&
            userSearchArray !== null
        ) {
            return userSearchArray.map((program) => (
                <ProgramCard
                    key={uuid()}
                    name={program.programName}
                    desc={program.programDesc}
                    programId={program.programId}
                    programExercises={program.programExercises}
                    dateCreated={program.dateCreated}
                    editAction={editExistingProgram}
                    deleteAction={deleteExistingProgram}
                    editProgramSnackbar={showEditProgramSnackBar}
                    deleteProgramSnackbar={showDeleteProgramSnackBar}
                    isFormatted={program.isFormatted}
                />
            ));
        } else if (
            renderNumberOfPrograms() === 0 &&
            programs.programs !== undefined &&
            programs.programs !== null
        ) {
            if (isMobileOnly) {
                return (
                    <EmptyProgramContainer>
                        <EmptyProgramIcon />
                        <EmptyProgramLabel>
                            <em>Breeze</em> through your workout with a program.
                        </EmptyProgramLabel>
                        <EmptyProgramLabel>
                            Use 'Create' to make a new one.
                        </EmptyProgramLabel>
                    </EmptyProgramContainer>
                );
            } else if (isBrowser) {
                return (
                    <BrowserEmptyProgramContainer>
                        <BrowserEmptyProgramIcon />
                        <BrowserEmptyProgramLabel>
                            <em>Breeze</em> through your workout with a program.
                        </BrowserEmptyProgramLabel>
                        <BrowserEmptyProgramLabel>
                            Use 'Create' to make a new one.
                        </BrowserEmptyProgramLabel>
                    </BrowserEmptyProgramContainer>
                );
            }
        }
    };

    //Find total number of programs:

    const renderNumberOfPrograms = () => {
        if (programs.programs !== undefined && programs.programs !== null) {
            return programs.programs.length;
        } else {
            return null;
        }
    };

    //Handle programs search bar change:
    const handleSearchBarChange = (e) => {
        let filteredArray;
        //Filter stats.stats array:
        setUserSearchValue(e.target.value.trim().toLowerCase());

        if (programs.programs !== undefined && programs.programs !== null) {
            filteredArray = programs.programs.filter((program) => {
                return program.programName
                    .trim()
                    .toLowerCase()
                    .includes(e.target.value.trim().toLowerCase());
            });
        }

        //Prevents React not re-rendering cards after a search:

        if (e.target.value === '') {
            setUserSearchArray(null);
            setUserHasInput(false);
        } else {
            setUserSearchArray(filteredArray);
            setUserHasInput(true);
        }
    };

    //User input program name and desc reset function:
    const resetUserProgramDetailInput = () => {
        setInputProgramDesc(undefined);
        setInputProgramName('');
    };

    //Search bar reset function:

    const resetUserSearchBarInput = () => {
        setUserSearchValue('');
        setUserSearchArray(null);
        setUserHasInput(false);
    };

    //Controls opening the 'new program' snackbar:
    const showNewProgramSnackBar = (bool) => {
        setOpenAddProgramSnackBar(bool);
    };

    //Controls closing the 'New program' snackbar:
    const closeNewProgramSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAddProgramSnackBar(false);
    };

    //Controls opening and closing 'Editing' Programs snackbar:

    const showEditProgramSnackBar = (bool) => {
        setOpenEditProgramSnackBar(bool);
    };

    const closeEditProgramSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenEditProgramSnackBar(false);
    };

    //Controls opening and closing 'Deleting' Programs snackbar:

    const showDeleteProgramSnackBar = (bool) => {
        setOpenDeleteProgramSnackBar(bool);
    };

    const closeDeleteProgramSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteProgramSnackBar(false);
    };

    //Function for calculating a program's estimated time:
    const calculateProgramEstimatedTime = (program) => {
        //This is inefficient, and a copy of the calculate time present in programCard, will abstract into different function when I have more time.
        if (
            program.programExercises === undefined ||
            program.programExercises === null ||
            program.programExercises.length === 0
        ) {
            return 0;
        } else {
            let totalTime = [];

            program.programExercises.forEach((exercise) => {
                if (
                    exercise.programExerciseType !==
                        'CARDIO_PROGRAM_EXERCISE' &&
                    exercise.setObjectsArray === undefined &&
                    exercise.numRest !== undefined &&
                    exercise.numRest !== null &&
                    exercise.programExerciseId !== undefined &&
                    exercise.programExerciseId !== null
                ) {
                    //Handles Multi-Set exercises with rest between sets:

                    //Find total rest time without exercises:
                    const totalSecsFromMin =
                        parseInt(exercise.restLengthMinutePerSet) *
                        60 *
                        parseInt(exercise.numRest);

                    const totalSecs =
                        parseInt(exercise.restLengthSecondPerSet) *
                        parseInt(exercise.numRest);

                    //estimate time from sets and reps:

                    const secsFromRepsAndSets =
                        parseInt(exercise.reps) * 4 * parseInt(exercise.sets);

                    const totalRestTimeCombinedSeconds =
                        totalSecsFromMin + totalSecs + secsFromRepsAndSets;

                    totalTime.push(totalRestTimeCombinedSeconds);
                } else if (
                    exercise.programExerciseType ===
                        'CARDIO_PROGRAM_EXERCISE' &&
                    exercise.cardioMinutes !== undefined &&
                    exercise.cardioSeconds !== undefined
                ) {
                    let timeFromMin;

                    if (exercise.cardioMinutes !== null) {
                        timeFromMin = parseInt(exercise.cardioMinutes) * 60;
                    } else {
                        timeFromMin = 0;
                    }

                    let seconds;

                    if (exercise.cardioSeconds !== null) {
                        seconds = parseInt(exercise.cardioSeconds);
                    } else {
                        seconds = 0;
                    }

                    const timeCombined = timeFromMin + seconds;

                    totalTime.push(timeCombined);
                } else if (
                    exercise.programExerciseType !==
                        'CARDIO_PROGRAM_EXERCISE' &&
                    exercise.setObjectsArray !== undefined &&
                    exercise.numRest === undefined &&
                    exercise.programExerciseId !== undefined
                ) {
                    //This should handle pyramid sets without rest between sets:

                    let secondsFromReps = [];

                    for (let i = 0; i < exercise.setObjectsArray.length; i++) {
                        secondsFromReps.push(
                            parseInt(exercise.setObjectsArray[i].reps) * 4
                        );
                    }

                    const totalSecondsFromReps = secondsFromReps.reduce(
                        (a, b) => a + b,
                        0
                    );

                    totalTime.push(totalSecondsFromReps);
                } else if (
                    exercise.programExerciseType !==
                        'CARDIO_PROGRAM_EXERCISE' &&
                    exercise.setObjectsArray !== undefined &&
                    exercise.numRest !== undefined &&
                    exercise.programExerciseId !== undefined
                ) {
                    //Handles pyramid sets:

                    const totalSecsFromMin =
                        parseInt(exercise.restLengthMinutePerSet) *
                        60 *
                        parseInt(exercise.numRest);

                    const totalSecs =
                        parseInt(exercise.restLengthSecondPerSet) *
                        parseInt(exercise.numRest);

                    //Find seconds per rep in each set of pyramid:

                    let secondsFromReps = [];

                    for (let i = 0; i < exercise.setObjectsArray.length; i++) {
                        secondsFromReps.push(
                            parseInt(exercise.setObjectsArray[i].reps) * 4
                        );
                    }

                    const totalSecondsFromReps = secondsFromReps.reduce(
                        (a, b) => a + b,
                        0
                    );

                    const totalPyramidSetSeconds =
                        totalSecsFromMin + totalSecs + totalSecondsFromReps;

                    totalTime.push(totalPyramidSetSeconds);

                    //Combine seconds within secondsFromReps:
                } else if (
                    exercise.programExerciseType !==
                        'CARDIO_PROGRAM_EXERCISE' &&
                    exercise.restId !== undefined &&
                    exercise.restId !== null
                ) {
                    //Handles Rest periods

                    let timeFromMin;

                    if (exercise.restLengthMinute !== null) {
                        timeFromMin = parseInt(exercise.restLengthMinute) * 60;
                    } else {
                        timeFromMin = 0;
                    }

                    let seconds;

                    if (exercise.restLengthSecond !== null) {
                        seconds = parseInt(exercise.restLengthSecond);
                    } else {
                        seconds = 0;
                    }

                    const timeCombined = timeFromMin + seconds;

                    totalTime.push(timeCombined);
                } else if (
                    exercise.programExerciseType !==
                        'CARDIO_PROGRAM_EXERCISE' &&
                    exercise.programExerciseId !== undefined &&
                    exercise.programExerciseId !== null
                ) {
                    //Handles single set exercises, or multi set exercises without rest between sets:
                    const secsFromRepsAndSets =
                        parseInt(exercise.reps) * 4 * parseInt(exercise.sets);

                    totalTime.push(secsFromRepsAndSets);
                }
            });

            let currentCalculatedTimeInSeconds = totalTime.reduce(
                (a, b) => a + b,
                0
            );

            return currentCalculatedTimeInSeconds;
        }
    };

    //Switch statement for program card sorting

    const sortProgramCard = (format, array) => {
        if (array === undefined || array === null) return;

        let sortedProgramArray;

        switch (format) {
            case 'NEWEST':
                sortedProgramArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.dateCreated) - new Date(a.dateCreated)
                    );
                return sortedProgramArray;
                break;
            case 'OLDEST':
                sortedProgramArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(a.dateCreated) - new Date(b.dateCreated)
                    );
                return sortedProgramArray;
                break;
            case 'HIGHESTEXERCISE':
                sortedProgramArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            b.programExercises.length -
                            a.programExercises.length
                    );
                return sortedProgramArray;
                break;
            case 'LOWESTEXERCISE':
                sortedProgramArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            a.programExercises.length -
                            b.programExercises.length
                    );
                return sortedProgramArray;
                break;
            case 'HIGHESTTIME':
                sortedProgramArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            calculateProgramEstimatedTime(b) -
                            calculateProgramEstimatedTime(a)
                    );
                return sortedProgramArray;
                break;
            case 'LOWESTTIME':
                sortedProgramArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            calculateProgramEstimatedTime(a) -
                            calculateProgramEstimatedTime(b)
                    );
                return sortedProgramArray;
                break;
            default:
                break;
        }
    };

    //Sorting handler function:

    const handleSortRequest = (request) => {
        if (request === undefined || request === null || request === '') return;

        let sortedArray;

        if (userSearchArray !== null && userSearchArray !== '') {
            sortedArray = sortProgramCard(request, userSearchArray);
        } else {
            sortedArray = sortProgramCard(request, programs.programs);
        }

        setUserSearchArray(sortedArray);
    };

    return (
        <>
            <CreateProgramModal
                headerLabel="Create a new program"
                arialLabel="Modal for adding a new program"
                ariaDesc="Modal for adding a program"
                openBoolean={stateProgramAddModal}
                closeFunction={closeAddProgramModal}
                titleFunction={addTitleInput}
                descFunction={addDescInput}
                submitHandler={submitUserInputs}
                buttonDisabledState={isButtonDisabled}
            />
            <MainContainer>
                {isMobileOnly && (
                    <>
                        <MainHeader>Program Manager</MainHeader>
                        <SecondaryProgramHeader>
                            Design and run your lifting programs.
                        </SecondaryProgramHeader>
                    </>
                )}
                {isBrowser && (
                    <>
                        <BrowserMainHeader>Program Manager</BrowserMainHeader>
                        <BrowserSecondaryProgramHeader>
                            Design and run your lifting programs.
                        </BrowserSecondaryProgramHeader>
                    </>
                )}
                <SearchBarContainer
                    style={
                        isBrowser === true
                            ? {
                                  gridTemplateColumns: '88% 12%',
                              }
                            : { gridTemplateColumns: '67% 33%' }
                    }
                >
                    <SearchBar
                        placeholder="Programs"
                        value={
                            isLoaded === true ? renderNumberOfPrograms() : '...'
                        }
                        changeFunction={handleSearchBarChange}
                        renderClearButton={userHasInput}
                        clearButtonFunction={resetUserSearchBarInput}
                        inputValue={userSearchValue}
                    />
                    <CreateProgramButton clickFunction={openAddProgramModal} />
                </SearchBarContainer>
                {isMobileOnly && (
                    <>
                        <SortByOptions
                            sortingType="PROGRAMS"
                            programSortHandler={handleSortRequest}
                        />
                        <ProgramCardContainer>
                            {isLoaded === true ? (
                                renderProgramCards()
                            ) : (
                                <LoadingContainer>
                                    <CustomLoadingDots />
                                </LoadingContainer>
                            )}
                        </ProgramCardContainer>
                    </>
                )}
                {isBrowser && (
                    <>
                        <SortByOptions
                            sortingType="PROGRAMS"
                            programSortHandler={handleSortRequest}
                        />
                        <BrowserProgramCardContainer>
                            {isLoaded === true ? (
                                renderProgramCards()
                            ) : (
                                <LoadingContainer>
                                    <CustomLoadingDots />
                                </LoadingContainer>
                            )}
                        </BrowserProgramCardContainer>
                    </>
                )}
            </MainContainer>
            <GlobalSnackbar
                openFunction={openAddProgramSnackBar}
                closeFunction={closeNewProgramSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="success"
                alertMessage="Your program has been added."
            />
            <GlobalSnackbar
                openFunction={openEditProgramSnackBar}
                closeFunction={closeEditProgramSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="info"
                alertMessage="Your edits have been saved."
            />
            <GlobalSnackbar
                openFunction={openDeleteProgramSnackBar}
                closeFunction={closeDeleteProgramSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="error"
                alertMessage="Your program has been removed."
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        programs: state.programs,
    };
};

export default connect(mapStateToProps, {
    getUserProgramData,
    addNewProgram,
    editExistingProgram,
    deleteExistingProgram,
})(MainPrograms);
