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
import program_add from '../../../imgs/tutorial_imgs/program_add.png';
import program_configure_buttons from '../../../imgs/tutorial_imgs/program_configure_buttons.png';
import add_exercise_options from '../../../imgs/tutorial_imgs/add_exercise_options.png';
import pyramid_step_one from '../../../imgs/tutorial_imgs/pyramid_step_one.png';
import pyramid_step_two from '../../../imgs/tutorial_imgs/pyramid_step_two.png';
import exercise_card_added from '../../../imgs/tutorial_imgs/exercise_card_added.png';
import add_rest_between_sets from '../../../imgs/tutorial_imgs/add_rest_between_sets.png';
import full_program_example from '../../../imgs/tutorial_imgs/full_program_example.png';
import format_none from '../../../imgs/tutorial_imgs/format_none.png';
import format_full from '../../../imgs/tutorial_imgs/format_full.png';
import program_details_update from '../../../imgs/tutorial_imgs/program_details_update.png';
import run_program from '../../../imgs/tutorial_imgs/run_program.png';

//Render:

const ProgramInfo = () => {
    return (
        <MainTutorialContainer>
            <TutorialHeader>Program Manager</TutorialHeader>
            <TutorialImage src={program_add} alt="image of program added" />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    You can create your own custom training programs in the
                    <em> Program Manager</em>.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={program_configure_buttons}
                alt="image of program configuration"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    If you press <em>configure</em>, GymJot takes you into your
                    empty program with several options to spruce it up.
                </TutorialInfoText>
                <TutorialInfoText>
                    <em>+ Rest</em> adds a rest period into your program. Let's
                    check out what <em> + Exercise </em> does.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={add_exercise_options}
                alt="image of options to add exercise"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    Select from four different options to add an exercise to
                    your program.
                </TutorialInfoText>
                <br />
                <TutorialInfoText>
                    1. <em>Add a New Exercise</em> - Creates an exercise not
                    previously recorded.
                </TutorialInfoText>
                <TutorialInfoText>
                    2. <em>Select from Stat Log</em> - Retrieve an exercise from
                    your Stats Log.
                </TutorialInfoText>
                <TutorialInfoText>
                    3. <em>Use a Main Lift</em> - Select from Bench, Squat, or
                    Deadlift.
                </TutorialInfoText>
                <TutorialInfoText>
                    4. <em>Add a Pyramid Set</em> - Configure a variety of sets
                    with differing weight and rep ranges.
                </TutorialInfoText>
                <TutorialInfoText>
                    Let's take a look into Pyramid Set configuration in more
                    detail...
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={pyramid_step_one}
                alt="image of first step of pyramid set configuration"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    Pyramid set configuration are in two steps. First, let
                    GymJot know what exercise you're doing and number of sets.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={pyramid_step_two}
                alt="image of second step of pyramid set configuration"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    Second, configure the rep and weight range for each
                    individual set.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={exercise_card_added}
                alt="image of pyramid set added"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    When your exercise(s) has been added, it should appear in
                    your configuration.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={add_rest_between_sets}
                alt="image adding a rest between sets"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    Be sure to press the 'ZZ' button to add a rest period
                    between each set of your exercise. Upon saving, a tag should
                    appear near the bottom.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={full_program_example}
                alt="image of an example of a full program"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    Here's what a full program might look like!
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={format_none}
                alt="image of an unformatted program"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    After adding all the exercises and rest periods you desire,
                    make sure to format your program using the{' '}
                    <em>Blueprint</em> button.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={format_full}
                alt="image of a formatted program"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    In your blueprint page, let us know the order your want each
                    exercise or rest period to run.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage
                src={program_details_update}
                alt="image of an updated program card"
            />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    After saving, press the back button to return to the program
                    manager page. Notice that GymJot has provided an estimated
                    workout time for your program!
                </TutorialInfoText>
            </TutorialDescriptionContainer>
            <TutorialImage src={run_program} alt="image of program running" />
            <TutorialDescriptionContainer>
                <TutorialInfoText>
                    Finally, to run your program--press the green play button.
                </TutorialInfoText>
                <TutorialInfoText>
                    Cycle through your exercises upon completion using the
                    provided arrow buttons.
                </TutorialInfoText>
            </TutorialDescriptionContainer>
        </MainTutorialContainer>
    );
};

export default ProgramInfo;
