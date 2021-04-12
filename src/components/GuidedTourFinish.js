import React from 'react';
import styled from 'styled-components';
import { ExitToApp } from '@styled-icons/material-twotone/ExitToApp';

const IconContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.7) 0px 2px 3px;
    background: #293241;
    border-radius: 50%;
    padding: 0.7em 0.7em;

    &:focus {
        outline: none;
    }
`;

const ExitIcon = styled(ExitToApp)`
    color: #fdbc3d;
    height: 1.8rem;
    width: 1.8rem;
    &:focus {
        outline: none;
    }
`;

const GuidedTourFinish = () => {
    return (
        <IconContainer>
            <ExitIcon />
        </IconContainer>
    );
};

export default GuidedTourFinish;
