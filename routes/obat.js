const express = require('express');
const router = express.Router();

//import express-validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/db');

//function Create data
router.post('/create', [
    //validation
    body('nama_obat').notEmpty(),
    body('kode_kategori').notEmpty(),
    body('kode_satuan').notEmpty(),
    body('harga').notEmpty(),
    body('tanggal_Exp').notEmpty(),
    body('stok').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_obat: req.body.nama_obat,
        kode_kategori: req.body.kode_kategori,
        kode_satuan: req.body.kode_satuan,
        harga: req.body.harga,
        tanggal_Exp: req.body.tanggal_Exp,
        stok: req.body.stok
    }
    connection.query('INSERT INTO obat SET ?', Data, function(err, rows){
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
    connection.query(' SELECT a.nama_obat AS nama_obat, ' + 
    ' b.nama_kategori AS nama_kategori, ' + 
    ' c.nama_satuan AS nama_satuan, ' + 
    ' a.harga AS harga,a.tanggal_Exp AS tanggal_Exp, a.stok AS stok FROM obat a ' + 
    ' JOIN kategori_obat b ON b.kode_kategori = a.kode_kategori ' + 
    ' JOIN satuan_obat c ON c.kode_satuan = a.kode_satuan ' + 
    ' ORDER BY a.kode_obat ASC ', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            });
        } else {
            return res.status(200).json({
            status: true,
            message: 'Data obat',
            data: rows,
            });
        }
    });
});

//function Update data
router.patch('/update/:id', [
    //validation
    body('nama_obat').notEmpty(),
    body('kode_kategori').notEmpty(),
    body('kode_satuan').notEmpty(),
    body('harga').notEmpty(),
    body('tanggal_Exp').notEmpty(),
    body('stok').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_obat: req.body.nama_obat,
        kode_kategori: req.body.kode_kategori,
        kode_satuan: req.body.kode_satuan,
        harga: req.body.harga,
        tanggal_Exp: req.body.tanggal_Exp,
        stok: req.body.stok
    }
    connection.query(`UPDATE obat SET ? WHERE kode_obat = ${id}`, Data, function(err, rows) {
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
    connection.query(`DELETE FROM obat WHERE kode_obat = ${id}`,  function(err, rows) {
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

//function Search data by kode_satuan
router.get('/search/:id', function (req, res){
    let id = req.params.id;
    connection.query(`SELECT a.nama_obat AS nama_obat, 
    b.nama_kategori AS nama_kategori, 
    c.nama_satuan AS nama_satuan, 
    a.harga AS harga, a.tanggal_Exp AS tanggal_Exp, a.stok AS stok 
    FROM obat a 
    JOIN kategori_obat b ON b.kode_kategori = a.kode_kategori 
    JOIN satuan_obat c ON c.kode_satuan = a.kode_satuan 
    WHERE kode_obat = ${id}`, function(err, rows) {
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
                message: 'Data obat',
                data: rows[0]
            })
        }
    })
})

module.exports = router;
