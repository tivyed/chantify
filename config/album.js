const conexion = require('./database')

const express = require('express');
const cors = require('cors');

const route = express.Router()


route.get('/',(req, res) => { 
    let sql = "SELECT * FROM album"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});


route.get('/:code_album',(req, res) => { 
    let sql = "SELECT * FROM album where ID_album = ?"
    conexion.query(sql,[req.params.code_album], (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});

route.post('/create_album', (req, res) => {   
    let code_album = 0
    let name_album = req.body.name_album;
    let tipe = req.body.tipe;
    let ID_artist = req.body.ID_artist;              

    let sql = 'call palbum (?, ?, ?, ?)';
    conexion.query(sql, [code_album, name_album, tipe, ID_artist], function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
            console.log('Positiva, se añadio');
        }
    });
});

route.put('/:code_album', (req,res) => {

    let code_album = req.params.code_album;
    let name_album = req.body.name_album;
    let realse = req.body.realse;
    let tipe = req.body.tipe;    
    
    let sql = 'Update album set name_album=?, realse=?, tipe=? where ID_album = ?';
    conexion.query(sql,[name_album, realse, tipe, code_album],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
            console.log('Positiva, se modifico');
        }
    });
});

route.delete('/:code_album', (req, res)=>{

    let code_album = req.params.code_album;    

    let sql = 'Delete from album where ID_album = ?';
    conexion.query(sql, [code_album], (err, resul) => {
        if (err) {
            console.log('Error al Eliminar', sql);            
        } else {
            res.json(resul)
            console.log('Se elimino');
        }
    });
});

module.exports = route;