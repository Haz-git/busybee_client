import React from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomCancelButton from '../../dashboardComponents/CustomCancelButton';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../../dashboardComponents/UserPowerStatCard';

const PyramidModalContainer = styled(ModalContainer)`
    width: 92.5%;
`;

const PyramidModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const PyramidModalDesc = styled(ModalDesc)`
    margin: 1.3em 0;
    white-space: normal;
    text-align: center;
`;

const ButtonContainer = styled.div`
    text-align: center;
`;

const StyledButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1em',
    },
})(Button);

const AddPyramidSetModal = ({
    openBoolean,
    closeFunction,
    modalDesc,
    modalHeader,
    ariaLabel,
    ariaDesc,
}) => {
    return (
        <>
            {isMobileOnly && (
                <Modal
                    aria-labelledby={ariaLabel}
                    aria-describedby={ariaDesc}
                    open={openBoolean}
                    onClose={closeFunction}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <PyramidModalContainer>
                            <PyramidModalHeader>
                                {modalHeader}
                            </PyramidModalHeader>
                            <PyramidModalDesc>{modalDesc}</PyramidModalDesc>
                            <ButtonContainer>
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </PyramidModalContainer>
                    </Fade>
                </Modal>
            )}
            {isBrowser && (
                <Modal
                    aria-labelledby={ariaLabel}
                    aria-describedby={ariaDesc}
                    open={openBoolean}
                    onClose={closeFunction}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <BrowserModalContainer>
                            <PyramidModalHeader>
                                {modalHeader}
                            </PyramidModalHeader>
                            <PyramidModalDesc>{modalDesc}</PyramidModalDesc>
                            <ButtonContainer>
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default AddPyramidSetModal;
