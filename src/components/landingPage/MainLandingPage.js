import React from 'react';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from 'react-device-detect';
import { Link } from 'react-router-dom';
import gymjot_logo from '../../imgs/gymjot_transparent.png';

//Styles:
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const MobMainContainer = styled.div`
    background: ${(props) => props.theme.background};
    height: 100vh;
`;

const MobWrapper = styled.div`
    position: relative;
    top: 45%;
    transform: translateY(-50%);
    text-align: center;
`;

const MobHeaderContainer = styled.div``;

const LogoContainer = styled.div``;

export const StyledMainLogo = styled.img`
    object-fit: cover;
    height: 10em;
    width: 10em;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const MobHeader = styled.h1`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 4em;
    font-weight: 100;
    color: ${(props) => props.theme.mainMobHeaderColor};
`;

const MobLabel = styled.label`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1.2em;
    font-weight: 100;
    color: ${(props) => props.theme.mainMobHeaderColor};
`;

const MobButtonContainer = styled.div`
    padding: 1em 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MobButtonDiv = styled.div`
    margin: 3em 0.8em;
`;

//Render:
const MainLandingPage = () => {
    const renderMainPage = () => {
        if (isMobile) {
            return (
                <MobileView>
                    <MobMainContainer>
                        <MobWrapper>
                            <MobHeaderContainer>
                                <LogoContainer>
                                    <StyledMainLogo
                                        src={gymjot_logo}
                                        alt="gymjot logo"
                                    />
                                </LogoContainer>
                                <MobHeader>GymJot</MobHeader>
                                <MobLabel>Train more efficiently.</MobLabel>
                            </MobHeaderContainer>
                            <MobButtonContainer>
                                <MobButtonDiv>
                                    <Link to="/login">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </MobButtonDiv>
                                <MobButtonDiv>
                                    <Link to="/signup">
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            color="primary"
                                        >
                                            Join Us
                                        </Button>
                                    </Link>
                                </MobButtonDiv>
                            </MobButtonContainer>
                        </MobWrapper>
                    </MobMainContainer>
                </MobileView>
            );
        } else {
            return (
                <h1>
                    This is browser view, it has not yet been implemented.
                    Sorry!
                </h1>
            );
        }
    };

    return <>{renderMainPage()}</>;
};

export default MainLandingPage;
