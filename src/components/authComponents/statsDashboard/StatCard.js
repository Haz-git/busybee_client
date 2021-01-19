import React from 'react';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Trash } from '@styled-icons/boxicons-regular/Trash';
import { Pencil } from '@styled-icons/evil/Pencil';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';

const WrapperContainer = styled.div`
    margin: 1em 0.65em;
`;

const MainContainer = styled.div`
    border-radius: 0.4em;
    padding: 0.5em 0.4em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.StatCardBG};
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
`;

const NameContainer = styled.div`
    text-align: left;
`;

const NameHeader = styled.h2`
    color: ${({ theme }) => theme.StatCardHeader};
    font-size: 1.2em;
    font-weight: 400;
    text-shadow: 2px 2px 2px #14181f;
`;

const DateContainer = styled.div`
    text-align: left;
`;

const DateText = styled.h2`
    font-family: 'Lato', 'Nunito';
    color: ${({ theme }) => theme.StatCardTime};
    font-size: 0.3em;
    text-align: left;
    font-weight: 400;
`;

const ButtonContainer = styled.div``;

const TrashIcon = styled(Trash)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.TrashIcon};
`;

const EditIcon = styled(Pencil)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.EditIcon};
`;

const CaretIcon = styled(ChevronDown)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.CaretIcon};
`;

const StyledButton = styled.button`
    margin: 0 0.2em;
    border-radius: 50%;
    border: none;
    padding: 0.5em 0.5em;
    background: ${({ theme }) => theme.ButtonBG};
    color: ${({ theme }) => theme.StatCardHeader};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:focus {
        outline: none;
    }
`;

//Render:

const StatCard = ({ name, date }) => {
    const reformatDate = () => {
        if (date !== undefined && date !== null) {
            return dayjs(date).format('MM/DD/YYYY');
        } else {
            return null;
        }
    };

    return (
        <>
            <WrapperContainer>
                <MainContainer>
                    <NameContainer>
                        <NameHeader>{name}</NameHeader>
                        <DateContainer>
                            <DateText>{reformatDate()}</DateText>
                        </DateContainer>
                    </NameContainer>
                    <ButtonContainer>
                        <StyledButton>
                            <TrashIcon />
                        </StyledButton>
                        <StyledButton>
                            <EditIcon />
                        </StyledButton>
                        <StyledButton>
                            <CaretIcon />
                        </StyledButton>
                    </ButtonContainer>
                </MainContainer>
            </WrapperContainer>
        </>
    );
};

export default StatCard;
