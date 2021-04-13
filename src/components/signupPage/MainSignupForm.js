import React, { useState } from 'react';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import userRegistration from '../../redux/userRegistration/userRegistrationActions';
import { Link } from 'react-router-dom';

import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

//Components
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import VerifyError from './VerifyError';

//Styles:
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import CustomSaveButton from '../authComponents/dashboardComponents/CustomSaveButton';
import Button from '@material-ui/core/Button';
import { Mail } from '@styled-icons/entypo/Mail';
import { UserDetail } from '@styled-icons/boxicons-solid/UserDetail';
import { UserCircle } from '@styled-icons/boxicons-solid/UserCircle';
import { Lock2 } from '@styled-icons/remix-fill/Lock2';
import gymjot_logo from '../../imgs/gymjot_transparent.png';
import { SnackbarContent } from '@material-ui/core';

const MainContainer = styled.div`
    background: ${(props) => props.theme.background};
    height: 100vh;
`;

const WrapperContainer = styled.div`
    position: relative;
    top: 50vh;
    transform: translateY(-45vh);
    text-align: center;
    padding: 0.5em 0;

    @media only screen and (min-width: 375px) {
        top: 47vh;
    }
`;

const DeskWrapperContainer = styled.div`
    position: relative;
    top: 50vh;
    transform: translateY(-45vh);
    text-align: center;
    padding: 0.5em 0;
`;

const DeskShadowContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    max-width: 40em;
    width: 40em;
    margin: 0 auto;
    padding: 2em 2em;
    border-radius: 1em;
`;

const LogoContainer = styled(Link)`
    text-align: center;
`;

const StyledSignUpHeader = styled.h1`
    color: ${({ theme }) => theme.MobHeaderColor};
    font-size: 0.9em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    margin-top: 0.5em;

    @media only screen and (min-width: 375px) {
        font-size: 1.2em;
    }
`;

const FormContainer = styled.div`
    padding: 1em 2em;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
`;

export const StyledMailIcon = styled(Mail)`
    height: 1.8em;
    width: 1.8em;
    color: ${(props) => props.theme.MobIconColor};
`;

const StyledPersonIcon = styled(UserDetail)`
    height: 1.8em;
    width: 1.8em;
    color: ${(props) => props.theme.MobIconColor};
`;

export const StyledUserIcon = styled(UserCircle)`
    height: 1.8em;
    width: 1.8em;
    color: ${(props) => props.theme.MobIconColor};
`;

export const StyledLockIcon = styled(Lock2)`
    height: 1.5em;
    width: 1.5em;
    color: ${(props) => props.theme.MobIconColor};
`;

export const StyledLogo = styled.img`
    object-fit: cover;
    height: 8em;
    width: 8em;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 8px;

    @media only screen and (min-width: 375px) {
        height: 12em;
        width: 12em;
    }
`;

const NoticeContainer = styled.div`
    margin-bottom: 1em;
`;

export const PromptSpan = styled.span`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1em;
    font-weight: 300;
    color: ${({ theme }) => theme.MobPromptSpan};

    @media only screen and (min-width: 375px) {
        font-size: 1em;
    }
`;

export const PromptLink = styled(Link)`
    margin-left: 0.5em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 0.9em;
    font-weight: 600;
    color: ${({ theme }) => theme.MobPromptLink};

    @media only screen and (min-width: 375px) {
        font-size: 1.1em;
        font-weight: 900;
    }
`;

const CustomMuiAlert = withStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#136539',
        padding: '.6em .8em',
        textShadow: 'rgba(0, 0, 0, 0.9) 0px 2px 2px',
        '& .MuiAlert-icon': {
            fontSize: '1.25em',
            ['@media (max-width: 320px)']: {
                fontSize: '2rem',
            },
        },
        '& .MuiAlert-message': {
            fontSize: '.85em',
            whiteSpace: 'nowrap',
            ['@media (max-width: 320px)']: {
                fontSize: '1rem',
            },
        },
        '& .MuiAlert-action': {
            margin: '0',
            padding: '0',
        },
        '@media only screen and (max-width: 320px)': {
            padding: '.8em .8em',
            '& .MuiAlert-icon': {
                fontSize: '1.1em',
            },
            '& .MuiAlert-message': {
                fontSize: '.6em',
            },
        },
        '@media only screen and (max-width: 375px)': {
            padding: '.8em .8em',
            '& .MuiAlert-icon': {
                fontSize: '2.9em',
            },
            '& .MuiAlert-message': {
                fontSize: '1.1em',
            },
        },
        '@media only screen and (max-width: 414px)': {
            padding: '.8em .8em',
            '& .MuiAlert-icon': {
                fontSize: '3.5em',
            },
            '& .MuiAlert-message': {
                fontSize: '1.2em',
            },
        },
    },
    filledSuccess: {
        background: '#1A222F',
    },
    filledError: {
        background: '#1A222F',
    },
    filledInfo: {
        background: '#1A222F',
    },
}))(MuiAlert);

const CustomAlertButton = withStyles(() => ({
    root: {
        padding: '.6em .8em',
        margin: '0',
        height: '2em',
        maxWidth: '4.5em',
        minWidth: '4.5em',
        fontFamily: 'Nunito, sans-serif, helvetica',
        fontSize: '.5em',
        fontWeight: '500',
        textTransform: 'capitalize',
        boxShadow: 'rgba(0, 0, 0, 0.7) 0px 3px 8px',

        '@media only screen and (max-width: 375px)': {
            fontSize: '1.2em',
            padding: '1.3em 2em',
            margin: '0 0',
        },

        '@media only screen and (max-width: 320px)': {
            fontSize: '1em',
            padding: '1.3em 2em',
            margin: '0 0',
        },
        '@media only screen and (max-width: 414px)': {
            fontSize: '1.4em',
            padding: '1.3em 1.2em',
            margin: '0 0',
        },
    },
}))(Button);

//Slide transition function for MUI:

function slideTransition(props) {
    return (
        <Slide
            {...props}
            direction="down"
            timeout={{
                enter: 400,
                exit: 400,
            }}
        />
    );
}

//Helper functions:
const Alert = (props) => {
    return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
};

//Render:

const MainSignupForm = ({ handleSubmit, userRegistration }) => {
    //Client Verification Handlers:
    //We will use the browser to handle verification.
    //Snackbar controls the label that indicates proper user regristration.

    const [accountCreationLoading, setAccountCreationLoading] = useState(false);

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [areFieldsEmpty, setAreFieldsEmpty] = useState(undefined);
    const [hasInvalidUsernameLength, setHasInvalidUsernameLength] = useState(
        undefined
    );
    const [hasInvalidPasswordLength, setHasInvalidPasswordLength] = useState(
        undefined
    );
    const [invalidPasswordMatch, setInvalidPasswordMatch] = useState(undefined);

    //Verification Checker Functions:

    const fieldEmptyChecker = (obj) => {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true;
        } else {
            return false;
        }
    };

    const usernameLengthChecker = (string) => {
        if (string.trim().length > 4 && string.trim().length < 15) {
            //meets requirements
            return false;
        } else {
            return true;
        }
    };

    const passwordLengthChecker = (string) => {
        if (string.trim().length > 6 && string.trim().length < 20) {
            return false;
        } else {
            return true;
        }
    };

    const passwordMatchChecker = (password, passwordConfirm) => {
        if (
            password.trim().normalize() === passwordConfirm.trim().normalize()
        ) {
            return false;
        } else {
            return true;
        }
    };

    const dispatchFormValues = (formValues, dispatch) => {
        //Dispatch function will first run through all checker functions.

        //We will use variables to also store the result instead of React state variables because they take some time to 'set' the results (async);

        //Meet requirements === false;
        let fieldsEmpty;
        let invalidUsername;
        let invalidPassword;
        let invalidPasswordMatchVar;

        setAreFieldsEmpty(fieldEmptyChecker(formValues));
        fieldsEmpty = fieldEmptyChecker(formValues);

        if (formValues.userName !== undefined) {
            setHasInvalidUsernameLength(
                usernameLengthChecker(formValues.userName)
            );

            invalidUsername = usernameLengthChecker(formValues.userName);
        }

        if (formValues.password !== undefined) {
            setHasInvalidPasswordLength(
                passwordLengthChecker(formValues.password)
            );

            invalidPassword = passwordLengthChecker(formValues.password);
        }

        if (
            formValues.password !== undefined &&
            formValues.passwordConfirm !== undefined
        ) {
            setInvalidPasswordMatch(
                passwordMatchChecker(
                    formValues.password,
                    formValues.passwordConfirm
                )
            );

            invalidPasswordMatchVar = passwordMatchChecker(
                formValues.password,
                formValues.passwordConfirm
            );
        }

        if (
            fieldsEmpty === false &&
            invalidUsername === false &&
            invalidPassword === false &&
            invalidPasswordMatchVar === false
        ) {
            //If tests pass, set button state to loading...
            setAccountCreationLoading(true);

            userRegistration(
                formValues,
                showSnackBar,
                reenableButtonAfterAccountCreation
            );
            dispatch(reset('registrationForm'));
        }
    };

    //Controls button state:
    const reenableButtonAfterAccountCreation = (bool) => {
        setAccountCreationLoading(bool);
    };

    //Controls opening the snackbar:
    const showSnackBar = (bool) => {
        setOpenSnackBar(bool);
    };

    //Controls closing the snackbar:
    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const renderMainSignupForm = () => {
        if (isMobileOnly) {
            return (
                <MobileOnlyView>
                    <MainContainer>
                        <WrapperContainer>
                            <LogoContainer to="/">
                                <StyledLogo
                                    src={gymjot_logo}
                                    alt="gymjot logo"
                                />
                            </LogoContainer>
                            <StyledSignUpHeader>
                                Pleased to meet you, new GymJotter.
                            </StyledSignUpHeader>
                            <VerifyError
                                title="Please fill in all fields."
                                render={areFieldsEmpty}
                                center="true"
                            />
                            <form
                                onSubmit={handleSubmit(dispatchFormValues)}
                                name="registerForm"
                                id="regForm"
                            >
                                <FormContainer>
                                    <InputField
                                        formName="firstName"
                                        componentType="input"
                                        label="First Name"
                                    >
                                        <StyledPersonIcon />
                                    </InputField>
                                    <InputField
                                        formName="lastName"
                                        componentType="input"
                                        label="Last Name"
                                    >
                                        <StyledPersonIcon />
                                    </InputField>
                                    <InputField
                                        formName="userName"
                                        componentType="input"
                                        label="Username"
                                        errorTag="Your username must be 4 - 15 characters."
                                        renderError={hasInvalidUsernameLength}
                                    >
                                        <StyledUserIcon />
                                    </InputField>
                                    <InputField
                                        formName="email"
                                        componentType="input"
                                        label="Email Address"
                                        htmlType="email"
                                    >
                                        <StyledMailIcon />
                                    </InputField>
                                    <InputField
                                        formName="password"
                                        componentType="input"
                                        label="Password"
                                        errorTag="Your password must be 6 - 20 characters."
                                        htmlType="password"
                                        renderError={hasInvalidPasswordLength}
                                    >
                                        <StyledLockIcon />
                                    </InputField>
                                    <InputField
                                        formName="passwordConfirm"
                                        componentType="input"
                                        label="Confirm Password"
                                        errorTag="Your two passwords do not match!"
                                        htmlType="password"
                                        renderError={invalidPasswordMatch}
                                    >
                                        <StyledLockIcon />
                                    </InputField>
                                    <ButtonContainer>
                                        <SubmitButton
                                            label={
                                                accountCreationLoading === false
                                                    ? 'Create new account'
                                                    : 'Creating your account'
                                            }
                                            formID="regForm"
                                            disabledState={
                                                accountCreationLoading
                                            }
                                            loader={
                                                accountCreationLoading && (
                                                    <CircularProgress
                                                        size={20}
                                                        thickness={6}
                                                        color="inherit"
                                                    />
                                                )
                                            }
                                        />
                                    </ButtonContainer>
                                </FormContainer>
                            </form>
                            <NoticeContainer>
                                <PromptSpan>
                                    Already have an account?
                                </PromptSpan>
                                <PromptLink to="/login">Login here.</PromptLink>
                            </NoticeContainer>
                        </WrapperContainer>
                        <Snackbar
                            open={openSnackBar}
                            autoHideDuration={60000}
                            onClose={closeSnackBar}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
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
                                    <>
                                        <Alert severity="success">
                                            Your account has been created!
                                        </Alert>
                                        <Link to="/login">
                                            <CustomSaveButton buttonLabel="Login" />
                                        </Link>
                                    </>
                                }
                            />
                        </Snackbar>
                    </MainContainer>
                </MobileOnlyView>
            );
        } else if (isBrowser) {
            return (
                <BrowserView>
                    <MainContainer>
                        <DeskWrapperContainer>
                            <DeskShadowContainer>
                                <LogoContainer to="/">
                                    <StyledLogo
                                        src={gymjot_logo}
                                        alt="gymjot logo"
                                    />
                                </LogoContainer>
                                <StyledSignUpHeader>
                                    Pleased to meet you, new GymJotter.
                                </StyledSignUpHeader>
                                <VerifyError
                                    title="Please fill in all fields."
                                    render={areFieldsEmpty}
                                    center="true"
                                />
                                <form
                                    onSubmit={handleSubmit(dispatchFormValues)}
                                    name="registerForm"
                                    id="regForm"
                                >
                                    <FormContainer>
                                        <InputField
                                            formName="firstName"
                                            componentType="input"
                                            label="First Name"
                                        >
                                            <StyledPersonIcon />
                                        </InputField>
                                        <InputField
                                            formName="lastName"
                                            componentType="input"
                                            label="Last Name"
                                        >
                                            <StyledPersonIcon />
                                        </InputField>
                                        <InputField
                                            formName="userName"
                                            componentType="input"
                                            label="Username"
                                            errorTag="Your username must be 4 - 15 characters."
                                            renderError={
                                                hasInvalidUsernameLength
                                            }
                                        >
                                            <StyledUserIcon />
                                        </InputField>
                                        <InputField
                                            formName="email"
                                            componentType="input"
                                            label="Email Address"
                                            htmlType="email"
                                        >
                                            <StyledMailIcon />
                                        </InputField>
                                        <InputField
                                            formName="password"
                                            componentType="input"
                                            label="Password"
                                            errorTag="Your password must be 6 - 20 characters."
                                            htmlType="password"
                                            renderError={
                                                hasInvalidPasswordLength
                                            }
                                        >
                                            <StyledLockIcon />
                                        </InputField>
                                        <InputField
                                            formName="passwordConfirm"
                                            componentType="input"
                                            label="Confirm Password"
                                            errorTag="Your two passwords do not match!"
                                            htmlType="password"
                                            renderError={invalidPasswordMatch}
                                        >
                                            <StyledLockIcon />
                                        </InputField>
                                        <ButtonContainer>
                                            <SubmitButton
                                                label="Create new account"
                                                formID="regForm"
                                            />
                                        </ButtonContainer>
                                    </FormContainer>
                                </form>
                                <NoticeContainer>
                                    <PromptSpan>
                                        Already have an account?
                                    </PromptSpan>
                                    <PromptLink to="/login">
                                        Login here.
                                    </PromptLink>
                                </NoticeContainer>
                            </DeskShadowContainer>
                        </DeskWrapperContainer>
                        <Snackbar
                            open={openSnackBar}
                            autoHideDuration={60000}
                            onClose={closeSnackBar}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
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
                                    <Alert
                                        severity="success"
                                        action={
                                            <Link to="/login">
                                                <CustomAlertButton
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Login
                                                </CustomAlertButton>
                                            </Link>
                                        }
                                    >
                                        Your account has been successfully
                                        created!
                                    </Alert>
                                }
                            />
                        </Snackbar>
                    </MainContainer>
                </BrowserView>
            );
        }
    };

    return <>{renderMainSignupForm()}</>;
};

//Connecting to Redux and Redux-form:

const reduxConnection = connect(null, { userRegistration })(MainSignupForm);

export default reduxForm({
    form: 'registrationForm',
})(reduxConnection);
