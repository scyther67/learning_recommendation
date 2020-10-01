module.exports = (req, res) => {
  console.log(req.body);
  res.send({ status: "Success" });
};
