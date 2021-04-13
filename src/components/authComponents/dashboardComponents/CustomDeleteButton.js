import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const StyledButtonBase = withStyles({
    root: {
        width: '100%',
        maxWidth: '100%',
    },
})(ButtonBase);

export const CustomButton = styled.div`
    border: none;
    border-radius: 0.4rem;
    color: white;
    background: #9c110a;
    font-family: 'Lato', sans-serif, helvetica;
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: 0.05rem;
    padding: 0.7rem 1rem;
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 10px;
    cursor: pointer;
    width: 100%;
    max-width: 100%;
    transition: all 0.075s ease;

    &:hover {
        background: #780600;
    }

    &:focus {
        outline: none;
    }

    @media screen and (max-width: 320px) {
        font-size: 1rem;
    }
`;

const CustomDeleteButton = ({ buttonLabel, onClickFunction }) => {
    return (
        <>
            <StyledButtonBase onClick={onClickFunction}>
                <CustomButton>{buttonLabel}</CustomButton>
            </StyledButtonBase>
        </>
    );
};

export default CustomDeleteButton;
