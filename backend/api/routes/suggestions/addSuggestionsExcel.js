const xlsxFile = require('read-excel-file/node');
const { findByWebsiteId, createWebsiteBySubtopicAndId } = require('../../dbFunctions/websiteInfo');
const { ServerError, Success } = require('../../responses');

module.exports = async(req, res)=>{
    try{
        rows = await xlsxFile('./api/utils/question_images_temp/' + req.body.websitefile);
        rows.forEach(async (row) => {
            let websiteid = row[0];
            let existingwebsite = await findByWebsiteId(websiteid);
            if(existingwebsite == null){
                let subtopic = row[1];
                let url = row[2];
                let domain_name = url.split("/").slice(0,3).join("/");
                let parameterless_url = url.split("?")[0];      
                
                website = await createWebsiteBySubtopicAndId(url, subtopic, websiteid, domain_name, parameterless_url);

            }
        });
        res.json({...Success});
    }
    catch(err){
        res.json({...ServerError});
    }
}