import React from 'react';
import styled from 'styled-components';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { SnackbarContent } from '@material-ui/core';

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.6em .8em',
        '& .MuiAlert-icon': {
            fontSize: '2.2em',
            ['@media (max-width: 320px)']: {
                fontSize: '1.7em',
            },
        },
        '& .MuiAlert-message': {
            fontSize: '1.4em',
            whiteSpace: 'nowrap',
            ['@media (max-width: 320px)']: {
                fontSize: '1.1em',
            },
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
    filledSuccess: {
        background: '#1A222F',
    },
    filledError: {
        background: '#1A222F',
    },
    filledInfo: {
        background: '#1A222F',
    },
}))(MuiAlert);

//Slide transition function for MUI:

function slideTransition(props) {
    return (
        <Slide
            {...props}
            direction="down"
            timeout={{
                enter: 400,
                exit: 400,
            }}
        />
    );
}

const GlobalSnackbar = ({
    openFunction,
    closeFunction,
    autoHideDuration,
    anchorOriginVertical,
    anchorOriginHorizontal,
    alertSeverity,
    alertMessage,
}) => {
    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
    };
    return (
        <Snackbar
            open={openFunction}
            autoHideDuration={autoHideDuration}
            onClose={closeFunction}
            anchorOrigin={{
                vertical: `${anchorOriginVertical}`,
                horizontal: `${anchorOriginHorizontal}`,
            }}
            TransitionComponent={slideTransition}
        >
            <SnackbarContent
                style={{
                    boxShadow: 'none',
                    background: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                message={
                    <Alert severity={`${alertSeverity}`}>{alertMessage}</Alert>
                }
            />
        </Snackbar>
    );
};

export default GlobalSnackbar;
