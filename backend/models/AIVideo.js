import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class AIVideo extends Model { }

AIVideo.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lessonId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        celebrity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        learningStyle: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "normal",
        },
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transcript: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        transcriptName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jobId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "AIVideo",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["courseId", "lessonId", "celebrity", "learningStyle"],
            },
        ],
    }
);

export default AIVideo;
