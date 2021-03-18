import React, { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const StyledButtonBase = withStyles({
    root: {
        width: '100%',
        maxWidth: '100%',
    },
})(ButtonBase);

export const CustomButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: none;
    border-radius: 0.4rem;
    /* color: white; */
    /* background: #9c110a; */
    font-family: 'Lato', sans-serif, helvetica;
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: 0.05rem;
    padding: 0.7rem 1rem;
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px;
    cursor: pointer;
    width: 100%;
    max-width: 100%;
    transition: all 0.075s ease;
    overflow: hidden;

    &:focus {
        outline: none;
    }
`;

const IconContainer = styled.div`
    position: absolute;
    height: 2rem;
    width: 2rem;
    max-height: 2rem;
    max-width: 2rem;
    /* left: 1.25rem; */
    top: 50%;
    left: 18%;
    transform: translate(-18%, -50%);
`;

const LabelContainer = styled.div`
    margin-left: 2rem;
`;

const CustomIconButton = ({
    buttonIcon,
    buttonColor,
    buttonHoverColor,
    buttonTextColor,
    buttonLabel,
    onClickFunction,
}) => {
    const [isHover, setIsHover] = useState(false);

    const toggleHover = () => {
        setIsHover(!isHover);
    };

    return (
        <>
            {isHover === false ? (
                <StyledButtonBase onClick={onClickFunction}>
                    <CustomButton
                        onMouseEnter={toggleHover}
                        onMouseLeave={toggleHover}
                        style={{
                            backgroundColor: `${buttonColor}`,
                            color: `${buttonTextColor}`,
                        }}
                    >
                        <IconContainer>{buttonIcon}</IconContainer>
                        <LabelContainer>{buttonLabel}</LabelContainer>
                    </CustomButton>
                </StyledButtonBase>
            ) : (
                <StyledButtonBase onClick={onClickFunction}>
                    <CustomButton
                        onMouseEnter={toggleHover}
                        onMouseLeave={toggleHover}
                        style={{
                            backgroundColor: `${buttonHoverColor}`,
                            color: `${buttonTextColor}`,
                            cursor: 'pointer',
                        }}
                    >
                        <IconContainer>{buttonIcon}</IconContainer>
                        <LabelContainer>{buttonLabel}</LabelContainer>
                    </CustomButton>
                </StyledButtonBase>
            )}
        </>
    );
};

CustomIconButton.defaultProps = {
    buttonColor: 'white',
    buttonTextColor: 'black',
    buttonIcon: null,
};

export default CustomIconButton;
