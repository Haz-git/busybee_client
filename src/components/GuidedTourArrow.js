import React from 'react';
import styled from 'styled-components';

import { NavigateNext } from '@styled-icons/material-rounded/NavigateNext';

const IconContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.7) 0px 2px 3px;
    background: #293241;
    border-radius: 50%;

    &:focus {
        outline: none;
    }
`;

const NextIcon = styled(NavigateNext)`
    color: #fdbc3d;
    height: 2.5rem;
    width: 2.5rem;
    &:focus {
        outline: none;
    }
`;

const GuidedTourArrow = () => {
    return (
        <IconContainer>
            <NextIcon />
        </IconContainer>
    );
};

export default GuidedTourArrow;
