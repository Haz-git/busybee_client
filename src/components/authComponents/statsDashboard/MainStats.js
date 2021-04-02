import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    getUserStatData,
    addNewStat,
} from '../../../redux/userStats/userStatActions';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import { v4 as uuid } from 'uuid';

//Components:
import SortByOptions from '../dashboardComponents/SortByOptions';
import GlobalSnackbar from '../dashboardComponents/GlobalSnackbar';
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
`;

const SearchBarContainer = styled.div`
    display: inline-block;
    text-align: center;
`;

const FlexWrapper = styled.div`
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    align-items: center;
    justify-content: center;
    display: grid;
    grid-template-columns: 73% 29%;
    column-gap: 0.5rem;
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0.5em;
    width: 100%;
    max-width: 100%;
    z-index: 100;
`;

const BrowserFlexWrapper = styled.div`
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    align-items: center;
    justify-content: center;
    display: grid;
    grid-template-columns: 88% 12%;
    column-gap: 0.5rem;
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0.5em;
    width: 100%;
    max-width: 100%;
    z-index: 100;
`;

const BrowserSearchBarContainer = styled.div`
    display: inline-block;
    text-align: center;
`;

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
    margin-bottom: 4em;
    padding: 0 0.2em;
`;

const BrowserStatCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 1em;
    justify-content: space-between;
    align-items: stretch;
`;

//Render:

const MainStats = ({ addNewStat, getUserStatData, stats, statRecords }) => {
    //Loading State:
    const [isLoaded, setIsLoaded] = useState(false);

    //State for stat snackbars:
    const [openNewStatSnackbar, setOpenNewStatSnackbar] = useState(false);
    const [openEditStatSnackbar, setOpenEditStatSnackbar] = useState(false);
    const [openDeleteStatSnackbar, setOpenDeleteStatSnackbar] = useState(false);

    //State of userSearchInput:
    const [userSearchValue, setUserSearchValue] = useState(null);

    //State for search filter:
    const [userSearchArray, setUserSearchArray] = useState(null);

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

    useEffect(() => {
        //Enables persistence of user searched stat after a stat operation.
        if (userSearchValue !== null && userSearchValue !== '') {
            setUserSearchArray(
                stats.stats.filter((stat) => {
                    return stat.exerciseName
                        .trim()
                        .toLowerCase()
                        .includes(userSearchValue);
                })
            );
        } else {
            if (stats.stats !== undefined && stats.stats !== null) {
                //Any stat card operation will cause userSearchArray to reset.
                setUserSearchArray(stats.stats);
            }
        }
    }, [stats.stats]);

    //Need a conditional for stat length change?

    //Controls snackbar open/close:
    const showNewStatSnackbar = (bool) => {
        setOpenNewStatSnackbar(bool);
    };

    const closeNewStatSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNewStatSnackbar(false);
    };

    const showEditStatSnackbar = (bool) => {
        setOpenEditStatSnackbar(bool);
    };

    const closeEditStatSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenEditStatSnackbar(false);
    };

    const showDeleteStatSnackbar = (bool) => {
        setOpenDeleteStatSnackbar(bool);
    };

    const closeDeleteStatSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteStatSnackbar(false);
    };

    //This state controls modal open/close:
    const [statModalOpen, setStatModalOpen] = useState(false);

    //State for user submission:
    const [userNewExercise, setUserNewExercise] = useState(null);

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
            addNewStat(userNewExercise, showNewStatSnackbar);
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
            //If and only if userSearchArray is null then we will render stats.stats. Normally userSearchArray has full control if any sort operations are used.
            return stats.stats.map((stat) => (
                <StatCard
                    key={uuid()}
                    name={stat.exerciseName}
                    date={stat.dateUpdated}
                    exerciseId={stat.exerciseId}
                    records={stat.records}
                    editSnackbar={showEditStatSnackbar}
                    deleteSnackbar={showDeleteStatSnackbar}
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
                    editSnackbar={showEditStatSnackbar}
                    deleteSnackbar={showDeleteStatSnackbar}
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

        setUserSearchValue(e.target.value.trim().toLowerCase());
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
            console.log('Target value is empty, userSearchset to null');
            setUserSearchArray(null);
        } else {
            setUserSearchArray(filteredArray);
        }
    };

    //Switch statement for statcard sorting.

    const sortCardFunction = (format, array) => {
        if (array === undefined || array === null) return;

        let sortedArray;

        switch (format) {
            case 'NEWEST':
                sortedArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.dateUpdated) - new Date(a.dateUpdated)
                    );
                return sortedArray;
                break;
            case 'MOSTRECORDS':
                sortedArray = array
                    .slice()
                    .sort((a, b) => b.records.length - a.records.length);

                return sortedArray;
                break;
            case 'ALPHABETICAL':
                sortedArray = array
                    .slice()
                    .sort((a, b) =>
                        a.exerciseName.localeCompare(b.exerciseName)
                    );

                return sortedArray;
                break;
            default:
                break;
        }
    };

    //Sorting Functions:

    const sortFunctionNewest = () => {
        let sortedArray;

        if (userSearchArray !== null && userSearchArray !== '') {
            sortedArray = sortCardFunction('NEWEST', userSearchArray);
        } else {
            sortedArray = sortCardFunction('NEWEST', stats.stats);
        }

        setUserSearchArray(sortedArray);
    };

    const sortFunctionMostRecords = () => {
        let sortedArray;
        setIsLoaded(false);

        //Since we have chosen to not update stats.stats if not undefined, we update it here:

        if (
            userSearchArray !== null &&
            userSearchValue !== null &&
            userSearchValue !== ''
        ) {
            console.log('not null');
            const getUserNewRecordValues = async () => {
                //Refresh the stat data:
                const bool = await getUserStatData();
                if (bool === true) {
                    setUserSearchArray(
                        stats.stats.filter((stat) => {
                            return stat.exerciseName
                                .trim()
                                .toLowerCase()
                                .includes(userSearchValue);
                        })
                    );
                    sortedArray = sortCardFunction(
                        'MOSTRECORDS',
                        userSearchArray
                    );
                    setUserSearchArray(sortedArray);
                    setIsLoaded(true);
                }
            };
            getUserNewRecordValues();
        } else {
            const getUserNewRecordValues = async () => {
                const bool = await getUserStatData();
                if (bool === true) {
                    sortedArray = sortCardFunction('MOSTRECORDS', stats.stats);
                    setUserSearchArray(sortedArray);
                    setIsLoaded(true);
                }
            };
            getUserNewRecordValues();
        }
    };

    const sortFunctionAlphabet = () => {
        let sortedArray;

        if (userSearchArray !== null && userSearchArray !== '') {
            sortedArray = sortCardFunction('ALPHABETICAL', userSearchArray);
        } else {
            sortedArray = sortCardFunction('ALPHABETICAL', stats.stats);
        }

        setUserSearchArray(sortedArray);
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
                    <>
                        <SortByOptions
                            newestSortFunction={sortFunctionNewest}
                            recordsSortFunction={sortFunctionMostRecords}
                            alphabetSortFunction={sortFunctionAlphabet}
                        />
                        <StatCardContainer>
                            {isLoaded === true ? (
                                renderStatCards()
                            ) : (
                                <LoadingContainer>
                                    <CustomLoadingDots />
                                </LoadingContainer>
                            )}
                        </StatCardContainer>
                    </>
                )}
                {isBrowser && (
                    <>
                        <SortByOptions
                            newestSortFunction={sortFunctionNewest}
                            recordsSortFunction={sortFunctionMostRecords}
                            alphabetSortFunction={sortFunctionAlphabet}
                        />
                        <BrowserStatCardContainer>
                            {isLoaded === true ? (
                                renderStatCards()
                            ) : (
                                <LoadingContainer>
                                    <CustomLoadingDots />
                                </LoadingContainer>
                            )}
                        </BrowserStatCardContainer>
                    </>
                )}
            </MainContainer>
            <GlobalSnackbar
                openFunction={openNewStatSnackbar}
                closeFunction={closeNewStatSnackbar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="success"
                alertMessage="Your new stat has been saved."
            />
            <GlobalSnackbar
                openFunction={openEditStatSnackbar}
                closeFunction={closeEditStatSnackbar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="info"
                alertMessage="Your stat has been edited."
            />
            <GlobalSnackbar
                openFunction={openDeleteStatSnackbar}
                closeFunction={closeDeleteStatSnackbar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="error"
                alertMessage="Your stat has been removed."
            />
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
