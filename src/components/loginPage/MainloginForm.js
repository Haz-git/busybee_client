import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import userLogin from '../../redux/userLogin/userLoginActions';
import InputField from '../signupPage/InputField';

//Styles:
import styled from 'styled-components';
import SubmitButton from '../signupPage/SubmitButton';

const MainContainer = styled.div``;

const WrapperContainer = styled.div``;

const FormContainer = styled.div``;

//Render:
const MainLoginForm = ({ handleSubmit, userLogin }) => {
    const handleUserLogin = (formValues) => {
        userLogin(formValues);
    };

    return (
        <>
            <MainContainer>
                <WrapperContainer>
                    <h1>This is the login form.</h1>
                    <form onSubmit={handleSubmit(handleUserLogin)}>
                        <FormContainer>
                            <InputField
                                formName="email"
                                componentType="input"
                                label="Email Address"
                                htmlType="email"
                            />
                            <InputField
                                formName="password"
                                componentType="input"
                                label="Password"
                                htmlType="password"
                            />
                        </FormContainer>
                        <div>
                            <SubmitButton label="Login" />
                        </div>
                    </form>
                    <div>
                        <Link to="/">Main Page Link</Link>
                        <Link to="/signup">Registration form link</Link>
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
