module.exports = async (req, res) => {
    console.log("URL : " + req.body.url + "\tTotal Time : " + req.body.totalTime);
    console.log(req.body.intervals+" "+req.body.userId);
    res.json({ status: "OK" });
}