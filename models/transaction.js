'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId"
        }

      });
      Transaction.belongsToMany(models.Product, {
        through: { model: "ProductToppings" },
        as: "products",
        foreignKey: {
          name: "transactionId"
        }
      });
      Transaction.belongsToMany(models.Topping, {
        through: { model: "ProductToppings" },
        as: "toppings",
        foreignKey: {
          name: "transactionId"
        }
      });
    }
  };
  Transaction.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    postCode: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};