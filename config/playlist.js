const conexion = require('./database')

const express = require('express');
const cors = require('cors');

const route = express.Router()


route.get('/',(req, res) => { 
    let sql = "SELECT * FROM playlist"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});


route.get('/:code_playlist',(req, res) => { 
    let sql = "SELECT * FROM playlist where ID_playlist = ?"

    conexion.query(sql,[req.params.code_playlist], (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});


route.post('/create_playlist', (req, res) => {    
    sql = 'Select IFNULL(MAX(ID_playlist), 0)+1 valor from playlist;'
    let codigo = 0
    conexion.query(sql, async (err, dato) =>{
        if (err) {
            console.log("Error");
            return -1;
        } else {            
            codigo=dato[0].valor            
            console.log('Codigo maximo', codigo);
            let data = {
                ID_playlist: codigo,
                name_playlist:req.body.name_playlist,
                ID_user:req.body.ID_user
            }
            
            let sql = 'Insert into playlist set ?';
            conexion.query(sql,data, function(err,resul){
                if(err){
                    console.log(err.message);
                    res.json({ mensaje:'Error no se adiciono'});
                    throw res.json(err.message)
                }else{
                    res.json(resul);
                    console.log('Positiva, se adiciono');
                }
            });
        }
    });
});


route.put('/:code_playlist', (req,res) => {

    let code_playlist = req.params.code_playlist;

      let name_playlist = req.body.name_playlist          

    let sql = 'Update playlist set name_playlist=? where ID_playlist = ?';

    conexion.query(sql,[name_playlist, code_playlist],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
            console.log('Positiva, se modifico');
        }
    });
});

route.delete('/:code_playlist', (req, res)=>{  

    let sql = 'Delete from detail_playlist';
    conexion.query(sql, [code_playlist], (err, resul) => {
        if (err) {
            console.log('Error al Eliminar la playlist', sql);            
        } else {
            res.json(resul)
            console.log('Se elimino');
            
            let code_playlist = req.params.code_playlist;    

            let sql = 'Delete from playlist where ID_playlist = ?';
            conexion.query(sql, [code_playlist], (err, resul) => {
                if (err) {
                    console.log('Error al Eliminar', sql);            
                } else {
                    res.json(resul)
                    console.log('Se elimino');
                }
            });
        }
    });    
});

module.exports = route;