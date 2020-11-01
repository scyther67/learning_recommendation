const Student_Response = require("../models/studentresponse");

module.exports = {
    createStudentResponse: async (student_id, response) => {
        let studentresponse = new Student_Response({
            student_id,
            response
        });
        return studentresponse.save();
    },
    findStudentResponseById: async (_id) => {
        return Student_Response.findById(_id);
    },
    // getLatestResponse: async (student_id, response) => {
    //     return Student_Response.find({ student_id }).sort({ datetime: -1 })[0];    
    // },
    appendQuestionResponse: async (student_response, response_to_append) => {
        student_response.response.push(response_to_append);
        return Student_Response.findByIdAndUpdate({ _id: student_response._id },
            { response: student_response.response }, { new: true });
    }
}