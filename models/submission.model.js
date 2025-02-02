import { sequelize } from "../config/db.config.js";
import { DataTypes } from "sequelize";

const SUBMISSION_STATUSES = {
    ACCEPTED: "AC", // Accepted
    WRONG_ANSWER: "WA", // Wrong Answer
    RUNTIME_ERROR: "RE", // Runtime Error
    TIME_LIMIT_EXCEEDED: "TLE", // Time Limit Exceeded
    COMPILATION_ERROR: "CE", // Compilation Error
};

const Submission = sequelize.define(
    "submission",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        problem_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lang: {
            type: DataTypes.ENUM("cpp", "java", "python", "javascript", "c"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(SUBMISSION_STATUSES)),
            allowNull: false,
        },
        time: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        memory: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

export default Submission;
