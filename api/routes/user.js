const express = require("express");
const router = express.Router();

const { postSignupData ,postLoginData} = require("../controllers/formData.controller");

router.post("/Signup", postSignupData);
router.post("/Login", postLoginData);


module.exports = router;
