const express = require('express') // membuat variable baru dengan nama express
const app = express() // membuat variable baru dengan nama app yang isinya express
const port = 5000 // membuat variable dengan nama port yang isinya 5000

// app.get('/', (req,res)=>{
//     res.send('Halo Ini Middle Project-Modul 10')
// })

const bodyPs = require('body-parser'); // import body-parser
app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());


//import route posts admin
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);

//import route posts pelanggan
const pelangganRouter = require('./routes/pelanggan');
app.use('/api/pelanggan', pelangganRouter);

//import route posts supplier
const supplierRouter = require('./routes/supplier');
app.use('/api/supplier', supplierRouter);

//import route posts obat
const obatRouter = require('./routes/obat');
app.use('/api/obat', obatRouter);

//import route posts Kategori Obat
const kategoriObatRouter = require('./routes/kategori_obat');
app.use('/api/kategori_obat', kategoriObatRouter);

//import route posts Satuan Obat
const satuanObatRouter = require('./routes/satuan_obat');
app.use('/api/satuan_obat', satuanObatRouter);

//import route posts Apotek
const apotekRouter = require('./routes/apotek');
app.use('/api/apotek', apotekRouter);



//listen express.js kedalam port 
app.listen(port, () => {
    console.log(`aplikasi berjalan di http://localhost:${port}`)
})