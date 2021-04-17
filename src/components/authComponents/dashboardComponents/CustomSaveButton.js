import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledButtonBase = withStyles({
    root: {
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Lato, sans-serif, helvetica',
        fontWeight: '600',
        fontSize: '1.2rem',
        letterSpacing: '.05rem',
        padding: '.7rem 1rem',
        textShadow: 'rgba(0, 0, 0, 1) 0px 1px 1px',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 10px',
        cursor: 'pointer',
        backgroundColor: '#20861b',
        borderRadius: '.4rem',
        transition: 'all .4s ease-in-out',
        border: 'none',
        '&:hover': {
            backgroundColor: '#034500',
        },
        '&:disabled': {
            color: 'white',
            backgroundColor: '#22303C',
        },
        '@media screen and (max-width: 320px)': {
            fontSize: '1rem',
        },
    },
})(ButtonBase);

// export const CustomButton = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: none;
//     border-radius: 0.4rem;
//     color: white;
//     font-family: 'Lato', sans-serif, helvetica;
//     font-weight: 600;
//     font-size: 1.2rem;
//     letter-spacing: 0.05rem;
//     padding: 0.7rem 1rem;
//     text-shadow: rgba(0, 0, 0, 1) 0px 1px 1px;
//     box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 10px;
//     cursor: pointer;
//     width: 100%;
//     max-width: 100%;
//     transition: all 0.35s ease-in-out;

//     &:focus {
//         outline: none;
//     }

//     @media screen and (max-width: 320px) {
//         font-size: 1rem;
//     }
// `;

const LoaderContainer = styled.div`
    margin-right: 0.5rem;
`;

const CustomSaveButton = ({
    buttonLabel,
    onClickFunction,
    isLoaderBtn,
    disabledState,
}) => {
    return (
        <>
            <StyledButtonBase
                onClick={onClickFunction}
                disabled={disabledState}
            >
                {isLoaderBtn === true && disabledState === true ? (
                    <LoaderContainer>
                        <CircularProgress
                            size={20}
                            thickness={6}
                            color="inherit"
                        />
                    </LoaderContainer>
                ) : null}
                {buttonLabel}
            </StyledButtonBase>
        </>
    );
};

export default CustomSaveButton;
