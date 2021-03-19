import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

//Components:
import UserPowerStatCard from './UserPowerStatCard';

//Imgs:
import benchpress from '../../../imgs/benchpress256.png';
import squat from '../../../imgs/squat256.png';
import deadlift from '../../../imgs/deadlift256.png';

//Actions:
import {
    addNewBench,
    addNewSquat,
    addNewDeadlift,
    getUserLiftingData,
} from '../../../redux/userPowerLifts/powerLiftActions';

//Styles:
import styled from 'styled-components';
import { LineChart } from '@styled-icons/boxicons-regular/LineChart';
import { Edit } from '@styled-icons/fa-solid/Edit';

export const MainContainer = styled.div`
    margin-top: 1em;
    text-align: left;
`;

export const MainHeader = styled.h2`
    font-family: 'Lato';
    font-size: 1.1em;
    color: ${({ theme }) => theme.UserPowerHeaderColor};
    font-weight: 900;
    text-shadow: ${({ theme }) => theme.textShadow};
    @media screen and (min-width: 414px) {
        font-size: 1.3em;
    }
`;

export const StyledDivider = styled.hr`
    border: 0;
    margin-top: 0.5em;
    margin-bottom: 0.2em;
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.AddMoreLabelC};
    box-shadow: rgba(0, 0, 0, 1) 0px 1px 2px;
`;

const StatCardContainer = styled.div`
    margin-top: 1em;
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template-columns: 33% 33% 33%;
    column-gap: 0.3em;
`;

const BrowserStatCardContainer = styled.div`
    margin-top: 1em;
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template-columns: 33% 33% 33%;
    column-gap: 0.3em;
`;

const EmptyMainLiftContainer = styled.div`
    text-align: center;
`;

const EditExampleIcon = styled(Edit)`
    height: 1.3em;
    width: 1.3em;
    color: white;
    vertical-align: bottom;
    margin-left: 0.3em;
`;

const LineChartIcon = styled(LineChart)`
    height: 2.2em;
    width: 2.2em;
    color: white;
    margin-bottom: 0.5em;
`;

const EmptyLabel = styled.h3`
    font-size: 0.8em;
    font-weight: 700;
    font-family: 'Lato';
    letter-spacing: 1px;
    color: white;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

//Render:

const UserPowerStats = ({
    getUserLiftingData,
    existingStats,
    addNewBench,
    addNewSquat,
    addNewDeadlift,
}) => {
    useEffect(() => {
        getUserLiftingData();
    }, []);

    const checkUserPowerLiftData = () => {
        let results = [];

        if (
            existingStats.powerLiftStats !== undefined &&
            existingStats.powerLiftStats !== null
        ) {
            if (
                existingStats.powerLiftStats.userExistingPLStats.bench === 'NA'
            ) {
                results.push(1);
            }

            if (
                existingStats.powerLiftStats.userExistingPLStats.squat === 'NA'
            ) {
                results.push(1);
            }

            if (
                existingStats.powerLiftStats.userExistingPLStats.deadlift ===
                'NA'
            ) {
                results.push(1);
            }
        }

        return results.length;
    };

    const renderUserPowerStats = () => {
        if (isMobileOnly) {
            return (
                <MobileOnlyView>
                    <MainContainer>
                        <MainHeader>Your Main Lifts</MainHeader>
                        <StyledDivider />
                        <StatCardContainer>
                            <UserPowerStatCard
                                header="Deadlift"
                                img={deadlift}
                                addAction={addNewDeadlift}
                                existingStat={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .userExistingPLStats.deadlift
                                        : null
                                }
                                recentStatWeightChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentDeadliftWeightChange
                                              .weightChange
                                        : null
                                }
                                recentStatTimeChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentDeadliftWeightChange
                                              .updateTime
                                        : null
                                }
                            />
                            <UserPowerStatCard
                                header="Squat"
                                img={squat}
                                addAction={addNewSquat}
                                existingStat={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .userExistingPLStats.squat
                                        : null
                                }
                                recentStatWeightChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentSquatWeightChange
                                              .weightChange
                                        : null
                                }
                                recentStatTimeChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentSquatWeightChange
                                              .updateTime
                                        : null
                                }
                            />
                            <UserPowerStatCard
                                header="Bench"
                                img={benchpress}
                                addAction={addNewBench}
                                existingStat={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .userExistingPLStats.bench
                                        : null
                                }
                                recentStatWeightChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentBenchWeightChange
                                              .weightChange
                                        : null
                                }
                                recentStatTimeChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentBenchWeightChange
                                              .updateTime
                                        : null
                                }
                            />
                        </StatCardContainer>
                        {checkUserPowerLiftData() !== 3 ? null : (
                            <EmptyMainLiftContainer>
                                <LineChartIcon />
                                <EmptyLabel>
                                    Keep track of your main lifts with 'edit'
                                    {<EditExampleIcon />}
                                </EmptyLabel>
                            </EmptyMainLiftContainer>
                        )}
                    </MainContainer>
                </MobileOnlyView>
            );
        } else if (isBrowser) {
            return (
                <BrowserView>
                    <MainContainer>
                        <MainHeader>Your Main Lifts</MainHeader>
                        <StyledDivider />
                        <BrowserStatCardContainer>
                            <UserPowerStatCard
                                header="Deadlift"
                                img={deadlift}
                                addAction={addNewDeadlift}
                                existingStat={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .userExistingPLStats.deadlift
                                        : null
                                }
                                recentStatWeightChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentDeadliftWeightChange
                                              .weightChange
                                        : null
                                }
                                recentStatTimeChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentDeadliftWeightChange
                                              .updateTime
                                        : null
                                }
                            />
                            <UserPowerStatCard
                                header="Squat"
                                img={squat}
                                addAction={addNewSquat}
                                existingStat={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .userExistingPLStats.squat
                                        : null
                                }
                                recentStatWeightChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentSquatWeightChange
                                              .weightChange
                                        : null
                                }
                                recentStatTimeChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentSquatWeightChange
                                              .updateTime
                                        : null
                                }
                            />
                            <UserPowerStatCard
                                header="Bench"
                                img={benchpress}
                                addAction={addNewBench}
                                existingStat={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .userExistingPLStats.bench
                                        : null
                                }
                                recentStatWeightChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentBenchWeightChange
                                              .weightChange
                                        : null
                                }
                                recentStatTimeChange={
                                    existingStats.powerLiftStats !==
                                        undefined &&
                                    existingStats.powerLiftStats !== null
                                        ? existingStats.powerLiftStats
                                              .recentBenchWeightChange
                                              .updateTime
                                        : null
                                }
                            />
                        </BrowserStatCardContainer>
                        {checkUserPowerLiftData() !== 3 ? null : (
                            <EmptyMainLiftContainer>
                                <LineChartIcon />
                                <EmptyLabel>
                                    Keep track of your main lifts with 'edit'
                                    {<EditExampleIcon />}
                                </EmptyLabel>
                            </EmptyMainLiftContainer>
                        )}
                    </MainContainer>
                </BrowserView>
            );
        }
    };

    return <>{renderUserPowerStats()}</>;
};

const mapStateToProps = (state) => {
    return {
        existingStats: state.powerStats,
    };
};

export default connect(mapStateToProps, {
    getUserLiftingData,
    addNewBench,
    addNewSquat,
    addNewDeadlift,
})(UserPowerStats);
