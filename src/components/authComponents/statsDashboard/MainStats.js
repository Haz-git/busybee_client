import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    getUserStatData,
    addNewStat,
} from '../../../redux/userStats/userStatActions';
import { v4 as uuid } from 'uuid';

//Components:
import SearchBar from './SearchBar';
import AddButton from './AddButton';
import StatCard from './StatCard';

//Styles:
import styled from 'styled-components';
import { MainHeader } from '../dashboardComponents/UserGreeting';
import {
    ModalContainer,
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

const CustomMuiAlert = withStyles(() => ({
    root: {
        backgroundColor: '#136539',
        '& .MuiAlert-icon': {
            fontSize: '1.7em',
        },
        '& .MuiAlert-message': {
            fontSize: '1.1em',
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
}))(MuiAlert);

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
    padding: 0.5em 0;
`;

const SecondaryStatHeader = styled(MainHeader)`
    font-size: 1em;
    font-weight: 200;
    white-space: nowrap;
    margin: 0.7em 0;
`;

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StatModalHeader = styled(ModalHeader)`
    margin-bottom: 0.7em;
`;

const StatContainer = styled.div``;

const TextFieldContainer = styled.div`
    width: 10em;
    margin-right: 1em;
`;

const ButtonContainer = styled.div`
    margin: 0 auto;
    width: 4em;
`;

const StatCardContainer = styled.div``;

//Render:

const MainStats = ({ addNewStat, getUserStatData, stats }) => {
    useEffect(() => {
        getUserStatData();
    }, []);

    //States for SnackBars:
    const [openSnackBar, setOpenSnackBar] = useState(false);

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
                />
            ));
        } else if (
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
                />
            ));
        } else {
            return null;
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

    //Controls opening the snackbar:
    const showNewRecordSnackBar = (bool) => {
        setOpenSnackBar(bool);
    };

    //Controls closing the snackbar:
    const closeNewRecordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    return (
        <>
            <Modal
                aria-labelledby="stats-modal"
                aria-describedby="user stats modal for input"
                // className={classes.modal}
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
                        <StatModalHeader>Track new exercise</StatModalHeader>
                        <form onSubmit={handleUserSubmit}>
                            <FormContainer>
                                <TextFieldContainer>
                                    <CustomTextField
                                        type="text"
                                        placeholder="Exercise Name"
                                        changeFunc={handleUserInput}
                                        maxlength={17}
                                    />
                                </TextFieldContainer>
                                <ButtonContainer>
                                    <CustomSubmitButton
                                        label="Add"
                                        type="submit"
                                        variant="contained"
                                    />
                                </ButtonContainer>
                            </FormContainer>
                        </form>
                    </ModalContainer>
                </Fade>
            </Modal>
            <MainContainer>
                <MainHeader>Stat Log</MainHeader>
                <SecondaryStatHeader>
                    Keep track of your achievements.
                </SecondaryStatHeader>
                <FlexWrapper>
                    <SearchBarContainer>
                        <SearchBar
                            value={renderNumberOfStats()}
                            changeFunction={handleSearchBarChange}
                        />
                    </SearchBarContainer>
                    <AddButton clickFunction={openModal} />
                </FlexWrapper>
                <StatCardContainer>{renderStatCards()}</StatCardContainer>
            </MainContainer>
            <Slide direction="right" in={openSnackBar}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={7000}
                    onClose={closeNewRecordSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success">
                        Your record has been added!
                    </Alert>
                </Snackbar>
            </Slide>
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
