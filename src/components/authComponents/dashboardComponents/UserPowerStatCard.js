import React, { useState } from 'react';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

//Styles:
import styled, { keyframes } from 'styled-components';
import { NewMessage } from '@styled-icons/entypo/NewMessage';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import bicep from '../../../imgs/bicep.png';

//Components:
import CustomSaveButton from './CustomSaveButton';
import CustomSubmitButton from './CustomSubmitButton';
import CustomNumberField from './CustomNumberField';
import CustomSelector from './CustomSelector';
import RecentWeightBox from './RecentWeightBox';

const fadeIn = keyframes`
    from {
        transform: translateY(-10%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainContainer = styled.div`
    position: relative;
    text-align: center;
    padding: 0.5em 0.5em;
    border-radius: 0.5em;
    background: #27303f;
    width: 100%;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    z-index: 1;
    animation: ${fadeIn} 0.3s ease;

    @media only screen and (min-width: 375px) {
        padding: 0.6em 1.5em;
    }

    @media screen and (min-width: 414px) {
        margin: 0 0.25em;
        padding: 0.8em 1.7em;
    }
`;

const BrowserMainContainer = styled.div`
    position: relative;
    text-align: center;
    padding: 0.6em 1em;
    border-radius: 0.5em;
    background: #27303f;
    width: 100%;
    max-width: 15em;
    margin: 0 auto;
    /* margin: 0 0.8em; */
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 3px;
    z-index: 1;
    animation: ${fadeIn} 0.3s ease;
`;

const RecentWeightContainer = styled.div`
    text-align: center;
    animation: ${fadeIn} 0.3s ease;
`;

const EditCorner = styled.button`
    text-align: center;
    /* position: absolute; */
    width: 100%;
    max-width: 10em;
    color: white;
    font-family: 'Nunito';
    font-size: 0.85em;
    font-weight: 900;
    margin-top: 0.5em;
    padding: 0.3em 0.3em;
    border-radius: 0.4em;
    /* border-top-right-radius: 20em;
    border-bottom-left-radius: 100em; */
    background: #1a222f;
    border: none;
    text-shadow: rgba(0, 0, 0, 0.7) 0px 2px 5px;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const StyledEditIcon = styled(NewMessage)`
    height: 2em;
    width: 2em;
    position: absolute;
    top: 0.4em;
    right: 0.4em;
    color: black;

    @media only screen and (min-width: 375px) {
        height: 1.9em;
        width: 1.9em;
        top: 0.4em;
        right: 0.4em;
    }
`;

const MainHeader = styled.h2`
    margin-top: 0.7em;
    font-size: 1em;
    font-weight: 900;
    /* color: ${({ theme }) => theme.UserPowerHeaderColor}; */
    color: white;
    text-shadow: 2px 2px 2px #14181f;
    z-index: 100;
`;

const BrowserMainHeader = styled.h2`
    margin-top: 0.9em;
    font-size: 1.5em;
    font-weight: 700;
    /* color: ${({ theme }) => theme.UserPowerHeaderColor}; */
    color: white;
    text-shadow: 2px 2px 2px #14181f;
    z-index: 100;
`;

const ImgContainer = styled.div`
    margin-top: 0.3em;
`;

const BrowserImgContainer = styled.div`
    margin-top: 0.6em;
`;

const ExerciseImg = styled.img`
    height: 4.2em;
    width: 4.2em;
    filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(289deg)
        brightness(103%) contrast(101%);
    @media only screen and (min-width: 375px) {
        height: 4.3em;
        width: 4.3em;
    }
`;

const BrowserExerciseImg = styled.img`
    height: 7em;
    width: 7em;
    filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(289deg)
        brightness(103%) contrast(101%);
`;

const DescContainer = styled.div`
    max-width: 100%;
    text-align: center;
`;

const BrowserDescContainer = styled.div`
    text-align: center;
`;

const DescLabel = styled.p`
    font-size: 0.8em;
    color: white;
    font-weight: 900;
    white-space: nowrap;
`;

const BrowserDescLabel = styled.p`
    font-size: 1em;
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
    width: 86%;

    &:focus {
        outline: none;
    }
`;

export const BrowserModalContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.ModalBG};
    /* border: 1px solid #fdbc3d; */
    border-radius: 0.4em;
    padding: 2em 2em;
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
    width: 35em;

    &:focus {
        outline: none;
    }
`;

export const ModalHeader = styled.h2`
    font-size: 1.5em;
    font-weight: 900;
    color: ${({ theme }) => theme.ModalHeader};
    font-family: 'Lato', 'Nunito', sans-serif, helvetica;
    @media only screen and (max-width: 320px) {
        font-size: 1.2em;
    }
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
`;

const ModalInputContainer = styled.div`
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: 70% 30%;
    justify-content: center;
    column-gap: 0.5em;
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

    const renderUserPowerStatCard = () => {
        if (isMobileOnly) {
            return (
                <MobileOnlyView>
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
                                <ModalDesc>
                                    Let us know how you're doing.
                                </ModalDesc>
                                <ModalInputContainer>
                                    <CustomNumberField
                                        placeholder="Weight"
                                        existingStat={existingStat}
                                        changeFunc={handleTextFieldChange}
                                    />
                                    <CustomSelector changeFunc={handleSelect} />
                                </ModalInputContainer>
                                <CustomSaveButton
                                    buttonLabel="Save"
                                    onClickFunction={handleNewStatSubmit}
                                />
                            </ModalContainer>
                        </Fade>
                    </Modal>
                    <WrapperContainer>
                        <MainContainer>
                            <MainHeader>{header}</MainHeader>
                            <ImgContainer>
                                <ExerciseImg src={img} />
                            </ImgContainer>
                            <DescContainer>
                                <DescLabel>
                                    {renderExistingStatLbs()} lbs
                                </DescLabel>
                                <DescLabel>
                                    {renderExistingStatKgs()} kg
                                </DescLabel>
                            </DescContainer>
                            <EditCorner type="button" onClick={handleOpen}>
                                Edit
                            </EditCorner>
                        </MainContainer>
                        <RecentWeightContainer>
                            <RecentWeightBox
                                time={recentStatTimeChange}
                                weight={recentStatWeightChange}
                            />
                        </RecentWeightContainer>
                    </WrapperContainer>
                </MobileOnlyView>
            );
        } else if (isBrowser) {
            return (
                <BrowserView>
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
                            <BrowserModalContainer>
                                <ModalHeader>Oh, a new score?</ModalHeader>
                                <ModalPicture src={bicep} />
                                <ModalDesc>
                                    Let us know how you're doing.
                                </ModalDesc>
                                <ModalInputContainer>
                                    <CustomNumberField
                                        placeholder="Weight"
                                        existingStat={existingStat}
                                        changeFunc={handleTextFieldChange}
                                    />
                                    <CustomSelector changeFunc={handleSelect} />
                                </ModalInputContainer>
                                <CustomSaveButton
                                    buttonLabel="Save"
                                    onClickFunction={handleNewStatSubmit}
                                />
                            </BrowserModalContainer>
                        </Fade>
                    </Modal>
                    <WrapperContainer>
                        <BrowserMainContainer>
                            <BrowserMainHeader>{header}</BrowserMainHeader>
                            <BrowserImgContainer>
                                <BrowserExerciseImg src={img} />
                            </BrowserImgContainer>
                            <BrowserDescContainer>
                                <BrowserDescLabel>
                                    {renderExistingStatLbs()} lbs
                                </BrowserDescLabel>
                                <BrowserDescLabel>
                                    {renderExistingStatKgs()} kg
                                </BrowserDescLabel>
                            </BrowserDescContainer>
                            <EditCorner type="button" onClick={handleOpen}>
                                Edit
                            </EditCorner>
                        </BrowserMainContainer>
                        <RecentWeightContainer>
                            <RecentWeightBox
                                time={recentStatTimeChange}
                                weight={recentStatWeightChange}
                            />
                        </RecentWeightContainer>
                    </WrapperContainer>
                </BrowserView>
            );
        }
    };

    return <>{renderUserPowerStatCard()}</>;
};

export default UserPowerStatCard;
