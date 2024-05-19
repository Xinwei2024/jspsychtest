document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('https://raw.githubusercontent.com/Xinwei2024/jspsychtest/main/materials.csv', {
        download: true,
        header: true,
        complete: function(results) {
            var timeline = [];

            const instructions = {
                type: 'html-keyboard-response',
                stimulus: '在每个词汇出现后，如果你认为这是一个真实存在的词，请按"F"键；如果认为这是一个虚构的词，请按"J"键。按任意键开始。',
                post_trial_gap: 1000
            };
            timeline.push(instructions);

            const test_procedure = {
                timeline: [{
                    type: 'html-keyboard-response',
                    stimulus: jsPsych.timelineVariable('stimulus'),
                    choices: ['f', 'j'],
                    data: {
                        correct_response: jsPsych.timelineVariable('correct_response')
                    },
                    on_finish: function(data) {
                        data.correct = data.response === data.correct_response;
                    }
                }],
                timeline_variables: results.data,
                randomize_order: true,
                repetitions: 1
            };
            timeline.push(test_procedure);

            jsPsych.init({
                timeline: timeline,
                on_finish: function() {
                    jsPsych.data.displayData();
                }
            });
        }
    });
});
