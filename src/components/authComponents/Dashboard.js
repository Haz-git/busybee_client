import React, { useEffect, useState } from 'react';

//Redux Actions:
import { connect } from 'react-redux';

//Components:
import UserGreeting from './dashboardComponents/UserGreeting';

//Styles:
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const LoaderContainer = styled.div`
    position: relative;
    top: 60vh;
    -webkit-transform: translateY(-20vh);
    -moz-transform: translateY(-20vh);
    -ms-transform: translateY(-20vh);
    -o-transform: translateY(-20vh);
    transform: translateY(-20vh);
    text-align: center;
    color: ${({ theme }) => theme.DashSpinnerColor};
`;

const LoaderCharacters = styled.h1`
    margin-top: 0.5em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1em;
    font-weight: 900;
    color: ${({ theme }) => theme.DashSpinnerCharacter};
`;

const MainContainer = styled.div`
    text-align: center;
    padding: 1em 1em;
`;

//Render:

const Dashboard = ({ user }) => {
    const renderLoadingIfNoUserDetails = () => {
        if (user !== undefined && user !== null) {
            const {
                firstName,
                lastName,
                userName,
                email,
                _id,
            } = user.userLogIn.user;
            return (
                <MainContainer>
                    <UserGreeting
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        userID={_id}
                        userName={userName}
                    />
                </MainContainer>
            );
        } else {
            return (
                <LoaderContainer>
                    <CircularProgress
                        size={70}
                        color="inherit"
                        thickness={2.5}
                    />
                    <LoaderCharacters>Grabbing your stuff...</LoaderCharacters>
                </LoaderContainer>
            );
        }
    };

    return <>{renderLoadingIfNoUserDetails()}</>;
};

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(Dashboard);
