import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import userRegistration from '../../redux/userRegistration/userRegistrationActions';

//Components
import InputField from './InputField';
import SubmitButton from './SubmitButton';

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
    const dispatchFormValues = (formValues) => {
        console.log(formValues);
    };

    return (
        <>
            <MainContainer>
                <LogoContainer>GymJot</LogoContainer>
                <form onSubmit={handleSubmit(dispatchFormValues)}>
                    <FormContainer>
                        <InputField
                            formName="firstName"
                            componentType="input"
                            label="First Name"
                            errorTag="Test!"
                        />
                        <InputField
                            formName="lastName"
                            componentType="input"
                            label="Last Name"
                            errorTag="Test!"
                        />
                        <InputField
                            formName="userName"
                            componentType="input"
                            label="Username"
                            errorTag="Test!"
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
                            errorTag="Test!"
                            htmlType="password"
                        />
                        <InputField
                            formName="passwordConfirm"
                            componentType="input"
                            label="Confirm Password"
                            errorTag="Test!"
                            htmlType="password"
                        />
                        <ButtonContainer>
                            <SubmitButton label="Register" />
                        </ButtonContainer>
                    </FormContainer>
                </form>
            </MainContainer>
        </>
    );
};

//Connecting to Redux and Redux-form:

const reduxConnection = connect(null, { userRegistration })(MainSignupForm);

export default reduxForm({
    form: 'registrationForm',
})(reduxConnection);
