import React from 'react';
import styled from 'styled-components';

//Styles:
import { SearchCircle } from '@styled-icons/ionicons-solid/SearchCircle';

const WrapperContainer = styled.div`
    position: relative;
    display: flex;
    max-height: 4em;
    width: 100%;
    max-width: 100%;
    align-items: center;
    justify-content: center;
`;

const StyledSearchIcon = styled(SearchCircle)`
    position: absolute;
    left: 0;
    color: rgb(255, 169, 0);
    height: 2.2em;
    width: 2.2em;
`;

const StyledInput = styled.input`
    border: 1px solid grey;
    border-radius: 2em;
    height: 3em;
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 3.1em;
    padding-right: 1em;
    outline: 0;
    background: #27303f;
    color: white;
    font-size: 0.75em;
    font-weight: 100;
    border: 1px solid #fdbc3d;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:focus {
        outline: none;
    }
`;

//Render:

const SearchBar = ({ value, changeFunction }) => {
    return (
        <WrapperContainer>
            <StyledSearchIcon />
            <StyledInput
                placeholder={`${value} Total Stats`}
                onChange={changeFunction}
            />
        </WrapperContainer>
    );
};

export default SearchBar;
