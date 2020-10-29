const xlsxFile = require('read-excel-file/node');
 
module.exports = async (req, res) => {
    var question_data = {};
    xlsxFile('./Data.xlsx').then((rows) => {
    // rows.forEach((col)=>{
    //             question_data['question'] = cols[0];
    //             question_data['answer'] = 
    // })
    })
}