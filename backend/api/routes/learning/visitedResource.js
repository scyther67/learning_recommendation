const {
  findTraceLearning,
  createTraceLearning,
  appendTraceLearning,
  updateUserDomainDict,
} = require("../../dbFunctions/learningresource");
const {
  findExistingResource,
  createWebsite,
} = require("../../dbFunctions/websiteInfo");
const { Success, ServerError } = require("../../responses");
module.exports = async (req, res) => {
  try {
    url = req.body.url;
    let website = await findExistingResource(url);
    let { startTimeStamp, endTimeStamp } = req.body;
    console.log("Visited:", url);
    let totalTime =
      new Date(endTimeStamp).getTime() - new Date(startTimeStamp).getTime();

    domain_name = url.split("/").slice(0, 3).join("/");
    // console.log("URL", url);
    // console.log("TOTAL_TIME", totalTime);
    // console.log("DN", domain_name);

    if (!website) {
      parameterless_url = url.split("?")[0];

      website = await createWebsite(url, domain_name, parameterless_url);
    }

    let tracelearning = await findTraceLearning(req.body.userId, website); //pass url too

    if (!tracelearning) {
      tracelearning = await createTraceLearning(req.body.userId, website);
    }

    let singleresource = {
      totalTime: req.body.totalTime,
      startTimeStamp: req.body.startTimeStamp,
      endTimeStamp: req.body.endTimeStamp,
    };

    let finallearning = await appendTraceLearning(
      tracelearning,
      singleresource
    );

    let user_domain_dict_updated = await updateUserDomainDict(
      req.body.userId,
      domain_name,
      totalTime
    );

    res.json({ ...Success });
  } catch (err) {
    console.log(err);
    res.json({ ...ServerError });
  }
};
