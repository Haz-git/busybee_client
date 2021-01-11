import React, { useState } from 'react';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import userRegistration from '../../redux/userRegistration/userRegistrationActions';
import { Link } from 'react-router-dom';

//Components
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import VerifyError from './VerifyError';

//Styles:
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { Mail } from '@styled-icons/entypo/Mail';
import { UserDetail } from '@styled-icons/boxicons-solid/UserDetail';
import { UserCircle } from '@styled-icons/boxicons-solid/UserCircle';
import { Lock2 } from '@styled-icons/remix-fill/Lock2';
import gymjot_logo from '../../imgs/gymjot_transparent.png';

const MainContainer = styled.div`
    background: ${(props) => props.theme.background};
    height: 100vh;
`;

const WrapperContainer = styled.div`
    position: relative;
    top: 50vh;
    transform: translateY(-45vh);
    text-align: center;
`;

const LogoContainer = styled(Link)`
    text-align: center;
`;

const StyledSignUpHeader = styled.h1`
    color: ${({ theme }) => theme.MobHeaderColor};
    font-size: 0.7em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 200;
    margin-top: 0.5em;
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
    height: 5.5em;
    width: 5.5em;
`;

const NoticeContainer = styled.div``;

export const PromptSpan = styled.span`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 0.3em;
    font-weight: 300;
    color: ${({ theme }) => theme.MobPromptSpan};
`;

export const PromptLink = styled(Link)`
    margin-left: 0.7em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 0.3em;
    font-weight: 600;
    color: ${({ theme }) => theme.MobPromptLink};
`;

const CustomMuiAlert = withStyles(() => ({
    root: {
        backgroundColor: '#136539',
        '& .MuiAlert-icon': {
            fontSize: '1.25em',
        },
        '& .MuiAlert-message': {
            fontSize: '.85em',
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
}))(MuiAlert);

const CustomAlertButton = withStyles(() => ({
    root: {
        padding: '2em 4em',
        margin: '0',
        height: '2em',
        maxWidth: '4.5em',
        minWidth: '4.5em',
        fontFamily: 'Nunito, sans-serif, helvetica',
        fontSize: '.5em',
        fontWeight: '500',
    },
}))(Button);

//Helper functions:
const Alert = (props) => {
    return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
};

//Render:

const MainSignupForm = ({ handleSubmit, userRegistration }) => {
    //Client Verification Handlers:
    //We will use the browser to handle verification.
    //Snackbar controls the label that indicates proper user regristration.
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
            userRegistration(formValues, showSnackBar);
            dispatch(reset('registrationForm'));
        }
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

    return (
        <>
            <MainContainer>
                <WrapperContainer>
                    <LogoContainer to="/">
                        <StyledLogo src={gymjot_logo} alt="gymjot logo" />
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
                                <SubmitButton label="Create new account" />
                            </ButtonContainer>
                        </FormContainer>
                    </form>
                    <NoticeContainer>
                        <PromptSpan>Already have an account?</PromptSpan>
                        <PromptLink to="/login">Login here.</PromptLink>
                    </NoticeContainer>
                </WrapperContainer>
                <Slide direction="right" in={openSnackBar} timeout="exit">
                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={20000}
                        onClose={closeSnackBar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
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
                            Your account has been created!
                        </Alert>
                    </Snackbar>
                </Slide>
            </MainContainer>
        </>
    );
};

//Connecting to Redux and Redux-form:

const reduxConnection = connect(null, { userRegistration })(MainSignupForm);

export default reduxForm({
    form: 'registrationForm',
})(reduxConnection);
