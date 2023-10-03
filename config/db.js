let mysql = require('mysql');

//membuat varaiable connection
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mid_project'
});

//membuat kondisi untuk melihat apakah koneksi benar
connection.connect(function (error){
    if(!!error){
        console.log('koneksi gagal');
    }else{
        console.log('koneksi berhasil...');
    }
})

//export modul connection
module.exports = connection;