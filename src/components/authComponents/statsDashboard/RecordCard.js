import React from 'react';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    padding: 0.5em 0.5em;
    margin: 0.5em 0;
    background: navy;
`;

const DetailsContainer = styled.div``;

//Render:

const RecordCard = ({ sets, reps, weight, dateModified }) => {
    const convertWeightToKg = () => {
        return (parseInt(weight) / 2.2).toFixed(2);
    };

    const convertISOToDate = () => {
        return dayjs(dateModified).format('MM/DD/YYYY');
    };

    return (
        <>
            <MainContainer>
                Sets: {sets}, Reps: {reps}, {weight} Lbs, {convertWeightToKg()}{' '}
                Kgs, Date Modified: {convertISOToDate()}
            </MainContainer>
        </>
    );
};

export default RecordCard;
