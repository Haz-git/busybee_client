import React, { useState } from 'react';

//Styles:
import styled from 'styled-components';
import { Edit } from '@styled-icons/fa-solid/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import bicep from '../../../imgs/bicep.png';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

//Components:
import CustomSubmitButton from './CustomSubmitButton';
import CustomTextField from './CustomTextField';
import CustomSelector from './CustomSelector';
import RecentWeightBox from './RecentWeightBox';

const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainContainer = styled.div`
    position: relative;
    text-align: center;
    padding: 0.7em 0.7em;
    border-radius: 0.5em;
    background: #27303f;
    margin: 0 0.3em;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const RecentWeightContainer = styled.div`
    text-align: center;
`;

const EditCorner = styled.button`
    text-align: center;
    position: absolute;
    height: 1.9em;
    width: 1.9em;
    top: 0;
    right: 0;
    border-top-right-radius: 24em;
    border-bottom-left-radius: 100em;
    background: #fdbc3d;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;

    &:focus {
        outline: none;
    }
`;

const StyledEditIcon = styled(Edit)`
    height: 1em;
    width: 1em;
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    color: black;
`;

const MainHeader = styled.h2`
    font-size: 0.75em;
    font-weight: 700;
    color: white;
`;

const ImgContainer = styled.div`
    margin-top: 0.35em;
`;

const ExerciseImg = styled.img`
    height: 4.3em;
    width: 4.3em;
    filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(289deg)
        brightness(103%) contrast(101%);
`;

const DescContainer = styled.div``;

const DescLabel = styled.p`
    font-size: 0.35em;
    color: white;
    font-weight: 900;
`;

//Modal Container

const ModalContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
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

const ModalHeader = styled.h2`
    font-size: 1em;
    font-weight: 900;
    color: ${({ theme }) => theme.ModalHeader};
    font-family: 'Lato', 'Nunito', sans-serif, helvetica;
`;

const ModalPicture = styled.img`
    margin: 0.5em auto;
    height: 4em;
    width: 4em;
    filter: invert(10%) sepia(23%) saturate(1426%) hue-rotate(77deg)
        brightness(92%) contrast(86%);
`;

const ModalDesc = styled.p`
    margin-top: 0.5em;
    font-size: 0.8em;
    font-weight: 500;
    color: ${({ theme }) => theme.generalText};
    white-space: nowrap;
`;

const ModalInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em 0;
`;

//Render:

const UserPowerStatCard = ({
    header,
    img,
    addAction,
    existingStat,
    recentStatWeightChange,
    recentStatTimeChange,
}) => {
    //Various states, manages modal open/close and user inputs.
    const [modalOpen, setModalOpen] = useState(false);
    const [inputWeight, setInputWeight] = useState(null);
    const [metric, setMetric] = useState('Lbs');

    //Check for existing values for lbs.
    const renderExistingStatLbs = () => {
        if (existingStat !== null && existingStat !== 'NA') {
            console.log(existingStat);
            return parseInt(existingStat);
        } else {
            return '-';
        }
    };

    //Render properly calculated kg from lbs.
    const renderExistingStatKgs = () => {
        if (existingStat !== null && existingStat !== 'NA') {
            //Calculation for lbs to kg.
            return (parseInt(existingStat) / 2.2).toFixed(2);
        } else {
            return '-';
        }
    };

    //handles modal open/close:

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    //handle select:

    const handleSelect = (event) => {
        setMetric(event.target.value);
    };

    //handle number change:

    const handleTextFieldChange = (e) => {
        setInputWeight(e.target.value);
    };

    //Handle card submit:

    const handleNewStatSubmit = (e) => {
        e.preventDefault();

        //Setting up object:
        const newStat = {
            weight: inputWeight,
            unit: metric,
        };

        //Simple Checker for now:

        if (newStat.weight === '' || newStat.weight === null) {
            alert('Please input a weight.');
        } else {
            console.log(newStat);
            addAction(newStat);
            setModalOpen(false);
        }
    };

    return (
        <>
            <Modal
                aria-labelledby="powerlift-modal"
                aria-describedby="powerlifts modal for user input"
                // className={classes.modal}
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <ModalContainer>
                        <ModalHeader>Awesome!</ModalHeader>
                        <ModalPicture src={bicep} />
                        <ModalDesc>
                            Seems like you've hit a new milestone.
                        </ModalDesc>
                        <form onSubmit={handleNewStatSubmit}>
                            <ModalInputContainer>
                                <CustomTextField
                                    type="number"
                                    placeholder="Weight"
                                    existingStat={existingStat}
                                    changeFunc={handleTextFieldChange}
                                />
                                <CustomSelector changeFunc={handleSelect} />
                            </ModalInputContainer>
                            <CustomSubmitButton
                                variant="contained"
                                label="Save"
                                type="submit"
                            />
                        </form>
                    </ModalContainer>
                </Fade>
            </Modal>
            <WrapperContainer>
                <MainContainer>
                    <EditCorner type="button" onClick={handleOpen}>
                        <StyledEditIcon />
                    </EditCorner>
                    <MainHeader>{header}</MainHeader>
                    <ImgContainer>
                        <ExerciseImg src={img} />
                    </ImgContainer>
                    <DescContainer>
                        <DescLabel>{renderExistingStatLbs()} lbs</DescLabel>
                        <DescLabel>{renderExistingStatKgs()} kg</DescLabel>
                    </DescContainer>
                </MainContainer>
                <RecentWeightContainer>
                    <RecentWeightBox
                        time={recentStatTimeChange}
                        weight={recentStatWeightChange}
                    />
                </RecentWeightContainer>
            </WrapperContainer>
        </>
    );
};

export default UserPowerStatCard;
