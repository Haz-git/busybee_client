import React from 'react';
import styled from 'styled-components';
import { SortAlt } from '@styled-icons/boxicons-solid/SortAlt';

const SortIcon = styled(SortAlt)`
    height: 1rem;
    width: 1rem;
    color: white;
`;

const MainContainer = styled.div`
    background: transparent;
    padding: 0.3em 0.5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const RecordMainContainer = styled.div`
    background: transparent;
    display: block;
    text-align: center;
    /* margin: 0 auto; */
`;

const SortByLabel = styled.h1`
    font-family: 'Lato';
    font-size: 0.9rem;
    font-weight: 700;
    color: white;
    text-align: left;
    white-space: nowrap;
`;

const OptionsContainer = styled.div`
    margin-left: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const RecordOptionsContainer = styled.div`
    margin: 0 auto;
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    /* column-gap: 0.5em;
    row-gap: 0.5em; */
`;

const StatOptionButton = styled.button`
    margin: 0 0.1rem;
    background: #1a222f;
    color: white;
    border: none;
    border-radius: 0.4em;
    padding: 0.5em 0.5em;
    font-family: 'Lato';
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 1px 3px;

    &:focus {
        outline: none;
    }
`;

const RecordOptionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a222f;
    color: white;
    border: none;
    margin: 0.5em 0.6em;
    border-radius: 0.4em;
    padding: 0.5em 0.5em;
    font-family: 'Lato';
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 1px 3px;

    &:focus {
        outline: none;
    }
`;

const SortByOptions = ({
    sortingType,
    newestSortFunction,
    recordsSortFunction,
    alphabetSortFunction,
}) => {
    const generateSortByFromSortingType = () => {
        if (sortingType === 'STATS') {
            return (
                <>
                    <MainContainer>
                        <SortByLabel>Sort By:</SortByLabel>
                        <OptionsContainer>
                            <StatOptionButton onClick={newestSortFunction}>
                                Newest
                            </StatOptionButton>
                            <StatOptionButton onClick={recordsSortFunction}>
                                # Records
                            </StatOptionButton>
                            <StatOptionButton onClick={alphabetSortFunction}>
                                Alphabetical
                            </StatOptionButton>
                        </OptionsContainer>
                    </MainContainer>
                </>
            );
        } else if (sortingType === 'RECORDS') {
            return (
                <>
                    <RecordMainContainer>
                        <SortByLabel style={{ textAlign: 'center' }}>
                            Sort Records
                        </SortByLabel>
                        <RecordOptionsContainer>
                            <RecordOptionButton onClick={newestSortFunction}>
                                <SortIcon />
                                Weight
                            </RecordOptionButton>
                            <RecordOptionButton onClick={recordsSortFunction}>
                                <SortIcon />
                                Reps
                            </RecordOptionButton>
                            <RecordOptionButton onClick={alphabetSortFunction}>
                                <SortIcon />
                                Sets
                            </RecordOptionButton>
                            <RecordOptionButton onClick={alphabetSortFunction}>
                                <SortIcon />
                                Recently Edited
                            </RecordOptionButton>
                        </RecordOptionsContainer>
                    </RecordMainContainer>
                </>
            );
        }
    };

    return <>{generateSortByFromSortingType()}</>;
};

SortByOptions.defaultProps = {
    sortingType: 'STATS',
};

export default SortByOptions;
