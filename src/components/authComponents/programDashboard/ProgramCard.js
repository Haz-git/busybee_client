import React from 'react';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';

const ProgramCard = ({
    name,
    desc,
    programId,
    programExercises,
    dateCreated,
}) => {
    return (
        <>
            <h2>{name}</h2>
            <p>{desc}</p>
        </>
    );
};

export default ProgramCard;
