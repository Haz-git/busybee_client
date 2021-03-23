import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    getUserStatData,
    addNewStat,
} from '../../../redux/userStats/userStatActions';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import { v4 as uuid } from 'uuid';

//Components:
import CustomSaveButton from '../dashboardComponents/CustomSaveButton';
import SearchBar from './SearchBar';
import AddButton from './AddButton';
import StatCard from './StatCard';
import CustomLoadingDots from '../configureProgram/CustomLoadingDots';
import { LoadingContainer } from '../configureProgram/ConfigureMain';

//Styles:
import styled from 'styled-components';
import { Stats } from '@styled-icons/boxicons-regular/Stats';
import {
    BrowserMainHeader,
    MainHeader,
} from '../dashboardComponents/UserGreeting';
import {
    ModalContainer,
    BrowserModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';
import CustomTextField from '../dashboardComponents/CustomTextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CustomSubmitButton from '../dashboardComponents/CustomSubmitButton';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
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

const EmptyStatsIcon = styled(Stats)`
    height: 10em;
    width: 10em;
    color: #26292f;
    margin: -1.8em 0;
`;

const BrowserEmptyStatsIcon = styled(Stats)`
    height: 14em;
    width: 14em;
    color: white;
    margin: -1.8em 0;
`;

const EmptyStatContainer = styled.div`
    text-align: center;
    margin: 3em 0;
`;

const BrowserEmptyStatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 1em 0;
    background: #26292f;
    border-radius: 0.4em;
    padding: 1em 2em;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 15px;
`;

const EmptyStatLabel = styled.h3`
    font-family: 'Lato', 'Nunito';
    font-weight: 600;
    font-size: 1em;
    margin: 0.4em 0;
    color: #26292f;
`;

const BrowserEmptyStatLabel = styled.h3`
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

const SearchBarContainer = styled.div`
    display: inline-block;
    text-align: center;
`;

const FlexWrapper = styled.div`
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0em;
    width: 100%;
    max-width: 100%;
`;

const BrowserFlexWrapper = styled.div`
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    display: grid;
    grid-template-columns: 87% 13%;
    /* align-items: center;
    justify-content: left; */
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0;
`;

const BrowserSearchBarContainer = styled.div``;

const SecondaryStatHeader = styled(MainHeader)`
    font-size: 1em;
    font-weight: 400;
    white-space: nowrap;
    margin: 0.7em 0;
`;

const BrowserSecondaryStatHeader = styled(MainHeader)`
    text-align: left;
    font-size: 1.2em;
    font-weight: 700;
    white-space: nowrap;
    margin: 0.7em 0;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StatModalHeader = styled(ModalHeader)`
    margin-bottom: 0.7em;
`;

const StatContainer = styled.div``;

const TextFieldContainer = styled.div`
    width: 100%;
    margin-bottom: 1em;
`;

const ButtonContainer = styled.div`
    margin: 0 auto;
    width: 100%;
`;

const StatCardContainer = styled.div`
    margin-bottom: 3em;
`;

const BrowserStatCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 1em;
    /* align-items: center; */
    justify-content: space-between;
    /* justify-items: center; */
    align-items: stretch;
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

const MainStats = ({ addNewStat, getUserStatData, stats }) => {
    //Loading State:

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (stats.stats === undefined || stats.stats === null) {
            //If these are undefined, that means programs were not persisted and will need retrieval.
            const getUserExistingStats = async () => {
                const bool = await getUserStatData();
                setIsLoaded(bool);
            };
            getUserExistingStats();
        } else if (stats.stats !== undefined) {
            setIsLoaded(true);
        }
    }, []);

    //States for SnackBars:
    const [openAddRecordSnackBar, setOpenAddRecordSnackBar] = useState(false);
    const [openEditRecordSnackBar, setOpenEditRecordSnackBar] = useState(false);
    const [openDeleteRecordSnackBar, setOpenDeleteRecordSnackBar] = useState(
        false
    );

    //This state controls modal open/close:
    const [statModalOpen, setStatModalOpen] = useState(false);

    //State for user submission:
    const [userNewExercise, setUserNewExercise] = useState(null);

    //State for search filter:
    const [userSearchArray, setUserSearchArray] = useState(null);

    //Modal Functions:
    const openModal = () => {
        setStatModalOpen(true);
    };

    const closeModal = () => {
        setStatModalOpen(false);
    };

    //Control user input:

    const handleUserInput = (e) => {
        e.preventDefault();
        setUserNewExercise(e.target.value);
    };

    //Control Submit:

    const handleUserSubmit = (e) => {
        e.preventDefault();

        if (
            userNewExercise === '' ||
            userNewExercise === undefined ||
            userNewExercise === null
        ) {
            alert('Please enter an exercise before submission.');
        } else {
            addNewStat(userNewExercise);
            setStatModalOpen(false);
        }

        //Action Creator --> e.target.value;
    };

    //Stat Card render function:

    const renderStatCards = () => {
        if (
            renderNumberOfStats() !== 0 &&
            stats.stats !== undefined &&
            stats.stats !== null &&
            userSearchArray === null
        ) {
            return stats.stats.map((stat) => (
                <StatCard
                    key={uuid()}
                    name={stat.exerciseName}
                    date={stat.dateUpdated}
                    exerciseId={stat.exerciseId}
                    records={stat.records}
                    addRecordSnackbar={showNewRecordSnackBar}
                    editRecordSnackbar={showEditRecordSnackBar}
                    deleteRecordSnackbar={showDeleteRecordSnackBar}
                />
            ));
        } else if (
            renderNumberOfStats() !== 0 &&
            stats.stats !== undefined &&
            stats.stats !== null &&
            userSearchArray !== null
        ) {
            return userSearchArray.map((stat) => (
                <StatCard
                    key={uuid()}
                    name={stat.exerciseName}
                    date={stat.dateUpdated}
                    exerciseId={stat.exerciseId}
                    records={stat.records}
                    addRecordSnackbar={showNewRecordSnackBar}
                    editRecordSnackbar={showEditRecordSnackBar}
                    deleteRecordSnackbar={showDeleteRecordSnackBar}
                />
            ));
        } else if (
            renderNumberOfStats() === 0 &&
            stats.stats !== undefined &&
            stats.stats !== null
        ) {
            if (isMobileOnly) {
                return (
                    <EmptyStatContainer>
                        <EmptyStatsIcon />
                        <EmptyStatLabel>
                            Stats track your progressive overload.
                        </EmptyStatLabel>
                        <EmptyStatLabel>
                            Use 'Add' to save a new one.
                        </EmptyStatLabel>
                    </EmptyStatContainer>
                );
            } else if (isBrowser) {
                return (
                    <BrowserEmptyStatContainer>
                        <BrowserEmptyStatsIcon />
                        <BrowserEmptyStatLabel>
                            Stats track your progressive overload.
                        </BrowserEmptyStatLabel>
                        <BrowserEmptyStatLabel>
                            Use 'Add' to save a new one.
                        </BrowserEmptyStatLabel>
                    </BrowserEmptyStatContainer>
                );
            }
        }
    };

    //Find total number of stats:

    const renderNumberOfStats = () => {
        if (stats.stats !== undefined && stats.stats !== null) {
            return stats.stats.length;
        } else {
            return null;
        }
    };

    //Search bar onChange function:

    const handleSearchBarChange = (e) => {
        let filteredArray;
        //Filter stats.stats array:
        if (stats.stats !== undefined && stats.stats !== null) {
            filteredArray = stats.stats.filter((stat) => {
                return stat.exerciseName
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

    //Controller functions for SnackBars:

    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
    };

    //Controls opening the 'new record' snackbar:
    const showNewRecordSnackBar = (bool) => {
        setOpenAddRecordSnackBar(bool);
    };

    //Controls closing the 'New Record' snackbar:
    const closeNewRecordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAddRecordSnackBar(false);
    };

    //Controls opening and closing 'Editing' records snackbar:

    const showEditRecordSnackBar = (bool) => {
        setOpenEditRecordSnackBar(bool);
    };

    const closeEditRecordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenEditRecordSnackBar(false);
    };

    //Controls opening and closing 'Deleting' records snackbar:

    const showDeleteRecordSnackBar = (bool) => {
        setOpenDeleteRecordSnackBar(bool);
    };

    const closeDeleteRecordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteRecordSnackBar(false);
    };

    return (
        <>
            {isMobileOnly && (
                <Modal
                    aria-labelledby="stats-modal"
                    aria-describedby="user stats modal for input"
                    open={statModalOpen}
                    onClose={closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={statModalOpen}>
                        <ModalContainer>
                            <StatModalHeader>
                                Track new exercise
                            </StatModalHeader>
                            <FormContainer>
                                <TextFieldContainer>
                                    <CustomTextField
                                        type="text"
                                        placeholder="Exercise Name"
                                        changeFunc={handleUserInput}
                                    />
                                </TextFieldContainer>
                                <ButtonContainer>
                                    <CustomSaveButton
                                        buttonLabel="Save"
                                        onClickFunction={handleUserSubmit}
                                    />
                                </ButtonContainer>
                            </FormContainer>
                        </ModalContainer>
                    </Fade>
                </Modal>
            )}
            {isBrowser && (
                <Modal
                    aria-labelledby="stats-modal"
                    aria-describedby="user stats modal for input"
                    open={statModalOpen}
                    onClose={closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={statModalOpen}>
                        <BrowserModalContainer>
                            <StatModalHeader>
                                Track new exercise
                            </StatModalHeader>
                            <FormContainer>
                                <TextFieldContainer>
                                    <CustomTextField
                                        type="text"
                                        placeholder="Exercise Name"
                                        changeFunc={handleUserInput}
                                    />
                                </TextFieldContainer>
                                <ButtonContainer>
                                    <CustomSaveButton
                                        buttonLabel="Save"
                                        onClickFunction={handleUserSubmit}
                                    />
                                </ButtonContainer>
                            </FormContainer>
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
            <MainContainer>
                {isMobileOnly && (
                    <>
                        <MainHeader>Stat Log</MainHeader>
                        <SecondaryStatHeader>
                            Jot down all of your achievements.
                        </SecondaryStatHeader>
                    </>
                )}
                {isBrowser && (
                    <>
                        <BrowserMainHeader>Stat Log</BrowserMainHeader>
                        <BrowserSecondaryStatHeader>
                            Jot down all of your achievements.
                        </BrowserSecondaryStatHeader>
                    </>
                )}
                {isMobileOnly && (
                    <FlexWrapper>
                        <SearchBarContainer>
                            <SearchBar
                                placeholder="Total Stats"
                                value={
                                    isLoaded === true
                                        ? renderNumberOfStats()
                                        : '...'
                                }
                                changeFunction={handleSearchBarChange}
                            />
                        </SearchBarContainer>
                        <AddButton clickFunction={openModal} />
                    </FlexWrapper>
                )}
                {isBrowser && (
                    <BrowserFlexWrapper>
                        <BrowserSearchBarContainer>
                            <SearchBar
                                placeholder="Total Stats"
                                value={
                                    isLoaded === true
                                        ? renderNumberOfStats()
                                        : '...'
                                }
                                changeFunction={handleSearchBarChange}
                            />
                        </BrowserSearchBarContainer>
                        <AddButton clickFunction={openModal} />
                    </BrowserFlexWrapper>
                )}
                {isMobileOnly && (
                    <StatCardContainer>
                        {isLoaded === true ? (
                            renderStatCards()
                        ) : (
                            <LoadingContainer>
                                <CustomLoadingDots />
                            </LoadingContainer>
                        )}
                    </StatCardContainer>
                )}
                {isBrowser && (
                    <BrowserStatCardContainer>
                        {isLoaded === true ? (
                            renderStatCards()
                        ) : (
                            <LoadingContainer>
                                <CustomLoadingDots />
                            </LoadingContainer>
                        )}
                    </BrowserStatCardContainer>
                )}
            </MainContainer>
            <Snackbar
                open={openAddRecordSnackBar}
                autoHideDuration={1000}
                onClose={closeNewRecordSnackBar}
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
                            Your record has been added.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={openEditRecordSnackBar}
                autoHideDuration={1000}
                onClose={closeEditRecordSnackBar}
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
                open={openDeleteRecordSnackBar}
                autoHideDuration={1000}
                onClose={closeDeleteRecordSnackBar}
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
                            Your record has been removed.
                        </Alert>
                    }
                />
            </Snackbar>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        stats: state.stats,
    };
};

export default connect(mapStateToProps, { getUserStatData, addNewStat })(
    MainStats
);
