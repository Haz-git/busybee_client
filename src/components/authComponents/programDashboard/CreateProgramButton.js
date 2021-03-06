import React from 'react';

//Styles:
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Create } from '@styled-icons/ionicons-solid/Create';

const CreateIcon = styled(Create)`
    height: 1.25em;
    width: 1.25em;
    margin-bottom: 0.3em;
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
        padding: '.5em 1em',
        borderRadius: '.3em',
        '& .MuiButton-startIcon': {
            margin: '0',
            padding: '0',
        },
    },
})(Button);

//Render:
const CreateProgramButton = ({ clickFunction }) => {
    return (
        <>
            <CustomButton
                className="MainPrograms-CreateProgramButton"
                startIcon={<CreateIcon />}
                onClick={clickFunction}
            >
                Create
            </CustomButton>
        </>
    );
};

export default CreateProgramButton;
