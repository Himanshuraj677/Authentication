import { sequelize } from "../config/db.config.js";
import { DataTypes } from "sequelize";

const Token = sequelize.define(
  "token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("verify", "reset"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Token;
