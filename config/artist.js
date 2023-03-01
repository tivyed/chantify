const conexion = require('./database')

const express = require('express');
const cors = require('cors');

const route = express.Router()


route.get('/',(req, res) => { 
    let sql = "SELECT * FROM artist"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});


route.get('/:code_artist',(req, res) => { 
    let sql = "SELECT * FROM artist where ID_artist = ?"

    conexion.query(sql,[req.params.code_artist], (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});


route.post('/registro_artista', (req, res) => {    
    sql = 'Select IFNULL(MAX(ID_artist), 0)+1 valor from artist;'
    let codigo = 0
    conexion.query(sql, async (err, dato) =>{
        if (err) {
            console.log("Error");
            return -1;
        } else {
            console.log('Codigo maximo');
            codigo=dato[0].valor            

            let data = {
                ID_artist: codigo,
                nickname:req.body.nickname,
                ID_user:req.body.ID_user
            }
            
            let sql = 'Insert into artist set ?';
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


route.put('/:code_artist', (req,res) => {

    let code_artist = req.params.code_artist;

      let nickname = req.body.nickname          

    let sql = 'Update artist set nickname=? where ID_artist = ?';

    conexion.query(sql,[nickname, code_artist],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
            console.log('Positiva, se modifico');
        }
    });
});

route.delete('/:code_artist', (req, res)=>{

    let code_artist = req.params.code_artist;    

    let sql = 'Delete from artist where ID_artist = ?';
    conexion.query(sql, [code_artist], (err, resul) => {
        if (err) {
            console.log('Error al Eliminar', sql);            
        } else {
            res.json(resul)
            console.log('Se elimino');
        }
    });
});

module.exports = route;