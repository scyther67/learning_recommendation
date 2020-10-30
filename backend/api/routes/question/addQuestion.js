const { addQuestion } = require("../../dbFunctions/question");
const { ServerError, Success } = require("../../responses");
const xlsxFile = require('read-excel-file/node');

module.exports = async (req, res) => {
    try {
        var question_data = {};
        xlsxFile('./api/utils/question_images_temp/' + req.body.excelfile).then((rows) => {
            rows.forEach(async (cols) => {
                question_data['description'] = cols[0];
                question_data['alternatives'] = []
                for (var i = 0; i < 4; i++) {
                    question_data['alternatives'].push(
                        {
                            'text': cols[i + 1],
                        }
                    )
                }
                question_data['isCorrect'] = cols[5];
                question_data['subtopic'] = cols[6];
                question_data['questionid'] = cols[7];
                await addQuestion(
                    question_data['description'],
                    question_data['alternatives'],
                    question_data['subtopic'],
                    question_data['isCorrect'],
                    question_data['questionid']
                );
            });
        })
        return res.json({ ...Success });
    }
    catch (err) {
        console.log(err);
        return res.json({ ...ServerError });
    }
}