import React, { useState } from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import BackButtonHeader from '../../dashboardComponents/BackButtonHeader';
import PyramidFirstStep from './PyramidFirstStep';
import PyramidSecondStep from './PyramidSecondStep';
import { connect } from 'react-redux';
import { addNewPyramidSet } from '../../../../redux/userProgramExercises/programExerciseActions';
import AddPyramidSetModal from './AddPyramidSetModal';
import { PYRAMID_PROGRAM_EXERCISE } from '../programExerciseConstants';
import CustomSaveButton from '../../dashboardComponents/CustomSaveButton';
import CustomCancelButton from '../../dashboardComponents/CustomCancelButton';

//Styles:
import styled, { keyframes } from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BackIcon, BrowserBackIcon } from '../ConfigureMain';

const carouselMovement = keyframes`
    from {
        transform: translateY(40%);
    }

    to {
        transform: translateY(0%);
    }
`;

const fadeIn = keyframes`
    from {
        opacity: .2;
        transform: translateY(100%)
    }

    to {
        opacity: 1;
        transform: translateY(0%);
    }
`;

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.6em .8em',
        '& .MuiAlert-icon': {
            fontSize: '2.2em',
        },
        '& .MuiAlert-message': {
            fontSize: '1.4em',
            whiteSpace: 'nowrap',
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
    filledSuccess: {
        background: '#156711',
    },
    filledError: {
        background: '#76251F',
    },
    filledInfo: {
        background: '#083768',
    },
}))(MuiAlert);

const CustomSnackBar = withStyles(() => ({
    anchorOriginBottomCenter: {
        marginBottom: '4.3em',
    },
}))(Snackbar);

const MainContainer = styled.div`
    display: block;
    text-align: center;
`;

const FormContainer = styled.div`
    padding: 1em 1em;
    width: 100%;
    max-width: 100%;
    animation: ${carouselMovement} 0.5s ease;
`;

const ButtonContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    bottom: 5.5em;
    left: 50%;
    transform: translate(-50%, 0);
`;

const AnimatedButtonContainer = styled.div`
    animation: ${fadeIn} 0.2s linear;
`;

const AnimatedColumnButtonContainer = styled.div`
    animation: ${fadeIn} 0.2s linear;
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 0.2em;
    align-items: center;
    justify-content: center;
`;

const PreviousButtonContainer = styled.div`
    position: fixed;
    top: 5.98em;
    left: 50%;
    width: 100%;
    max-width: 100%;
    transform: translate(-50%, 0);
    padding: 1em 1em;
    background: ${({ theme }) => theme.background};
    z-index: 99 !important;

    @media only screen and (max-width: 320px) {
        padding: 0.45em 1em;
    }
`;

const BrowserPreviousButtonContainer = styled.div`
    white-space: nowrap;
    padding: 0.3em 0em;
    background: ${({ theme }) => theme.background};
    z-index: 99 !important;
`;

//Slide transition function for MUI:

function slideTransition(props) {
    return (
        <Slide
            {...props}
            direction="up"
            timeout={{
                enter: 400,
                exit: 400,
            }}
        />
    );
}

const PyramidMain = ({
    match: {
        params: { name, id },
    },
    addNewPyramidSet,
}) => {
    //Modal State Controller:
    const [statePyramidModal, setStatePyramidModal] = useState(false);

    //Snackbar handler:
    const [statePyramidSnackbar, setStatePyramidSnackbar] = useState(false);

    //Step Handler:
    const [currentStep, setCurrentStep] = useState(1);

    //FirstStep Handler:
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');

    //Submission Array handler:
    const [pyramidArray, setPyramidArray] = useState([]);

    /*
        Because the text fields are dynamically rendered, we can set the value onChange to be the "set# rep#", append it to an object such as:
        {
            exerciseId
            exerciseName
            setNum
            totalSets
            reps
            weight
        }

        and add it to an array..

    */

    //Snackbar handling functions:

    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
    };

    const showPyramidSnackbar = (bool) => {
        setStatePyramidSnackbar(bool);
    };

    const closePyramidSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStatePyramidSnackbar(false);
    };

    //User Input PyramidFirstStep Handlers:

    const handleUserExerciseName = (e) => {
        setExercise(e.target.value);
    };

    const handleUserSetCount = (e) => {
        setSets(e.target.value);
    };
    //Click functions:

    const nextFunction = () => {
        let tempCurrentStep = currentStep;

        if (tempCurrentStep === 1) {
            setCurrentStep(tempCurrentStep + 1);
        }
    };

    const prevFunction = () => {
        let tempCurrentStep = currentStep;

        if (tempCurrentStep === 2) {
            setCurrentStep(tempCurrentStep - 1);
        }
    };

    //Render Buttons:

    const renderNextButton = () => {
        if (currentStep === 1 && exercise.trim() !== '' && sets.trim() !== '') {
            return (
                <AnimatedButtonContainer>
                    <CustomSaveButton
                        onClickFunction={nextFunction}
                        buttonLabel="Configure Reps and Weight"
                    />
                </AnimatedButtonContainer>
            );
        } else {
            return null;
        }
    };

    const renderPreviousAndSubmitButton = () => {
        if (currentStep === 2) {
            if (isMobileOnly) {
                return (
                    <AnimatedColumnButtonContainer>
                        <CustomCancelButton
                            onClickFunction={prevFunction}
                            buttonLabel="Re-Config"
                        />
                        <CustomSaveButton
                            onClickFunction={checkUserFieldsBeforeSubmission}
                            buttonLabel="Save"
                        />
                    </AnimatedColumnButtonContainer>
                );
            } else if (isBrowser) {
                return (
                    <AnimatedColumnButtonContainer>
                        <CustomCancelButton
                            onClickFunction={prevFunction}
                            buttonLabel="Reconfigure"
                        />
                        <CustomSaveButton
                            onClickFunction={checkUserFieldsBeforeSubmission}
                            buttonLabel="Save Pyramid Set"
                        />
                    </AnimatedColumnButtonContainer>
                );
            }
        } else {
            return null;
        }
    };

    //Field check:

    const checkUserFieldsBeforeSubmission = () => {
        if (parseInt(sets) === pyramidArray.length) {
            addNewPyramidSet(
                id,
                PYRAMID_PROGRAM_EXERCISE,
                exercise,
                pyramidArray,
                showPyramidSnackbar
            );
        } else {
            openPyramidModal();
        }
    };

    //Callback function to retrieve object created in step two:

    const setObjectSubmissionHandler = (object) => {
        setPyramidArray(sortSetObjectsArray(object));
    };

    const sortSetObjectsArray = (array) => {
        return array.sort((a, b) =>
            parseInt(a.setId) > parseInt(b.setId) ? 1 : -1
        );
    };

    //Modal Controllers:

    const openPyramidModal = () => {
        setStatePyramidModal(true);
    };

    const closePyramidModal = () => {
        setStatePyramidModal(false);
    };

    return (
        <>
            <MainContainer>
                <BackButtonHeader
                    previousLink={`/programs/configure/select/${name}/${id}`}
                    previousButtonIcon={
                        isBrowser ? <BrowserBackIcon /> : <BackIcon />
                    }
                    headerName={name}
                    headerDesc={`Create Pyramid Set`}
                    isPyramid={true}
                    isPyramidRenderContent={
                        isBrowser && (
                            <BrowserPreviousButtonContainer>
                                {renderPreviousAndSubmitButton()}
                            </BrowserPreviousButtonContainer>
                        )
                    }
                />
                {isMobileOnly && (
                    <PreviousButtonContainer>
                        {renderPreviousAndSubmitButton()}
                    </PreviousButtonContainer>
                )}
                <FormContainer>
                    <>
                        <PyramidFirstStep
                            currentStep={currentStep}
                            nameHandler={handleUserExerciseName}
                            setHandler={handleUserSetCount}
                            valueName={exercise}
                            valueSet={sets}
                        />
                        <PyramidSecondStep
                            currentStep={currentStep}
                            valueSet={sets}
                            setObjectHandler={setObjectSubmissionHandler}
                        />
                    </>
                </FormContainer>
                <ButtonContainer>{renderNextButton()}</ButtonContainer>
            </MainContainer>
            <AddPyramidSetModal
                openBoolean={statePyramidModal}
                closeFunction={closePyramidModal}
                modalDesc="Some fields were left empty. Please fill out all of the fields before saving!"
                modalHeader="Oops, Sorry!"
                ariaLabel="Modal informing user that a number field is empty and cannot add pyramid set."
                ariaDesc="Modal informing user that a number field is empty and cannot add pyramid set."
            />
            <CustomSnackBar
                open={statePyramidSnackbar}
                autoHideDuration={4000}
                onClose={closePyramidSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="success">
                            Your Pyramid Set Was Saved.
                        </Alert>
                    }
                />
            </CustomSnackBar>
        </>
    );
};

/*
    TODOS: 2/12

    1. We have now verified that adding the pyramid set will so far have no bugs to rendering or saving to database.
    2. We still need to create and plug in the 'addNewProgramPyramidSet' action creator to the second step.
    3. We need a modal preventing user from saving the pyramid set if all fields are not filled out (save for selector)
    4. We need to determine what happens on multi-save...
*/

export default connect(null, { addNewPyramidSet })(PyramidMain);
