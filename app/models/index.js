const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Require model
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

// membuat relasi One to many Category dengan Product
db.categories.hasMany(db.products, { as: "products" }); // as : "products" ini nanti dituliskan di include pada controlerr
db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category", // as : "category" ini nanti dituliskan di include pada controlerr
});

// membuat relasi One to many role dengan Product
db.roles.hasMany(db.users, { as: "users" });
db.users.belongsTo(db.roles, {
  foreignKey: "roleId",
  as: "role",
});

module.exports = db;
