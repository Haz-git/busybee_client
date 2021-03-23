import React, { useState, useEffect, useMemo } from 'react';

//Redux:
import { connect } from 'react-redux';

import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';
import {
    getUserProgramData,
    addNewProgram,
    editExistingProgram,
    deleteExistingProgram,
} from '../../../redux/userPrograms/userProgramActions';
import { v4 as uuid } from 'uuid';
import CustomLoadingDots from '../configureProgram/CustomLoadingDots';
import { LoadingContainer } from '../configureProgram/ConfigureMain';

//Components:
import { Diagram3Fill } from '@styled-icons/bootstrap/Diagram3Fill';
import SearchBar from '../statsDashboard/SearchBar';
import CreateProgramButton from './CreateProgramButton';
import CreateProgramModal from './CreateProgramModal';
import ProgramCard from './ProgramCard';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

//Styles:
import styled from 'styled-components';
import {
    BrowserMainHeader,
    MainHeader,
} from '../dashboardComponents/UserGreeting';
import { SnackbarContent } from '@material-ui/core';

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.6em .8em',
        '& .MuiAlert-icon': {
            fontSize: '2.2em',
            ['@media (max-width: 320px)']: {
                fontSize: '1.7em',
            },
        },
        '& .MuiAlert-message': {
            fontSize: '1.4em',
            whiteSpace: 'nowrap',
            ['@media (max-width: 320px)']: {
                fontSize: '1.1em',
            },
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
    filledSuccess: {
        background: '#1A222F',
    },
    filledError: {
        background: '#1A222F',
    },
    filledInfo: {
        background: '#1A222F',
    },
}))(MuiAlert);

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
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    z-index: 100 !important;
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0;
`;

const ProgramCardContainer = styled.div`
    padding-bottom: 3.5em;
`;

const BrowserProgramCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 1em;
    /* align-items: center; */
    justify-content: center;
    align-items: start;
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
    //This state controls the filtered array for programs:
    const [userSearchArray, setUserSearchArray] = useState(null);

    //This state controls program open/close:
    const [stateProgramAddModal, setStateProgramAddModal] = useState(false);

    //These states control the input text fields to create a new program:
    const [inputProgramName, setInputProgramName] = useState(undefined);
    const [inputProgramDesc, setInputProgramDesc] = useState(undefined);

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
            inputProgramName !== ''
        ) {
            addNewProgram(
                inputProgramName,
                inputProgramDesc,
                showNewProgramSnackBar
            );
            setStateProgramAddModal(false);
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
        } else {
            setUserSearchArray(filteredArray);
        }
    };

    //Alert function for snackbars:
    const Alert = (props, type) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
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
                <SearchBarContainer>
                    <SearchBar
                        placeholder="Total Programs"
                        value={
                            isLoaded === true ? renderNumberOfPrograms() : '...'
                        }
                        changeFunction={handleSearchBarChange}
                    />
                    <CreateProgramButton clickFunction={openAddProgramModal} />
                </SearchBarContainer>
                {isMobileOnly && (
                    <ProgramCardContainer>
                        {isLoaded === true ? (
                            renderProgramCards()
                        ) : (
                            <LoadingContainer>
                                <CustomLoadingDots />
                            </LoadingContainer>
                        )}
                    </ProgramCardContainer>
                )}
                {isBrowser && (
                    <BrowserProgramCardContainer>
                        {isLoaded === true ? (
                            renderProgramCards()
                        ) : (
                            <LoadingContainer>
                                <CustomLoadingDots />
                            </LoadingContainer>
                        )}
                    </BrowserProgramCardContainer>
                )}
            </MainContainer>
            <Snackbar
                open={openAddProgramSnackBar}
                autoHideDuration={4000}
                onClose={closeNewProgramSnackBar}
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
                        <Alert severity="success">
                            Your Program has been added.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={openEditProgramSnackBar}
                autoHideDuration={4000}
                onClose={closeEditProgramSnackBar}
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
                            Your edits have been saved.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={openDeleteProgramSnackBar}
                autoHideDuration={4000}
                onClose={closeDeleteProgramSnackBar}
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
                            Your Program has been removed.
                        </Alert>
                    }
                />
            </Snackbar>
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
