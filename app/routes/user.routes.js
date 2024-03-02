module.exports = (app) => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
  
    // create
    router.post("/", user.create);
  
    // get all data
    router.get("/", user.findAll);
  
    app.use("/api/user", router);
  };
  