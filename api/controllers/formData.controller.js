const express = require("express");
const User = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// signup request

exports.postSignupData=(req, res, next) => {
  console.log("Password---->", req.body.password);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "password not safe",
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            new_user: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};


// login request
exports.postLoginData=(req, res, next) => {
  const result =  User.findOne({ username: req.body.username })
    .then((result) => {
      console.log(result);
      if (result.length < 1) {
        return res.status(401).json({
          msg: "user not found",
        });
      }

      bcrypt.compare(req.body.password, result.password, (err, result2) => {
        console.log(result2);
        if (!result2) {
          return res.status(401).json({
            msg: "password matching failed",
          });
        }

        if (result2) {
          const token = jwt.sign(
            {
              username: result.username,
              email: result.email,
              phone: result.phone,
            },
            "this is dummy test",
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            username: result.username,
            email: result.email,
            phone: result.phone,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

