import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import userLogin from '../../redux/userLogin/userLoginActions';
import InputField from '../signupPage/InputField';

//Styles:
import styled from 'styled-components';
import SubmitButton from '../signupPage/SubmitButton';
import {
    StyledUserIcon,
    StyledLockIcon,
    StyledLogo,
    PromptLink,
    PromptSpan,
} from '../signupPage/MainSignupForm';
import gymjot_logo from '../../imgs/gymjot_transparent.png';

const MainContainer = styled.div`
    background: ${(props) => props.theme.background};
    height: 100vh;
`;

const WrapperContainer = styled.div`
    position: relative;
    top: 50vh;
    transform: translateY(-30vh);
    text-align: center;
`;

const LogoContainer = styled(Link)`
    text-align: center;
`;

const StyledLoginHeader = styled.h1`
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

//Render:
const MainLoginForm = ({ handleSubmit, userLogin }) => {
    const handleUserLogin = (formValues) => {
        userLogin(formValues);
    };

    return (
        <>
            <MainContainer>
                <WrapperContainer>
                    <LogoContainer to="/">
                        <StyledLogo src={gymjot_logo} alt="gymjot logo" />
                    </LogoContainer>
                    <StyledLoginHeader>
                        Welcome back, GymJotter.
                    </StyledLoginHeader>
                    <form onSubmit={handleSubmit(handleUserLogin)}>
                        <FormContainer>
                            <InputField
                                formName="email"
                                componentType="input"
                                label="Email Address"
                                htmlType="email"
                            >
                                <StyledUserIcon />
                            </InputField>
                            <InputField
                                formName="password"
                                componentType="input"
                                label="Password"
                                htmlType="password"
                            >
                                <StyledLockIcon />
                            </InputField>
                            <ButtonContainer>
                                <SubmitButton label="Login" />
                            </ButtonContainer>
                        </FormContainer>
                    </form>
                    <div>
                        <PromptSpan>Don't have an account yet?</PromptSpan>
                        <PromptLink to="/signup">Join here.</PromptLink>
                    </div>
                </WrapperContainer>
            </MainContainer>
        </>
    );
};

//Connecting to Redux and Redux-form:

const reduxConnect = connect(null, { userLogin })(MainLoginForm);

export default reduxForm({
    form: 'loginForm',
})(reduxConnect);
