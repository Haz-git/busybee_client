import React from 'react';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';
import { ChevronsUp } from '@styled-icons/boxicons-regular/ChevronsUp';
import { ChevronsDown } from '@styled-icons/boxicons-regular/ChevronsDown';
import { DotsVerticalRounded } from '@styled-icons/boxicons-regular/DotsVerticalRounded';

const MainContainer = styled.div`
    padding: 0.5em 0.5em;
    text-align: center;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const IconContainer = styled.div``;

const StyledImg = styled.img``;

const DescContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const IncreaseIcon = styled(ChevronsUp)`
    color: green;
    height: 2.7em;
    width: 2.7em;
`;

const DecreaseIcon = styled(ChevronsDown)`
    color: red;
    height: 2.7em;
    width: 2.7em;
`;

const NoneIcon = styled(DotsVerticalRounded)`
    color: rgba(15.7, 18.8, 24.3, 1);
    height: 2.7em;
    width: 2.7em;
`;

const DescLabelImprove = styled.label`
    margin: 0.15em 0;
    font-size: 0.45em;
    color: green;
    font-weight: 900;
`;

const DescLabelFail = styled.label`
    margin: 0.15em 0;
    font-size: 0.45em;
    color: red;
    font-weight: 900;
`;

const DescLabelNone = styled.label`
    margin: 0.15em 0;
    font-size: 0.45em;
    color: rgba(15.7, 18.8, 24.3, 1);
    font-weight: 900;
`;

const DescLabelTime = styled.label`
    margin: 0.15em 0;
    font-size: 0.45em;
    color: white;
    font-weight: 900;
`;

//Render:

const RecentWeightBox = ({ time, weight }) => {
    const renderWeight = () => {
        if (weight !== 'NA') {
            return weight;
        } else {
            return '-';
        }
    };

    const convertWeightToKg = () => {
        if (weight !== 'NA') {
            return (weight / 2.20462).toFixed(2);
        } else {
            return '-';
        }
    };

    const convertTime = () => {
        if (time !== 'NA') {
            return dayjs(time).format('MM/DD/YYYY');
        } else {
            return null;
        }
    };

    const renderIcon = () => {
        if (time === 'NA' || weight === 'NA') {
            return <NoneIcon />;
        } else if (Math.sign(parseInt(weight)) === -1) {
            return <DecreaseIcon />;
        } else if (Math.sign(parseInt(weight)) === 1) {
            return <IncreaseIcon />;
        }
    };

    const renderDesc = () => {
        if (time === 'NA' || weight === 'NA') {
            return (
                <>
                    <DescLabelNone>{renderWeight()} Lbs</DescLabelNone>
                    <DescLabelNone>{convertWeightToKg()} Kgs</DescLabelNone>
                    <DescLabelTime>{convertTime()}</DescLabelTime>
                </>
            );
        } else if (Math.sign(parseInt(weight)) === -1) {
            return (
                <>
                    <DescLabelFail>{renderWeight()} Lbs</DescLabelFail>
                    <DescLabelFail>{convertWeightToKg()} Kgs</DescLabelFail>
                    <DescLabelTime>{convertTime()}</DescLabelTime>
                </>
            );
        } else if (Math.sign(parseInt(weight)) === 1) {
            return (
                <>
                    <DescLabelImprove>+{renderWeight()} Lbs</DescLabelImprove>
                    <DescLabelImprove>
                        +{convertWeightToKg()} Kgs
                    </DescLabelImprove>
                    <DescLabelTime>{convertTime()}</DescLabelTime>
                </>
            );
        }
    };

    return (
        <>
            <MainContainer>
                <IconContainer>{renderIcon()}</IconContainer>
                <DescContainer>{renderDesc()}</DescContainer>
            </MainContainer>
        </>
    );
};

export default RecentWeightBox;
