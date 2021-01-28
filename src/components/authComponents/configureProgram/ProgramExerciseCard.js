import React from 'react';

//styles:
import styled from 'styled-components';
import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline';
import { Remove } from '@styled-icons/material/Remove';

//Icons:

const EditIcon = styled(EditOutline)`
    height: 1.5em;
    width: 1.6em;
`;

const DelIcon = styled(Remove)`
    height: 1.5em;
    width: 1.5em;
`;

const MainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    background: #27303f;
    border-radius: 0.4em;
    margin: 1.2em 0;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
`;

const HeaderBlock = styled.div`
    background: #081120;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
    padding: 0.6em 1em;
`;

const HeaderText = styled.h2`
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: #fcac49;
    font-size: 1.2em;
`;

const InfoBlock = styled.div`
    padding: 0.3em 0.8em;
`;

const InfoText = styled.h3`
    padding: 0.2em 0.2em;
    color: white;
    font-size: 1.025em;
    /* white-space: nowrap; */
`;

const DetailContainer = styled.div`
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    justify-content: space-between;
`;

const DeleteButton = styled.button`
    border: none;
    border-radius: 50%;
    padding: 0.2em 0.2em;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    background: #90130c;
    font-size: 1em;
    margin: 0.3em 0.3em;
    color: white;
    cursor: pointer;

    &:focus {
        outline: none;
        background: #cb484f;
    }

    &:hover {
        outline: none;
        background: #cb484f;
    }
`;

const EditButton = styled.button`
    border: none;
    border-radius: 50%;
    padding: 0.2em 0.2em;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    background: #3041ad;
    font-size: 1em;
    margin: 0.3em 0.3em;
    color: white;
    cursor: pointer;

    &:focus {
        outline: none;
        background: #346d98;
    }

    &:hover {
        outline: none;
        background: #346d98;
    }
`;

const ButtonContainer = styled.div`
    left: 0;
    top: 0;
    position: absolute;
    display: flex;
`;

//Render:

const ProgramExerciseCard = ({ number, name, id, sets, reps, weight }) => {
    return (
        <>
            <MainContainer>
                <HeaderBlock>
                    <HeaderText>{name}</HeaderText>
                </HeaderBlock>
                <InfoBlock>
                    <DetailContainer>
                        <InfoText>Sets: {sets}</InfoText>
                        <InfoText>Reps: {reps}</InfoText>
                        <InfoText>Weight: {weight}</InfoText>
                    </DetailContainer>
                </InfoBlock>
                <ButtonContainer>
                    <EditButton>
                        <EditIcon />
                    </EditButton>
                    <DeleteButton>
                        <DelIcon />
                    </DeleteButton>
                </ButtonContainer>
            </MainContainer>
        </>
    );
};

export default ProgramExerciseCard;
