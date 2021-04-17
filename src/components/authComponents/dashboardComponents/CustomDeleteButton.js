import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

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
        backgroundColor: '#9c110a',
        borderRadius: '.4rem',
        transition: 'all .3s ease-in',
        border: 'none',
        '&:hover': {
            backgroundColor: '#780600',
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

const LoaderContainer = styled.div`
    margin-right: 0.5rem;
`;

const CustomDeleteButton = ({
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

export default CustomDeleteButton;
