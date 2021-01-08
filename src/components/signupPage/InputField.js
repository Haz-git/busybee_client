import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import VerifyError from './VerifyError';

//Styles:

export const InputFieldContainer = styled.div`
    padding-top: 2em;
    padding-bottom: 2em;
    text-align: left;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        padding-top: 0.35em;
        padding-bottom: 0.35em;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        padding-top: 0.35em;
        padding-bottom: 0.35em;
    }
`;

export const StyledLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Nunito', sans-serif, Helvetica;
    font-weight: 700;
    font-size: 17px;
    color: ${(props) => props.theme.inputFieldLabel};

    @media only screen and (max-width: 650px) {
        font-size: 0.6em;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 13px;
    }
`;

export const StyledField = styled(Field)`
    width: 100%;
    /* padding: 12px 10px; */
    padding: 0.65em 0.8em;
    margin: 0.1em 0;
    display: inline-block;
    border: none;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
    color: ${(props) => props.theme.inputFieldColor};
    background-color: inherit;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 100;
    font-size: 0.8em;

    &:focus {
        outline: none;
        outline-width: 0;
    }

    @media only screen and (max-width: 650px) {
        height: 0em;
        margin: 4px 0;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        height: 35px;
        margin: 4px 0;
    }
`;

//Render:

const InputField = ({
    formName,
    componentType,
    label,
    errorTag,
    htmlType,
    renderError,
    children,
}) => {
    if (htmlType !== undefined) {
        return (
            <InputFieldContainer>
                <StyledLabel>
                    <span>{label}</span>
                    <span>{children}</span>
                </StyledLabel>
                <StyledField
                    name={formName}
                    component={componentType}
                    type={htmlType}
                    autoComplete="off"
                />
                <VerifyError title={errorTag} render={renderError} />
            </InputFieldContainer>
        );
    } else {
        return (
            <InputFieldContainer>
                <StyledLabel>
                    <span>{label}</span>
                    <span>{children}</span>
                </StyledLabel>
                <StyledField
                    name={formName}
                    component={componentType}
                    autoComplete="off"
                />
                <VerifyError title={errorTag} render={renderError} />
            </InputFieldContainer>
        );
    }
};

export default InputField;
