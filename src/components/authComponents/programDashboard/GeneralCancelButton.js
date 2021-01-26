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
        backgroundColor: '#90130C',
        borderRadius: '.3em',
        fontFamily: 'Nunito, sans-serif, helvetica,',
        fontWeight: '300',
        fontSize: '.6em',
        letterSpacing: '0em',
        padding: '.2em 4em',
        textTransform: 'capitalize',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 8px',
        '&:hover': {
            backgroundColor: '#CB484F',
        },
        '@media only screen and (min-width: 375px)': {
            padding: '.5em 0',
            fontSize: '1.2em',
        },
    },
})(Button);

const GeneralCancelButton = ({ clickFunction }) => {
    return <CustomButton onClick={clickFunction}>Cancel</CustomButton>;
};

export default GeneralCancelButton;
