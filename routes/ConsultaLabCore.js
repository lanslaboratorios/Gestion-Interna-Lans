var express = require('express')
var router = express.Router()

/* GET consulta. */
express.Router('/ConsultaLabCore').get(function (req, res, next) {
  res.send('Regresara el JSON')
})
module.exports = router