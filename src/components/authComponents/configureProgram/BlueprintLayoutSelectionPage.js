import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlueprintSelector from './BlueprintSelector';
import { getUserProgramExerciseData } from '../../../redux/userProgramExercises/programExerciseActions';
import {
    getUserFormattedProgram,
    submitFormattedProgram,
} from '../../../redux/userFormattedPrograms/formattedProgramsActions';
import { v4 as uuid } from 'uuid';
import Fade from 'react-reveal/Fade';
import dayjs from 'dayjs';
import { LoadingContainer } from './ConfigureMain';
import CustomLoadingDots from './CustomLoadingDots';

//Styles:
import styled from 'styled-components';
import {
    HeaderContainer,
    MainHeader,
    ExerciseHeader,
    FlexWrapper,
    BackButton,
    BackIcon,
} from './ConfigureMain';
import CustomSubmitButton from '../dashboardComponents/CustomSubmitButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.9em .5em',
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
}))(MuiAlert);

const CustomSnackBar = withStyles(() => ({
    anchorOriginBottomCenter: {
        marginBottom: '6em',
    },
}))(Snackbar);

const MainContainer = styled.div`
    display: block;
    text-align: center;
    padding-bottom: 5em;
`;

const ProgramCounterContainer = styled.div`
    display: block;
`;

const ProgramCounterSpanNegative = styled.span`
    color: red;
    font-size: 1em;
    margin-left: 0.5em;
    text-shadow: 2px 2px 2px #14181f;
    font-weight: 900;
`;

const ProgramCounterSpanPositive = styled.span`
    color: green;
    font-size: 1em;
    margin-left: 0.5em;
    text-shadow: 2px 2px 2px #14181f;
    font-weight: 900;
`;

const ProgramCounterLabel = styled.h3`
    font-size: 1.2em;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 900;
    color: white;
    text-shadow: 2px 2px 2px #14181f;
`;

const LabelContainer = styled.div`
    margin: 0.5em 0;
    text-align: center;
`;

const InfoLabel = styled.label`
    padding: 0;
    margin: 0 0.5em;
    font-size: 0.9em;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 900;
    color: ${({ theme }) => theme.AddMoreLabelC};
    white-space: nowrap;
    text-shadow: 2px 2px 2px #14181f;
`;

const FormattedText = styled.label`
    padding: 0;
    margin: 0 0.5em;
    font-size: 0.9em;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 600;
    color: white;
    white-space: nowrap;
    text-shadow: 2px 2px 2px #14181f;
`;

const FormatSpan = styled.span`
    margin: 0 0.5em;
    color: #fdbc3d;
    text-shadow: 2px 2px 2px #14181f;
`;

const FormatSpanNegative = styled.span`
    margin: 0 0.5em;
    color: red;
    text-shadow: 2px 2px 2px #14181f;
`;

const SelectorContainer = styled.div`
    display: block;
    padding: 0.5em 1.5em;
`;

const ButtonContainer = styled.div`
    margin-left: 1.5em;
    margin-right: 1.5em;
`;

const BlueprintLayoutSelectionPage = ({
    match: {
        params: { name, id },
    },
    programExercises,
    getUserProgramExerciseData,
    getUserFormattedProgram,
    submitFormattedProgram,
    formattedProgram,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getUserFormattedData = async () => {
            const bool1 = await getUserProgramExerciseData(id);
            const bool2 = await getUserFormattedProgram(id);

            if (bool1 === true && bool2 === true) {
                setIsLoaded(bool1);
            }
        };
        getUserFormattedData();
    }, []);

    //State snackbar:

    const [openFormattedSnackbar, setOpenFormattedSnackbar] = useState(false);

    const [userBlueprint, setUserBlueprint] = useState([]);
    const [userBlueprintCount, setUserBlueprintCount] = useState(0);
    // const [isAllFormatted, setIsAllFormatted] = useState(null);

    // const [userProgramExercises, setUserProgramExercises] = useState(
    //     programExercises
    // );

    const countProgramExercises = () => {
        if (programExercises !== null && programExercises !== undefined) {
            return programExercises.length;
        }
    };

    //Snackbar Handlers:

    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
    };

    const showFormattedSnackbar = (bool) => {
        setOpenFormattedSnackbar(true);
    };

    const closeFormattedSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenFormattedSnackbar(false);
    };

    /*
        Been facing this dilemma. I could create multiple selector components that the user can select their program exercises. But....

        (1) - How do I remove the option when the user has selected it?

            ^ Maybe place the array from the store into a state (and send it off as the optionsList), and if the userBluePrint has values in it, then filter out those values the state which updates the optionsList...

        (2) - How do I update the counter at the top when the user has selected the option?

            ^Potentially this could be counting the length of the optionsList(state) but reversed --> like if the length is 0, then 4/4 completed...

        (3) - What do I ultimately send to the backend to make running the program simple?

    */

    const handleSelection = (e) => {
        let userBlueprintArray = userBlueprint;
        console.log('Initial Array: ', userBlueprintArray);
        //Break apart the target value: We know the orderId will always be in index 0.
        const userSelectionTargetValues = e.target.value.split(' ');

        let selectId = userSelectionTargetValues[0]; //Id of select
        let selectedExerciseId = userSelectionTargetValues[1]; //programExerciseId of the selected value

        //We'll find the exercise details within 'programExercises' and append it to the new object.

        const matchingExerciseIndex = programExercises.findIndex(
            (element) => element.programExerciseId === selectedExerciseId
        );

        const matchingRestIndex = programExercises.findIndex(
            (element) => element.restId === selectedExerciseId
        );
        // console.log(programExercises)
        const newBlueprintObject = {
            orderId: selectId,
            programExerciseId: selectedExerciseId,
            exerciseDetails: programExercises[matchingExerciseIndex],
            restDetails: programExercises[matchingRestIndex],
        };

        if (
            userBlueprintArray === undefined ||
            userBlueprintArray.length === 0
        ) {
            userBlueprintArray.push(newBlueprintObject);
            setUserBlueprint(userBlueprintArray);
        } else {
            //We check if the orderId has already been inserted:
            const targetIndex = userBlueprintArray.findIndex(
                (item) => item.orderId === selectId
            );
            //If item is not present, then targetIndex will be -1.

            if (targetIndex === -1) {
                //New Selection: We check if the same exerciseId has already been added--

                userBlueprintArray.push(newBlueprintObject);
                setUserBlueprint(userBlueprintArray);
            } else if (targetIndex > -1) {
                //Item already exists

                userBlueprintArray[targetIndex][
                    'programExerciseId'
                ] = selectedExerciseId;

                setUserBlueprint(userBlueprintArray);
            }
        }

        resetUserBlueprintCount();
    };

    const sortUserBlueprint = () => {
        //Sorts objects based on orderId.
        return userBlueprint.sort((a, b) =>
            parseInt(a.orderId) > parseInt(b.orderId) ? 1 : -1
        );
    };

    const renderSelectorValues = () => {
        if (programExercises !== null && programExercises !== undefined) {
            return programExercises.map((exercise) => (
                <BlueprintSelector
                    // key={uuid()} <-- this breaks rendering the selected value...
                    optionsList={programExercises}
                    optionsDefaultValue="Program Exercise"
                    numLabel={programExercises.indexOf(exercise) + 1}
                    numId={programExercises.indexOf(exercise) + 1}
                    changeFunc={handleSelection}
                />
            ));
        }
    };

    const resetUserBlueprintCount = () => {
        setUserBlueprintCount(userBlueprint.length);
    };

    const renderProgramCounter = () => {
        if (
            userBlueprintCount === countProgramExercises() &&
            countProgramExercises() !== 0
        ) {
            return (
                <ProgramCounterSpanPositive>
                    {userBlueprintCount}/{countProgramExercises()}
                </ProgramCounterSpanPositive>
            );
        } else {
            return (
                <ProgramCounterSpanNegative>
                    {userBlueprintCount}/{countProgramExercises()}
                </ProgramCounterSpanNegative>
            );
        }
    };

    const renderFormattedBefore = () => {
        if (formattedProgram !== undefined && formattedProgram !== null) {
            if (formattedProgram.isFormatted === 'true') {
                return (
                    <FormattedText>
                        Previous Format Saved On:
                        <FormatSpan>
                            {dayjs(
                                formattedProgram.formattedProgram
                                    .dateLastFormatted
                            ).format('MM/DD/YYYY')}
                        </FormatSpan>
                    </FormattedText>
                );
            } else {
                return (
                    <FormattedText>
                        Previous Format Saved On:
                        <FormatSpanNegative>
                            No Existing Record
                        </FormatSpanNegative>
                    </FormattedText>
                );
            }
        }
    };

    const SubmitBlueprint = () => {
        //Create new route 'programFormats' and submit userBlueprint to this area...

        //Perhaps add a snackbar detailing that the blueprint has been saved, and the next time the user visits this page --> where the save button is a 'date saved prior' stamp...

        submitFormattedProgram(sortUserBlueprint(), id, showFormattedSnackbar);
    };

    const renderSubmissionButton = () => {
        //Renders a conditional 'save' button based on status of formatting exercises...
        if (
            userBlueprintCount === countProgramExercises() &&
            countProgramExercises() !== 0
        ) {
            return (
                <Fade>
                    <CustomSubmitButton
                        label="Save"
                        clickFunc={SubmitBlueprint}
                    />
                </Fade>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <MainContainer>
                <HeaderContainer>
                    <Link to={`/programs/configure/${name}/${id}`}>
                        <BackButton>
                            <BackIcon />
                        </BackButton>
                    </Link>
                    <FlexWrapper>
                        <MainHeader>{name}</MainHeader>
                        <ExerciseHeader>Format Blueprint</ExerciseHeader>
                    </FlexWrapper>
                </HeaderContainer>
                <ProgramCounterContainer>
                    <ProgramCounterLabel>
                        Exercises Formatted:
                        {renderProgramCounter()}
                    </ProgramCounterLabel>
                </ProgramCounterContainer>
                <LabelContainer>{renderFormattedBefore()}</LabelContainer>
                <SelectorContainer>
                    {isLoaded === true ? (
                        renderSelectorValues()
                    ) : (
                        <LoadingContainer>
                            <CustomLoadingDots></CustomLoadingDots>
                        </LoadingContainer>
                    )}
                </SelectorContainer>
                <ButtonContainer>{renderSubmissionButton()}</ButtonContainer>
            </MainContainer>
            <Slide direction="up" in={openFormattedSnackbar}>
                <CustomSnackBar
                    open={openFormattedSnackbar}
                    autoHideDuration={5000}
                    onClose={closeFormattedSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transitionDuration={300}
                >
                    <Alert severity="success">
                        Your program has been formatted.
                    </Alert>
                </CustomSnackBar>
            </Slide>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        programExercises: state.programExercises.programs,
        formattedProgram: state.formattedProgram.formattedProgram,
    };
};

export default connect(mapStateToProps, {
    getUserProgramExerciseData,
    getUserFormattedProgram,
    submitFormattedProgram,
})(BlueprintLayoutSelectionPage);
