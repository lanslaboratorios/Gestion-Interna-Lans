var express = require('express')
var router = express.Router()
var sql = require('mssql')
// Conexión a la BD LABCORE
const DbConnectionString = 'mssql://labcore:labcore@192.168.1.10:1433/LabCore'

// error Handler
sql.on('error', err => {
  console.dir(err)
  sql.close()
})

/* GET consulta. */
router.get('/', function (req, res, next) {
  sql.connect(DbConnectionString).then(pool => {
    return pool.request()
      .query(req.query.consulta)
  }).then(result => {
    sql.close()
    res.json(result.recordset)
  }).catch(err => {
    console.dir(err)
    sql.close()
  })
})

module.exports = router
