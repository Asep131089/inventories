const db = require("../models");
const Product = db.products;


// create
exports.create = (req, res) => {
    
    // create 
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      categoryId:req.body.categoryId,
    };
  
    // simpan ke database
    Product.create(product)
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
  
    Product.findAll({
      where: condition,
      include :[
      "category"
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