import React from 'react';
import styled from 'styled-components';

//Material UI Button
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Styles:
const CustomButton = withStyles({
    root: {
        color: '#ffffff',
        maxWidth: '100%',
        minWidth: '100%',
        backgroundColor: '#14A84B',
        borderRadius: '2em',
        fontFamily: 'Nunito, sans-serif, helvetica,',
        fontWeight: '300',
        fontSize: '.6em',
        letterSpacing: '.1em',
        padding: '1em 0',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#62c267',
        },
        '@media only screen and (min-width: 375px)': {
            padding: '.7em 0',
            fontSize: '1em',
        },
    },
})(Button);

//Render:
const SubmitButton = ({ label, formID }) => {
    return (
        <CustomButton type="submit" value="submit" form={formID}>
            {label}
        </CustomButton>
    );
};

export default SubmitButton;
