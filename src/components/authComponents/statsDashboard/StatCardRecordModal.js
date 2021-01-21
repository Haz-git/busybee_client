import React from 'react';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CustomTextField from '../dashboardComponents/CustomTextField';
import { withStyles } from '@material-ui/core/styles';
import RecordCard from './RecordCard';

import {
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

import { PlaylistAdd } from '@styled-icons/material/PlaylistAdd';

//Styles:

const RecordModalContainer = styled.div`
    width: 92%;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    position: relative;
    background: ${({ theme }) => theme.ModalBG};
    /* border: 1px solid #fdbc3d; */
    border-radius: 0.4em;
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;

    &:focus {
        outline: none;
    }
`;

const RecordCardContainer = styled.div`
    margin: 1em 0;
    overflow-y: scroll;
    height: 20em;
    max-height: 20em;
    background: salmon;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const AddIcon = styled(PlaylistAdd)`
    height: 1.1em;
    width: 1.1em;
`;

const StyledButton = withStyles({
    root: {
        textTransform: 'capitalize',
    },
})(Button);

//Render:

const StatCardRecordModal = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    inputFunction,
    recordArray,
}) => {
    const renderRecordCards = () => {
        if (recordArray !== undefined && recordArray !== null) {
            return recordArray.map((record) => (
                <RecordCard
                    sets={record.sets}
                    reps={record.reps}
                    weight={record.weight}
                    dateModified={record.dateModified}
                />
            ));
        } else {
            return <>You don't seem to have any records!</>;
        }
    };

    return (
        <>
            <Modal
                aria-labelledby="stat card edit modal"
                aria-describedby="modal for stat edit"
                open={openBoolean}
                onClose={closeFunction}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openBoolean}>
                    <RecordModalContainer>
                        <ModalHeader>Records</ModalHeader>
                        <RecordCardContainer>
                            {renderRecordCards()}
                        </RecordCardContainer>
                        <ButtonContainer>
                            <StyledButton
                                size="small"
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                            >
                                Add New Record
                            </StyledButton>
                            <StyledButton
                                size="small"
                                variant="contained"
                                color="secondary"
                                onClick={closeFunction}
                            >
                                Exit
                            </StyledButton>
                        </ButtonContainer>
                    </RecordModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default StatCardRecordModal;
