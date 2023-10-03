const express = require('express');
const router = express.Router();

//import express-validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/db');


//function Create data
router.post('/create', [
    //validation
    body('nama_admin').notEmpty(),
    body('no_telp_admin').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_admin: req.body.nama_admin,
        no_telp_admin: req.body.no_telp_admin
    }
    connection.query('INSERT INTO admin SET ?', Data, function(err, rows){
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Create Data Success...',
                data: rows[0]
            })
        }
    })
})

// Function Read all data
router.get('/', function (req, res) {
    connection.query('SELECT * FROM admin ORDER BY id_admin ASC', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            });
        } else {
            return res.status(200).json({
            status: true,
            message: 'Data Admin',
            data: rows,
            });
        }
    });
});

//function Update data
router.patch('/update/:id', [
    //validation
    body('nama_admin').notEmpty(),
    body('no_telp_admin').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_admin: req.body.nama_admin,
        no_telp_admin: req.body.no_telp_admin
    }
    connection.query(`UPDATE admin SET ? WHERE id_admin = ${id}`, Data, function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Success..!',
                data: rows[0]
            })
        }
    })
})

//function Delete data
router.delete('/delete/:id', function(req, res){
    let id = req.params.id;
    connection.query(`DELETE FROM admin WHERE id_admin = ${id}`,  function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Success..!',
            })
        }
    })
})

//function Search data by id_dpi
router.get('/search/:id', function (req, res){
    let id = req.params.id;
    connection.query(`SELECT * FROM admin WHERE id_admin = ${id}`, function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data Admin',
                data: rows[0]
            })
        }
    })
})

module.exports = router;
