import React from 'react';
import styled from 'styled-components';

//Material UI Button
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Styles:
const CustomButton = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: '#ffffff',
        maxWidth: '100%',
        minWidth: '100%',
        backgroundColor: '#14A84B',
        borderRadius: '2em',
        fontFamily: 'Nunito, sans-serif, helvetica,',
        fontWeight: '300',
        fontSize: '.8em',
        letterSpacing: '.1em',
        padding: '1em 0',
        textTransform: 'capitalize',
        transition: 'all .2s ease-in-out',
        '&:hover': {
            backgroundColor: '#62c267',
        },
        '&:disabled': {
            color: 'white',
            backgroundColor: '#1a222f',
        },
        '@media only screen and (min-width: 375px)': {
            padding: '.7em 0',
            fontSize: '1em',
        },
    },
})(Button);

//Render:
const SubmitButton = ({ label, formID, loader, disabledState }) => {
    return (
        <CustomButton
            type="submit"
            value="submit"
            form={formID}
            disabled={disabledState}
        >
            {loader}
            {label}
        </CustomButton>
    );
};

export default SubmitButton;
