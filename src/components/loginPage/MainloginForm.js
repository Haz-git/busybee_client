import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingPage from './LoadingPage';
import userLogin from '../../redux/userLogin/userLoginActions';
import InputField from '../signupPage/InputField';
import Fade from 'react-reveal/Fade';

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

const LoginLogo = styled(StyledLogo)`
    height: 8em;
    width: 8em;

    @media only screen and (min-width: 375px) {
        height: 12em;
        width: 12em;
    }
`;

const WrapperContainer = styled.div`
    position: relative;
    top: 50vh;
    -webkit-transform: translateY(-40vh);
    -moz-transform: translateY(-40vh);
    -ms-transform: translateY(-40vh);
    -o-transform: translateY(-40vh);
    transform: translateY(-40vh);
    text-align: center;

    @media only screen and (min-width: 375px) {
        top: 47vh;
    }
`;

const LogoContainer = styled(Link)`
    text-align: center;
`;

const StyledLoginHeader = styled.h1`
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

const ErrorTextInvisible = styled.h2`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 1em;
    font-weight: 100;
    opacity: 0;

    @media only screen and (min-width: 375px) {
        font-size: 1em;
    }

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 1em;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 1em;
    }
`;

const ErrorTextVisible = styled.h2`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 15px;
    font-weight: 100;

    @media only screen and (min-width: 375px) {
        font-size: 1em;
    }

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 1em;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 1em;
    }
`;

//Render:
const MainLoginForm = ({ handleSubmit, userLogin }) => {
    /*
        setHasErrors is responsible for rendering the verification error if the user's credentials are wrong.
        renderLoading controls the loading screen after the login details are submitted.
    */
    const [hasErrors, setHasErrors] = useState(null);
    const [renderLoading, setRenderLoading] = useState(null);

    const handleUserLogin = (formValues) => {
        if (!formValues.email || !formValues.password) {
            // If the user doesn't provide an email or password, immediately render verification error.
            return setHasErrors(true);
        } else {
            setRenderLoading(true);

            //Show the loading page for 3.5 seconds on purpose.
            setTimeout(() => {
                //Dispatch the user's details to the userLogin action creator. When a response is returned, then an 'errorFlag' value should be returned from the action creator. If the errorFlag is true, then verification error should show and loadingPage is unmounted.
                userLogin(formValues).then((errorFlag) => {
                    setHasErrors(errorFlag);

                    if (errorFlag === true) {
                        setRenderLoading(false);
                    }
                });
            }, 3500);
        }
    };

    const renderErrorText = () => {
        //This function renders the same verification error text, but with different opacities according to the hasErrors state.
        if (hasErrors === true) {
            return (
                <Fade>
                    <ErrorTextVisible>
                        Your verification details were incorrect.
                    </ErrorTextVisible>
                </Fade>
            );
        } else {
            return (
                <ErrorTextInvisible>
                    Your verification details were incorrect.
                </ErrorTextInvisible>
            );
        }
    };

    return (
        <>
            <LoadingPage renderLoading={renderLoading} />
            <MainContainer>
                <WrapperContainer>
                    <LogoContainer to="/">
                        <LoginLogo src={gymjot_logo} alt="gymjot logo" />
                    </LogoContainer>
                    <StyledLoginHeader>
                        Welcome back, GymJotter.
                    </StyledLoginHeader>
                    <form onSubmit={handleSubmit(handleUserLogin)}>
                        <FormContainer>
                            {renderErrorText()}
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
