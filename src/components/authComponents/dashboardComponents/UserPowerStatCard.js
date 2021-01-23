import React, { useState } from 'react';

//Styles:
import styled from 'styled-components';
import { Edit } from '@styled-icons/fa-solid/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import bicep from '../../../imgs/bicep.png';
//Originally it's Fade, but MUI has taken that name:
import FadeRR from 'react-reveal/Fade';

//Components:
import CustomSubmitButton from './CustomSubmitButton';
import CustomNumberField from './CustomNumberField';
import CustomSelector from './CustomSelector';
import RecentWeightBox from './RecentWeightBox';

const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainContainer = styled.div`
    position: relative;
    text-align: center;
    padding: 0.6em 0.99em;
    border-radius: 0.5em;
    background: #27303f;
    margin: 0 0.15em;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    z-index: 1;
`;

const RecentWeightContainer = styled.div`
    text-align: center;
`;

const EditCorner = styled.button`
    text-align: center;
    position: absolute;
    height: 3em;
    width: 3em;
    top: 0;
    right: 0;
    border-top-right-radius: 20em;
    border-bottom-left-radius: 100em;
    background: #fdbc3d;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    z-index: 2;

    &:focus {
        outline: none;
    }
`;

const StyledEditIcon = styled(Edit)`
    height: 1.5em;
    width: 1.5em;
    position: absolute;
    top: 0.4em;
    right: 0.4em;
    color: black;
`;

const MainHeader = styled.h2`
    margin-top: 0.7em;
    font-size: 1em;
    font-weight: 700;
    /* color: ${({ theme }) => theme.UserPowerHeaderColor}; */
    color: white;
    text-shadow: 2px 2px 2px #14181f;
    z-index: 4;
`;

const ImgContainer = styled.div`
    margin-top: 0.3em;
`;

const ExerciseImg = styled.img`
    height: 4.2em;
    width: 4.2em;
    filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(289deg)
        brightness(103%) contrast(101%);
`;

const DescContainer = styled.div`
    max-width: 4em;
    text-align: center;
`;

const DescLabel = styled.p`
    font-size: 0.8em;
    color: white;
    font-weight: 900;
    white-space: nowrap;
`;

//Modal Container

export const ModalContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.ModalBG};
    /* border: 1px solid #fdbc3d; */
    border-radius: 0.4em;
    padding: 1em 1em;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
    text-align: center;

    &:focus {
        outline: none;
    }
`;

export const ModalHeader = styled.h2`
    white-space: nowrap;
    font-size: 1.5em;
    font-weight: 900;
    color: ${({ theme }) => theme.ModalHeader};
    font-family: 'Lato', 'Nunito', sans-serif, helvetica;
`;

const ModalPicture = styled.img`
    margin: 0.5em auto;
    height: 5.8em;
    width: 5.8em;
    filter: invert(10%) sepia(23%) saturate(1426%) hue-rotate(77deg)
        brightness(92%) contrast(86%);
`;

export const ModalDesc = styled.p`
    margin-top: 0.5em;
    font-size: 1.1em;
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
                        <ModalHeader>Oh, a new score?</ModalHeader>
                        <ModalPicture src={bicep} />
                        <ModalDesc>Let us know how you're doing.</ModalDesc>
                        <form onSubmit={handleNewStatSubmit}>
                            <ModalInputContainer>
                                <CustomNumberField
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
                <FadeRR>
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
                </FadeRR>
                <FadeRR top>
                    <RecentWeightContainer>
                        <RecentWeightBox
                            time={recentStatTimeChange}
                            weight={recentStatWeightChange}
                        />
                    </RecentWeightContainer>
                </FadeRR>
            </WrapperContainer>
        </>
    );
};

export default UserPowerStatCard;
