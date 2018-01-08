var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Gestion Interna Labcore V 1.0.0')
})

module.exports = router
