module.exports = (app) => {
  const product = require("../controllers/product.controller.js");
  var router = require("express").Router();

  // create
  router.post("/", product.create);

  // get all data
  router.get("/", product.findAll);

  app.use("/api/product", router);
};
