import React from 'react';

//Styles:
import styled from 'styled-components';
import { Edit } from '@styled-icons/fa-solid/Edit';

const MainContainer = styled.div`
    position: relative;
    text-align: center;
    padding: 0.7em 0.7em;
    border-radius: 0.5em;
    background: #27303f;
    margin: 0 0.3em;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const EditCorner = styled.div`
    text-align: center;
    position: absolute;
    height: 1.5em;
    width: 1.5em;
    top: 0;
    right: 0;
    border-top-right-radius: 24em;
    border-bottom-left-radius: 100em;
    background: #fdbc3d;
`;

const StyledEditIcon = styled(Edit)`
    height: 0.8em;
    width: 0.8em;
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    color: black;
`;

const MainHeader = styled.h2`
    font-size: 0.75em;
    font-weight: 700;
    color: white;
`;

const ImgContainer = styled.div`
    margin-top: 0.35em;
`;

const ExerciseImg = styled.img`
    height: 4.3em;
    width: 4.3em;
    filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(289deg)
        brightness(103%) contrast(101%);
`;

const DescContainer = styled.div``;

const DescLabel = styled.p`
    font-size: 0.35em;
    color: white;
    font-weight: 900;
`;

//Render:

const UserPowerStatCard = ({ header, img, addAction, existingStat }) => {
    const renderExistingStatLbs = () => {
        if (existingStat !== null && existingStat !== 'NA') {
            return existingStat;
        } else {
            return '-';
        }
    };

    const renderExistingStatKgs = () => {
        if (existingStat !== null && existingStat !== 'NA') {
            //Calculation for lbs to kg.
            return (existingStat / 2.2).toFixed(2);
        } else {
            return '-';
        }
    };
    return (
        <>
            <MainContainer>
                <EditCorner>
                    <StyledEditIcon />
                </EditCorner>
                <MainHeader>{header}</MainHeader>
                <ImgContainer>
                    <ExerciseImg src={img} />
                </ImgContainer>
                <DescContainer>
                    <DescLabel>{renderExistingStatLbs()} lbs</DescLabel>
                    <DescLabel>{renderExistingStatKgs()} kg</DescLabel>
                </DescContainer>
            </MainContainer>
        </>
    );
};

export default UserPowerStatCard;
