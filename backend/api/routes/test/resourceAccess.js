module.exports = async (req, res) => {
    console.log("URL : "+req.body.url+"\tTotal Time : "+req.body.totalTime);
    res.json({ status: "OK" });
}