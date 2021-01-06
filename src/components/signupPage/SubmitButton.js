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
        backgroundColor: '#569a59',
        '&:hover': {
            backgroundColor: '#62c267',
        },
    },
})(Button);

//Render:
const SubmitButton = ({ label }) => {
    return <CustomButton type="submit">{label}</CustomButton>;
};

export default SubmitButton;
