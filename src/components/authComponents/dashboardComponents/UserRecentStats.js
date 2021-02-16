import React from 'react';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';
import { MainHeader, MainContainer, StyledDivider } from './UserPowerStats';
import { LabelContainer, InfoLabel } from './UserTopPrograms';
import RecentStatCard from './RecentStatCard';

const UserRecentStats = ({ userStats }) => {
    //Sort date from most recent --> latest;

    let sortedArray = userStats.sort((a, b) => {
        return a.dateUpdated > b.dateUpdated ? -1 : 1;
    });

    const renderRecentStatCards = () => {
        if (sortedArray !== undefined && sortedArray.length !== 0) {
            return sortedArray
                .slice(0, 5)
                .map((stat) => (
                    <RecentStatCard
                        key={uuid()}
                        name={stat.exerciseName}
                        date={dayjs(stat.dateUpdated).format('MM/DD/YYYY')}
                    />
                ));
        }
    };

    return (
        <MainContainer>
            <MainHeader>Your Recently Modified Stats</MainHeader>
            <StyledDivider />
            <LabelContainer>
                <InfoLabel>Stat Name</InfoLabel>
                <InfoLabel>Date Modified</InfoLabel>
            </LabelContainer>
            <div>{renderRecentStatCards()}</div>
        </MainContainer>
    );
};

export default UserRecentStats;
