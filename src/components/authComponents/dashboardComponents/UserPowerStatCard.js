import React from 'react';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    text-align: center;
    padding: 0.7em 0.7em;
    border-radius: 0.5em;
    background: #27303f;
    margin: 0 0.3em;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

const UserPowerStatCard = ({ header, img, addAction }) => {
    return (
        <>
            <MainContainer>
                <MainHeader>{header}</MainHeader>
                <ImgContainer>
                    <ExerciseImg src={img} />
                </ImgContainer>
                <DescContainer>
                    <DescLabel>100 lbs</DescLabel>
                    <DescLabel>50 kg</DescLabel>
                </DescContainer>
            </MainContainer>
        </>
    );
};

export default UserPowerStatCard;
