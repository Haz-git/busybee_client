import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
    background: transparent;
    padding: 0.3em 0.5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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

const OptionButton = styled.button`
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
`;

const SortByOptions = ({
    sortingType,
    newestSortFunction,
    recordsSortFunction,
    alphabetSortFunction,
}) => {
    return (
        <>
            <MainContainer>
                <SortByLabel>Sort By:</SortByLabel>
                <OptionsContainer>
                    <OptionButton onClick={newestSortFunction}>
                        Newest
                    </OptionButton>
                    <OptionButton onClick={recordsSortFunction}>
                        Records
                    </OptionButton>
                    <OptionButton onClick={alphabetSortFunction}>
                        Alphabetical
                    </OptionButton>
                </OptionsContainer>
            </MainContainer>
        </>
    );
};

SortByOptions.defaultProps = {
    sortingType: 'STATS',
};

export default SortByOptions;
