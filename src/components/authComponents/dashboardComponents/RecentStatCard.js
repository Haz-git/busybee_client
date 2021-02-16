import React from 'react';

//Styles:
import styled, { keyframes } from 'styled-components';
import {
    fadeIn,
    MainContainer,
    NameLabel,
    CountLabel,
} from './TopProgramCards';

const RecentStatCard = ({ name, date }) => {
    return (
        <MainContainer>
            <NameLabel>{name}</NameLabel>
            <CountLabel>{date}</CountLabel>
        </MainContainer>
    );
};

export default RecentStatCard;
