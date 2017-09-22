const Sequelize = require('sequelize');
const db = require('../db');

const EnvMort = db.define('envMort', {
    country: {
        type: Sequelize.STRING
    }, 
    gho: {
        type: Sequelize.STRING
    }, 
    year: {
        type: Sequelize.STRING
    },
    value: {
        type: Sequelize.REAL
    }
}, {})




