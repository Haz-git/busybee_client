import React from 'react';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';
import { MainHeader, MainContainer, StyledDivider } from './UserPowerStats';
import {
    LabelContainer,
    InfoLabel,
    EmptyLabel,
    EmptyLabelContainer,
} from './UserTopPrograms';
import RecentStatCard from './RecentStatCard';
import { MoodNeutralOutline } from '@styled-icons/zondicons/MoodNeutralOutline';

const NeutralIcon = styled(MoodNeutralOutline)`
    height: 2em;
    width: 2em;
    color: white;
    margin-bottom: 0.5em;
`;

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
        } else {
            return (
                <EmptyLabelContainer>
                    <NeutralIcon />
                    <EmptyLabel>
                        Looks like you haven't saved a stat yet.
                    </EmptyLabel>
                </EmptyLabelContainer>
            );
        }
    };

    return (
        <MainContainer className="UserRecentStats-MainContainer">
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
