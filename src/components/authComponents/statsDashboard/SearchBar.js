import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

//Styles:
import { Search } from '@styled-icons/material-rounded/Search';
import { Clear } from '@styled-icons/material-rounded/Clear';

const FadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const WrapperContainer = styled.div`
    position: relative;
    display: flex;
    max-height: 4em;
    width: 100%;
    max-width: 100%;
    align-items: center;
    justify-content: center;
`;

const StyledSearchIcon = styled(Search)`
    position: absolute;
    left: 0.4em;
    color: rgb(255, 169, 0);
    height: 2rem;
    width: 2rem;
`;

const StyledClearIcon = styled(Clear)`
    /* color: #1a222f; */
    color: white;
    height: 1.8rem;
    width: 1.8rem;
`;

const ClearButton = styled.button`
    position: absolute;
    outline: none;
    background: #1a222f;
    height: 100%;
    border: none;
    border-top-right-radius: 0.4em;
    border-bottom-right-radius: 0.4em;
    right: 0;
    cursor: pointer;
    animation: ${FadeIn} 0.3s ease-in-out;

    &:focus {
        outline: none;
    }
`;

const StyledInput = styled.input`
    border: 1px solid grey;
    border-radius: 0.4em;
    height: 3em;
    width: 100%;
    max-width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2.4em;
    padding-right: 2em;
    outline: 0;
    background: #27303f;
    color: white;
    font-size: 1.1em;
    font-weight: 300;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 6px;

    &:focus {
        outline: none;
    }
`;

//Render:

const SearchBar = ({
    inputValue,
    value,
    changeFunction,
    placeholder,
    renderClearButton,
    clearButtonFunction,
}) => {
    return (
        <WrapperContainer>
            <StyledSearchIcon />
            <StyledInput
                placeholder={`${
                    value !== undefined ? value : '?'
                } ${placeholder}`}
                onChange={changeFunction}
                value={inputValue}
            />
            {renderClearButton && (
                <ClearButton onClick={clearButtonFunction}>
                    <StyledClearIcon />
                </ClearButton>
            )}
        </WrapperContainer>
    );
};

export default SearchBar;
