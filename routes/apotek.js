const express = require('express');
const router = express.Router();

//import express-validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/db');

//function Create data
router.post('/create', [
    //validation
    body('tanggal_laporan').notEmpty(),
    body('id_admin').notEmpty(),
    body('id_supplier').notEmpty(),
    body('kode_obat').notEmpty(),
    body('jumlah_pelanggan').notEmpty(),
    body('stok_akhir').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        tanggal_laporan: req.body.tanggal_laporan,
        id_admin: req.body.id_admin,
        id_supplier: req.body.id_supplier,
        kode_obat: req.body.kode_obat,
        jumlah_pelanggan: req.body.jumlah_pelanggan,
        stok_akhir: req.body.stok_akhir
    }
    connection.query('INSERT INTO apotek SET ?', Data, function(err, rows){
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
    connection.query(' SELECT a.kode_laporan AS kode_laporan, a.tanggal_laporan AS tanggal_laporan, b.nama_admin AS nama_admin, c.perusahaan_supplier AS perusahaan_supplier, d.nama_obat AS nama_obat, a.jumlah_pelanggan AS jumlah_pelanggan, a.stok_akhir AS stok_akhir FROM apotek a JOIN admin b ON b.id_admin = a.id_admin JOIN supplier c ON c.id_supplier = a.id_supplier JOIN obat d ON d.kode_obat = a.kode_obat ORDER BY a.kode_laporan ASC ', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            });
        } else {
            return res.status(200).json({
            status: true,
            message: 'Data apotek',
            data: rows,
            });
        }
    });
});

//function Update data
router.patch('/update/:id', [
    //validation
    body('tanggal_laporan').notEmpty(),
    body('id_admin').notEmpty(),
    body('id_supplier').notEmpty(),
    body('kode_obat').notEmpty(),
    body('jumlah_pelanggan').notEmpty(),
    body('stok_akhir').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        tanggal_laporan: req.body.tanggal_laporan,
        id_admin: req.body.id_admin,
        id_supplier: req.body.id_supplier,
        kode_obat: req.body.kode_obat,
        jumlah_pelanggan: req.body.jumlah_pelanggan,
        stok_akhir: req.body.stok_akhir
    }
    connection.query(`UPDATE apotek SET ? WHERE kode_laporan = ${id}`, Data, function(err, rows) {
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
    connection.query(`DELETE FROM apotek WHERE kode_laporan = ${id}`,  function(err, rows) {
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

//function Search data by id_supplier
router.get('/search/:id', function (req, res){
    let id = req.params.id;
    connection.query(` SELECT a.kode_laporan AS kode_laporan, a.tanggal_laporan AS tanggal_laporan, 
    b.nama_admin AS nama_admin, 
    c.perusahaan_supplier AS perusahaan_supplier, 
    d.nama_obat AS nama_obat, 
    a.jumlah_pelanggan AS jumlah_pelanggan, 
    a.stok_akhir AS stok_akhir FROM apotek a 
    JOIN admin b ON b.id_admin = a.id_admin 
    JOIN supplier c ON c.id_supplier = a.id_supplier 
    JOIN obat d ON d.kode_obat = a.kode_obat 
    WHERE kode_laporan = ${id}`, function(err, rows) {
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
                message: 'Data apotek',
                data: rows[0]
            })
        }
    })
})

module.exports = router;
