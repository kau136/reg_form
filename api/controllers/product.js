const express = require("express");
const Product = require("../model/product");
const mongoose = require("mongoose");
const product = require("../model/product");
const checkAuth=require('../middleware/check-auth');

// get request

exports.getProduct=("/",checkAuth, (req, res, next) => {
  Product.find()
    .then((result) => {
      res.status(200).json({
        Product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

exports.getProductId=async (req, res, next) => {
  const _id = req.params.id;
  await Product.findById(_id).then((result) => {
    res.status(200).json({
      Product: result,
    });
  });
}

// post request

exports.postProduct=("/", (req, res, next) => {
  console.log(req.body);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    code: req.body.code,
    title: req.body.title,
    mrp: req.body.mrp,
    discountPercent: req.body.discountPercent,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// delete request
exports.deleteProduct= async (req, res, next) => {
    try{
        const result = await Product.deleteOne({ _id: req.params.id })
        return res.status(200).json({
            message: "product deleted",
            result: result,
        });

    } catch (err) {
      req.status(500).json({
        error: err,
      });
    }
}

// put request
exports.updateProduct= async (req, res, next) => {
  console.log(req.params.id);
  try{

      const reuslt = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            code: req.body.code,
            title: req.body.title,
            mrp: req.body.mrp,
            discountPercent: req.body.discountPercent,
          },
        }
      )
          return res.status(200).json({
            message: console.log("product updated successfully"),
            updated_product: result,
          });
        }
    catch(err) {
      res.status(500).json({
        error: err,
      });
    }
}


