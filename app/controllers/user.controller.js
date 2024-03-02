const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = db.users;

// create
exports.create = (req, res) => {
  
  
    // hasing password
  const hashingpassword = bcrypt.hashSync(req.body.password, saltRounds);
  // create
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashingpassword,
    roleId: req.body.roleId,
  };

  // simpan ke database
  User.create(user)
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

  User.findAll({
    where: condition,
    include: ["role"],
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
