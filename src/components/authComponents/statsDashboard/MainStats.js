import React, { useState } from 'react';

//Components:
import SearchBar from './SearchBar';
import AddButton from './AddButton';

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

const MainContainer = styled.div`
    display: block;
    text-align: center;
    padding: 0.5em 0.5em;
`;

const SearchBarContainer = styled.div`
    display: inline-block;
    text-align: center;
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

const ButtonContainer = styled.div`
    margin: 0 auto;
    width: 4em;
`;

//Render:

const MainStats = () => {
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
            console.log(userNewExercise);
        }

        //Action Creator --> e.target.value;
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
                                <CustomTextField
                                    type="text"
                                    placeholder="Exercise Name"
                                    changeFunc={handleUserInput}
                                />
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
                <SearchBarContainer>
                    <SearchBar />
                </SearchBarContainer>
                <AddButton clickFunction={openModal} />
            </MainContainer>
        </>
    );
};

export default MainStats;
