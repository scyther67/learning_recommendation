const { addQuestion } = require("../../dbFunctions/question");
const { ServerError, Success } = require("../../responses");
const xlsxFile = require('read-excel-file/node');

module.exports = async (req, res) => {
    try {
        var question_data = {};
        xlsxFile('./Data.xlsx').then((rows) => {
            rows.forEach((col)=>{
                        question_data['question'] = cols[0];
                        question_data['alternatives'] = []
                        for(var i = 0; i < 4; i++){
                            question_data['alternatives'].push(
                                {
                                    'text': cols[i+1],
                                    'isCorrect': false
                                }
                            )
                        }
                        question_data['alternatives'][cols[4]]['isCorrect'] = true;
                        question_data['subtopic'] =  col[5];
                        question_data['image'] = col[6]
            })
        })

        // const newquestion = await addQuestion(req.body.description, req.body.alternatives, req.body.subtopic, req.body.correct);
        // console.log(newquestion);
        // res.json({ ...Success });
    }
    catch (err) {
        console.log(err);
        res.json({ ...ServerError });
    }
}