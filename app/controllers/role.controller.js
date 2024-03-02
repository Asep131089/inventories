const db = require("../models");
const Role = db.roles;
// const Op = db.Seequalize.op;



// create
exports.create = (req, res) => {
    // get req
    const role = {
      name: req.body.name,
      description: req.body.description,
    };
  
    // simpan ke database
    Role.create(role)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "terjadi error",
        });
      });
  };

  // read all
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Role.findAll({
    where: condition,
    include :[
    "users"                    // ini di dapat dari  as : "products" ini nanti dituliskan di include pada controlerr begitupun juga untuk category semua didapat dari index.js ya
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "ada error",
      });
    });
};
