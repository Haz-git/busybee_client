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
import stat_log_full from '../../../imgs/tutorial_imgs/stat_log_full.png';
import stat_log_record from '../../../imgs/tutorial_imgs/stat_log_record.png';
import top_stats_full from '../../../imgs/tutorial_imgs/top_stats_full.png';
import settings_manager from '../../../imgs/tutorial_imgs/settings_manager.png';

//Render:

const StatLogAndSettingsInfo = () => {
    return (
        <MainTutorialContainer>
            <TutorialHeader>Stat Log</TutorialHeader>
            <TutorialImage
                src={stat_log_full}
                alt="image of stat log with various stats"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    In the <em>Stat Log</em>, record any exercise you've done
                    with various weight, rep, and set ranges.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={stat_log_record}
                alt="image of a stat's record logs"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    A stat's <em>record</em> documents weight, reps, or sets for
                    a particular exercise--helping your progressive overload.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={top_stats_full}
                alt="image of top stats updated after edit"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    When you edit a stat or run multiple programs,
                    <em> Your Top Programs</em> and
                    <em> Your Recently Modified Stats</em> should update in the
                    dashboard.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialHeader>Settings Manager</TutorialHeader>
            <TutorialImage
                src={settings_manager}
                alt="image of settings manager"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    The <em>Settings Manager</em> offer the ability to{' '}
                    <em>Sign Out</em>, <em>Edit User Details</em>,{' '}
                    <em>Edit Email</em>, and <em>Edit Password</em>.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
        </MainTutorialContainer>
    );
};

export default StatLogAndSettingsInfo;
