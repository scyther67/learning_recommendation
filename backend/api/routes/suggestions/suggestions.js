const {findUnusedResources} = require('../../dbFunctions/suggestions');

module.exports = async (req, res) => {

    try{
        user_id = req.body.userId;
        subtopic = req.body.subtopic;

        let suggestions = await findUnusedResources(user_id, subtopic);

        return res.json({ suggestions });
    }
    
    catch (err) {
        console.log(err);
    }

}