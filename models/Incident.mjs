import { DataTypes } from "sequelize";

import db from '../db/conn.mjs'

// User

import User from "./User.mjs";

const Incident = db.define('Incident', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        require: true,
    },
    riskGroup: {
        type: DataTypes.ENUM('Físico', 'Químico', 'Biológico', 'Ergonômico', 'Acidente-Mecânico'),
        allowNull: false,
        require: true,
    },
    severity: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        require: true,
    },
    urgency: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        require: true,
    },
    tendency: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        require: true,
    },
    riskLevel: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        require: true,
    },
    riskLevelLow: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        require: true,
    },
    riskLevelMedium: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        require: true,
    },
    riskLevelHigh: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        require: true,
    }
})

Incident.belongsTo(User)
User.hasMany(Incident)

export default Incident