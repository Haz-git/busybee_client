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

const StatContainer = styled.div``;

//Render:

const MainStats = () => {
    //This state controls modal open/close:
    const [statModalOpen, setStatModalOpen] = useState(false);

    //Modal Functions:
    const openModal = () => {
        setStatModalOpen(true);
    };

    const closeModal = () => {
        setStatModalOpen(false);
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
                        <ModalHeader>Track new exercise</ModalHeader>
                        <form>
                            <CustomTextField
                                type="text"
                                placeholder="Exercise Name"
                            />
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
