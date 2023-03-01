const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2217723da',
    database: 'chantify'
})
conexion.connect(function(err) {
    if(err){
        throw err;
    }else{
        console.log('Conexion exitosa !!!');
    }
});


module.exports = conexion