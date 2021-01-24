import React from 'react';

//Styles:
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AddCircle } from '@styled-icons/ionicons-solid/AddCircle';

const AddIcon = styled(AddCircle)`
    height: 1.1em;
    width: 1.1em;
`;

const CustomButton = withStyles({
    root: {
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        backgroundColor: '#27303f',
        textTransform: 'capitalize',
        color: '#fdbc3d',
        fontFamily: 'Nunito, Lato, sans-serif',
        fontWeight: '400',
        fontSize: '1.2em',
        padding: '.5em .8em',
        borderRadius: '.5em',
        marginLeft: '.4em',
    },
})(Button);

//Render:

const AddButton = ({ clickFunction }) => {
    return (
        <>
            <CustomButton startIcon={<AddIcon />} onClick={clickFunction}>
                Add
            </CustomButton>
        </>
    );
};

export default AddButton;
