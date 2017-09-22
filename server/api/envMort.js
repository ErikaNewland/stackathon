const router = require('express').Router()
const db = require('../db')
const EnvMort = db.models.envMort
const sequelize = require('sequelize')


router.get('/agg/:year', (req, res, next)=>{
   EnvMort.findAll({})


module.exports = router


