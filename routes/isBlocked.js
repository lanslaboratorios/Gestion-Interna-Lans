var express = require('express')
var router = express.Router()
var sql = require('mssql')
// Conexión a la BD LABCORE
const DbConnectionString = 'mssql://labcore:labcore@104.130.11.7:1433/LabCore'
// error Handler
sql.on('error', err => {
  console.dir(err)
  sql.close()
})

/* GET consulta. */
router.get('/', function (req, res) {
  sql.connect(DbConnectionString).then(pool => {
    return pool.request()
      .query(`select  Estatus_del_Socio from DatosSocios_Portales_View where Numero_de_Socio = ${req.query.id}`)
      
  }).then(result => {
    sql.close()
    // res.json(result);
     if( result.rowsAffected == 0){
     res.send('-1');}
     else if(result.rowsAffected >1){
        res.send('-2'); 
     }else if( result.recordset[0].Estatus_del_Socio == 'Activo'){
        res.send('1');
    }else{
        res.send('0');
    }
  }).catch(err => {
    console.dir(err)
    sql.close()
  })
})

router.post('/', function (req, res) {
    sql.connect(DbConnectionString).then(pool => {
      return pool.request()
        .query(`select  Estatus_del_Socio from DatosSocios_Portales_View where Numero_de_Socio = ${req.body.id}`)
        
    }).then(result => {
      sql.close() 
        if( result.rowsAffected == 0){
        res.send('-1');} //no existe
        else if(result.rowsAffected >1){
           res.send('-2'); // duplicado
        }else if( result.recordset[0].Estatus_del_Socio == 'Activo'){
           res.send('1'); //permiso
       }else{
           res.send('0'); //permiso'
       }
    }).catch(err => {
      console.dir(err)
      sql.close()
    })
  })

module.exports = router
