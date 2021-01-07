import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import userRegistration from '../../redux/userRegistration/userRegistrationActions';
import { Link } from 'react-router-dom';

//Components
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import VerifyError from './VerifyError';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div``;

const LogoContainer = styled.div``;

const FormContainer = styled.div`
    padding: 1em 3em;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
`;

//Render:

const MainSignupForm = ({ handleSubmit, userRegistration }) => {
    //Client Verification Handlers:
    //We will use the browser to handle verification.

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

    const dispatchFormValues = (formValues) => {
        //Dispatch function will first run through all checker functions.
        setAreFieldsEmpty(fieldEmptyChecker(formValues));

        if (formValues.userName !== undefined) {
            setHasInvalidUsernameLength(
                usernameLengthChecker(formValues.userName)
            );
        }

        if (formValues.password !== undefined) {
            setHasInvalidPasswordLength(
                passwordLengthChecker(formValues.password)
            );
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
        }

        if (
            areFieldsEmpty === false &&
            hasInvalidUsernameLength === false &&
            hasInvalidPasswordLength === false &&
            invalidPasswordMatch === false
        ) {
            userRegistration(formValues);
        }
    };

    return (
        <>
            <MainContainer>
                <LogoContainer>GymJot</LogoContainer>
                <VerifyError
                    title="Please fill in all fields."
                    render={areFieldsEmpty}
                    center="true"
                />
                <form onSubmit={handleSubmit(dispatchFormValues)}>
                    <FormContainer>
                        <InputField
                            formName="firstName"
                            componentType="input"
                            label="First Name"
                        />
                        <InputField
                            formName="lastName"
                            componentType="input"
                            label="Last Name"
                        />
                        <InputField
                            formName="userName"
                            componentType="input"
                            label="Username"
                            errorTag="Your username must be 4 - 15 characters."
                            renderError={hasInvalidUsernameLength}
                        />
                        <InputField
                            formName="email"
                            componentType="input"
                            label="Email Address"
                            errorTag="Test!"
                            htmlType="email"
                        />
                        <InputField
                            formName="password"
                            componentType="input"
                            label="Password"
                            errorTag="Your password must be 6 - 20 characters."
                            htmlType="password"
                            renderError={hasInvalidPasswordLength}
                        />
                        <InputField
                            formName="passwordConfirm"
                            componentType="input"
                            label="Confirm Password"
                            errorTag="Your two passwords do not match!"
                            htmlType="password"
                            renderError={invalidPasswordMatch}
                        />
                        <ButtonContainer>
                            <SubmitButton label="Register" />
                        </ButtonContainer>
                    </FormContainer>
                </form>
                <div>
                    <Link to="/login">Already have an account? Log in.</Link>
                </div>
            </MainContainer>
        </>
    );
};

//Connecting to Redux and Redux-form:

const reduxConnection = connect(null, { userRegistration })(MainSignupForm);

export default reduxForm({
    form: 'registrationForm',
})(reduxConnection);
