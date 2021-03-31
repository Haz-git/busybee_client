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
    display: grid;
    grid-template-columns: 45% 55%;
    align-items: center;
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

const RecordSelectorInput = styled.select`
    margin: 0em 0em;
    border: none;
    width: 100%;
    border-radius: 0.4em;
    background-color: #10122a;
    color: white;
    padding: 0.5em 1em;
    font-family: 'Lato', sans-serif, helvetica;
    font-weight: 700;
    font-size: 0.9rem;
    -webkit-box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 320px) {
        font-size: 0.9rem;
    }
`;

const SortByOptions = ({
    sortingType,
    newestSortFunction,
    recordsSortFunction,
    alphabetSortFunction,
    recordSortHandler,
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
                            Sort Records By:
                        </SortByLabel>
                        <RecordSelectorInput
                            name="recordsort"
                            onChange={recordSortHandler}
                        >
                            <option value="DEFAULT">Default</option>
                            <option value="HIGHWEIGHT">Highest Weight</option>
                            <option value="LOWWEIGHT">Lowest Weight</option>
                            <option value="HIGHSET">Highest Sets</option>
                            <option value="LOWSET">Lowest Sets</option>
                            <option value="HIGHREP">Highest Reps</option>
                            <option value="LOWREP">Lowest Reps</option>
                            <option value="LASTMODIFIED">Last Modified</option>
                        </RecordSelectorInput>
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
