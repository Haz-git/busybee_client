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
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0em;
    width: 100%;
    max-width: 100%;
    z-index: 100;
`;

const BrowserFlexWrapper = styled.div`
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    display: grid;
    grid-template-columns: 87% 13%;
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
    margin-bottom: 4em;
    padding: 0 0.5em;
`;

const BrowserStatCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 1em;
    justify-content: space-between;
    align-items: stretch;
`;

//Render:

const MainStats = ({ addNewStat, getUserStatData, stats }) => {
    //Loading State:
    const [isLoaded, setIsLoaded] = useState(false);

    //Modification flag:
    const [isStatModified, setIsStatModified] = useState(false);

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
            setUserSearchArray(null);
        } else {
            setUserSearchArray(filteredArray);
        }
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
