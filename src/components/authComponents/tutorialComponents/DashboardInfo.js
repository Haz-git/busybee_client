import React from 'react';

//Styles:
import styled from 'styled-components';
import {
    MainTutorialContainer,
    TutorialHeader,
    TutorialImage,
    TutorialDescriptionContainer,
    TutorialInfoText,
} from './TutorialMain';
import main_stats_none from '../../../imgs/tutorial_imgs/main_stats_none.png';
import main_stats_filled from '../../../imgs/tutorial_imgs/main_stats_filled.png';
import top_stats_none from '../../../imgs/tutorial_imgs/top_stats_none.png';

//Render:

const DashboardInfo = () => {
    return (
        <MainTutorialContainer>
            <TutorialHeader>The Dashboard</TutorialHeader>
            <TutorialImage
                src={main_stats_none}
                alt="dashboard main stats empty image"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    <em>Your Main Lifts</em> shows the status of your big three
                    lifts: Deadlift, Squat, and Bench.
                </TutorialInfoText>
                <TutorialInfoText>
                    As a new user, you will not have any weights recorded yet.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={main_stats_filled}
                alt="dashboard filled main stats image"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    As you update your main lifts, GymJot will let you know the
                    amount of weight you've improved or dropped.
                </TutorialInfoText>
                <TutorialInfoText>
                    We'll also let you know when you've updated the weight.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={top_stats_none}
                alt="dashboard empty top stats image"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    GymJot also records some of your top programs and recently
                    modified stats.
                </TutorialInfoText>
                <TutorialInfoText>
                    As a new user, you won't have any...yet. We'll come back to
                    this!
                </TutorialInfoText>
            </TutorialDescriptionContainer>
        </MainTutorialContainer>
    );
};

export default DashboardInfo;
