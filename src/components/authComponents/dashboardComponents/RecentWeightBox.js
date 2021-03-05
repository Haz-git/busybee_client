import React from 'react';
import dayjs from 'dayjs';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

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
    height: 3.5em;
    width: 3.5em;
`;

const BrowserIncreaseIcon = styled(ChevronsUp)`
    color: green;
    height: 5em;
    width: 5em;
`;

const DecreaseIcon = styled(ChevronsDown)`
    color: red;
    height: 3.5em;
    width: 3.5em;
`;

const BrowserDecreaseIcon = styled(ChevronsDown)`
    color: red;
    height: 5em;
    width: 5em;
`;

const NoneIcon = styled(DotsVerticalRounded)`
    color: rgba(15.7, 18.8, 24.3, 1);
    height: 3.5em;
    width: 3.5em;
`;

const BrowserNoneIcon = styled(DotsVerticalRounded)`
    color: rgba(15.7, 18.8, 24.3, 1);
    height: 5em;
    width: 5em;
`;

const DescLabelImprove = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 0.75em;
    color: green;
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const BrowserDescLabelImprove = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 1.1em;
    color: green;
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const DescLabelFail = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 0.75em;
    color: red;
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const BrowserDescLabelFail = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 1.1em;
    color: red;
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const DescLabelNone = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 0.75em;
    color: rgba(15.7, 18.8, 24.3, 1);
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const BrowserDescLabelNone = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 1.1em;
    color: rgba(15.7, 18.8, 24.3, 1);
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const DescLabelTime = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 0.75em;
    color: ${({ theme }) => theme.generalText};
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const BrowserDescLabelTime = styled.label`
    white-space: nowrap;
    margin: 0.15em 0;
    font-size: 1.1em;
    color: ${({ theme }) => theme.generalText};
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
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
        if (isMobileOnly) {
            if (time === 'NA' || weight === 'NA') {
                return <NoneIcon />;
            } else if (Math.sign(parseInt(weight)) === -1) {
                return <DecreaseIcon />;
            } else if (Math.sign(parseInt(weight)) === 1) {
                return <IncreaseIcon />;
            }
        } else if (isBrowser) {
            if (time === 'NA' || weight === 'NA') {
                return <BrowserNoneIcon />;
            } else if (Math.sign(parseInt(weight)) === -1) {
                return <BrowserDecreaseIcon />;
            } else if (Math.sign(parseInt(weight)) === 1) {
                return <BrowserIncreaseIcon />;
            }
        }
    };

    const renderDesc = () => {
        if (isBrowser) {
            if (time === 'NA' || weight === 'NA') {
                return (
                    <>
                        <BrowserDescLabelNone>
                            {renderWeight()} Lbs
                        </BrowserDescLabelNone>
                        <BrowserDescLabelNone>
                            {convertWeightToKg()} Kgs
                        </BrowserDescLabelNone>
                        <BrowserDescLabelTime>
                            {convertTime()}
                        </BrowserDescLabelTime>
                    </>
                );
            } else if (Math.sign(parseInt(weight)) === -1) {
                return (
                    <>
                        <BrowserDescLabelFail>
                            {renderWeight()} Lbs
                        </BrowserDescLabelFail>
                        <BrowserDescLabelFail>
                            {convertWeightToKg()} Kgs
                        </BrowserDescLabelFail>
                        <BrowserDescLabelTime>
                            {convertTime()}
                        </BrowserDescLabelTime>
                    </>
                );
            } else if (Math.sign(parseInt(weight)) === 1) {
                return (
                    <>
                        <BrowserDescLabelImprove>
                            +{renderWeight()} Lbs
                        </BrowserDescLabelImprove>
                        <BrowserDescLabelImprove>
                            +{convertWeightToKg()} Kgs
                        </BrowserDescLabelImprove>
                        <BrowserDescLabelTime>
                            {convertTime()}
                        </BrowserDescLabelTime>
                    </>
                );
            }
        } else if (isMobileOnly) {
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
                        <DescLabelImprove>
                            +{renderWeight()} Lbs
                        </DescLabelImprove>
                        <DescLabelImprove>
                            +{convertWeightToKg()} Kgs
                        </DescLabelImprove>
                        <DescLabelTime>{convertTime()}</DescLabelTime>
                    </>
                );
            }
        }
    };

    return (
        <>
            <MainContainer>
                <IconContainer>{renderIcon()}</IconContainer>
                <DescContainer>
                    {time !== 'NA' && weight !== 'NA' ? renderDesc() : null}
                </DescContainer>
            </MainContainer>
        </>
    );
};

export default RecentWeightBox;
