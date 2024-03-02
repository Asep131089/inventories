const db = require("../models");
const Category = db.categories;
// const Op = db.Seequalize.op;



// create
exports.create = (req, res) => {
    // get req
    const category = {
      name: req.body.name,
      description: req.body.description,
    };
  
    // simpan ke database
    Category.create(category)
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

  Category.findAll({
    where: condition,
    include :[
    "products"                    // ini di dapat dari  as : "products" ini nanti dituliskan di include pada controlerr begitupun juga untuk category semua didapat dari index.js ya
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

// mencari data per id
exports.findOne = (req,res)=>{
  const id = req.params.id

  Category.findByPk(id,{include:["products"]}).then(data=>{
    if (data){
      res.send(data);
    }else {
      res.status(404).send(
        {message : "data categori tdk ditemukan"}
      );
    }

  }).catch(err=>{
    res.status(500).send(
        {message : "error Server"}
    );
  })
}

// update
exports.update = (req, res) => {
  const id = req.params.id;
  Category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " category sukses di update",
        });
      } else {
        res.send({
          message: "tidak bisa diupdate",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "server error",
      });
    });
}

// delete

exports.delete = (req,res)=>{       // req = request dan res = respon 
  const id = req.params.id
  Category.destroy({
      where: {id : id}
  }).then(num=> {
      if (num == 1){
          res.send({
              message : "berhasil delete"
          })
      }else {
          res.send({
              message : "tidak berhasil delete"
          })
      }
  }). catch(err =>{
      res.status(500).send({
          message : "tidak berhasil delete. server error"
      })
  })

}