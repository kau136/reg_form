const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
      console.log('ffffffffffff',req.headers.authorization.split(" ")[1])
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token.spilt(" ")[1]);
    const verify = jwt.verify(token, "this is dummy test");
    console.log('vvvvvvv',verify);
    if (verify.email == "hkkaushik136@gmail.com") {
      next();
    } else {
      return res.status(401).json({
        msg: "not verify",
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "invalid token",
    });
  }
};
