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
        padding-top: 0.3em;
        padding-bottom: 0.3em;
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
    font-weight: 200;
    font-size: 1em;
    color: ${(props) => props.theme.inputFieldLabel};

    @media only screen and (max-width: 377px) {
        font-size: 1em;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 1.5em;
    }
`;

export const StyledField = styled(Field)`
    width: 100%;
    padding: 0em 1em;
    margin: 0.1em 0;
    display: inline-block;
    border: none;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
    color: ${(props) => props.theme.inputFieldColor};
    background: transparent;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 0.9em;
    height: 100%;

    //Rounded Look for mobile-fix:
    border-radius: 0;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;

    &:focus {
        outline: none;
        outline-width: 0;
    }

    @media only screen and (min-width: 375px) {
        font-size: 1.3em;
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
