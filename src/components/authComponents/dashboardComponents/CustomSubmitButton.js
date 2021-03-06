import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

//Styles:

const StyledSubmitButton = withStyles({
    root: {
        fontSize: '1.2em',
        borderRadius: '2em',
        minWidth: '100%',
        maxWidth: '100%',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .8)',
        background:
            'linear-gradient(90deg, rgba(87,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
        color: 'white',
        padding: '.3em .2em',
        '&:hover': {
            background:
                'linear-gradient(90deg, rgba(87,97,0,1) 0%, rgba(0,133,46,1) 50%, rgba(0,133,150,1) 100%)',
        },
        '@media only screen and (min-width: 375px)': {
            fontSize: '1.25em',
        },
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const CustomSubmitButton = ({ variant, label, type, clickFunc }) => {
    return (
        <StyledSubmitButton
            variant={variant}
            type={type}
            onClick={clickFunc ? clickFunc : null}
        >
            {label}
        </StyledSubmitButton>
    );
};

export default CustomSubmitButton;
