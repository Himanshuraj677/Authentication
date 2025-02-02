import { sequelize } from "../config/db.config.js";
import DataTypes from "sequelize";

const TestCase = sequelize.define(
    "test_case",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        problem_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        input: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

export default TestCase;