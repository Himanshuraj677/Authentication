import { sequelize} from "../config/db.config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "teacher", "moderator", "admin"),
      defaultValue: "student",
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
