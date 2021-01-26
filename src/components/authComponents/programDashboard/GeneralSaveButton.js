import React from 'react';
import styled from 'styled-components';

//Material UI Button
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Styles:
const CustomButton = withStyles({
    root: {
        color: '#ffffff',
        maxWidth: '5em',
        minWidth: '5em',
        backgroundColor: '#096B27',
        borderRadius: '.3em',
        fontFamily: 'Nunito, sans-serif, helvetica,',
        fontWeight: '300',
        fontSize: '.6em',
        letterSpacing: '0em',
        padding: '.2em 4em',
        textTransform: 'capitalize',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 8px',
        '&:hover': {
            backgroundColor: '#62c267',
        },
        '@media only screen and (min-width: 375px)': {
            padding: '.5em 0',
            fontSize: '1.2em',
        },
    },
})(Button);

const GeneralSaveButton = ({ clickFunction }) => {
    return <CustomButton onClick={clickFunction}>Save</CustomButton>;
};

export default GeneralSaveButton;
