import React from 'react';

//Styles:
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AddCircle } from '@styled-icons/ionicons-solid/AddCircle';

const AddIcon = styled(AddCircle)`
    height: 1.1em;
    width: 1.1em;
    margin-bottom: 0.1em;
`;

const CustomButton = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.7) 0px 3px 6px',
        backgroundColor: '#27303f',
        textTransform: 'capitalize',
        color: '#fdbc3d',
        fontFamily: 'Nunito, Lato, sans-serif',
        fontWeight: '500',
        fontSize: '1.175em',
        padding: '.5em .8em',
        borderRadius: '.3em',
        '& .MuiButton-startIcon': {
            margin: '0',
            padding: '0',
            marginRight: '.2em',
        },
    },
})(Button);

//Render:

const AddButton = ({ clickFunction }) => {
    return (
        <>
            <CustomButton
                className="MainStats-AddButton"
                startIcon={<AddIcon />}
                onClick={clickFunction}
            >
                New
            </CustomButton>
        </>
    );
};

export default AddButton;
