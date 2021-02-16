import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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

export const MainContainer = styled.div`
    margin-top: 1em;
    text-align: left;
`;

export const MainHeader = styled.h2`
    font-family: 'Lato';
    font-size: 1.1em;
    color: ${({ theme }) => theme.UserPowerHeaderColor};
    font-weight: 900;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 8px;
`;

export const StyledDivider = styled.hr`
    border: 0;
    margin: 0.5em 0;
    height: 3px;
    width: 100%;
    background: ${({ theme }) => theme.AddMoreLabelC};
    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;
`;

const StatCardContainer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: center;
    align-content: center;
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

    return (
        <>
            <MainContainer>
                <MainHeader>Your Main Lifts</MainHeader>
                <StyledDivider />
                <StatCardContainer>
                    <UserPowerStatCard
                        header="Deadlift"
                        img={deadlift}
                        addAction={addNewDeadlift}
                        existingStat={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .userExistingPLStats.deadlift
                                : null
                        }
                        recentStatWeightChange={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .recentDeadliftWeightChange.weightChange
                                : null
                        }
                        recentStatTimeChange={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .recentDeadliftWeightChange.updateTime
                                : null
                        }
                    />
                    <UserPowerStatCard
                        header="Squat"
                        img={squat}
                        addAction={addNewSquat}
                        existingStat={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .userExistingPLStats.squat
                                : null
                        }
                        recentStatWeightChange={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .recentSquatWeightChange.weightChange
                                : null
                        }
                        recentStatTimeChange={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .recentSquatWeightChange.updateTime
                                : null
                        }
                    />
                    <UserPowerStatCard
                        header="Bench"
                        img={benchpress}
                        addAction={addNewBench}
                        existingStat={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .userExistingPLStats.bench
                                : null
                        }
                        recentStatWeightChange={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .recentBenchWeightChange.weightChange
                                : null
                        }
                        recentStatTimeChange={
                            existingStats.powerLiftStats !== undefined &&
                            existingStats.powerLiftStats !== null
                                ? existingStats.powerLiftStats
                                      .recentBenchWeightChange.updateTime
                                : null
                        }
                    />
                </StatCardContainer>
            </MainContainer>
        </>
    );
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
