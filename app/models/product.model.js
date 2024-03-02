module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define("product",{    // "product" ini adalah nama untuk tabel nantinya 
        name:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        price:{
            type: Sequelize.INTEGER
        },
        stock:{
            type: Sequelize.INTEGER
        }
    
    });
    return Product;
};