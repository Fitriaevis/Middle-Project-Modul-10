const express = require('express');
const router = express.Router();

//import express-validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/db');


//function Create data
router.post('/create', [
    //validation
    body('perusahaan_supplier').notEmpty(),
    body('no_telp_supplier').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        perusahaan_supplier: req.body.perusahaan_supplier,
        no_telp_supplier: req.body.no_telp_supplier
    }
    connection.query('INSERT INTO supplier SET ?', Data, function(err, rows){
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
    connection.query('SELECT * FROM supplier ORDER BY id_supplier ASC', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            });
        } else {
            return res.status(200).json({
            status: true,
            message: 'Data Supplier',
            data: rows,
            });
        }
    });
});

//function Update data
router.patch('/update/:id', [
    //validation
    body('perusahaan_supplier').notEmpty(),
    body('no_telp_supplier').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        perusahaan_supplier: req.body.perusahaan_supplier,
        no_telp_supplier: req.body.no_telp_supplier
    }
    connection.query(`UPDATE supplier SET ? WHERE id_supplier = ${id}`, Data, function(err, rows) {
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
    connection.query(`DELETE FROM supplier WHERE id_supplier = ${id}`,  function(err, rows) {
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
    connection.query(`SELECT * FROM supplier WHERE id_supplier = ${id}`, function(err, rows) {
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
                message: 'Data supplieS',
                data: rows[0]
            })
        }
    })
})

module.exports = router;
