import { sequelize } from "../config/db.config.js";
import { DataTypes } from "sequelize";

const Problem = sequelize.define(
  "problem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optimized_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lang: {
      type: DataTypes.ENUM("python", "javascript", "java", "cpp", "c"),
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Problem;
