module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {    // "category" ini adalah nama untuk tabel nantinya 
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
    return Category;
  };
  