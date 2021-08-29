'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topping.belongsToMany(models.Transaction, {
        through: {model: "ProductToppings"},
        as: "transactions",
        foreignKey: {
          name: "toppingId"
        }
      })

      Topping.belongsToMany(models.Product, {
        through: {model: "ProductToppings"},
        as: "products",
        foreignKey: {
          name: "toppingId"
        }
      })
    }
  };
  Topping.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topping',
  });
  return Topping;
};