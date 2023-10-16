import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "manhmanh@",
    database: "swd-g6"
});

db.connect(error => {
    if (error) {
        console.error('Lỗi kết nối đến cơ sở dữ liệu: ' + error.message);
    } else {
        console.log('Kết nối thành công đến cơ sở dữ liệu');
    }
});

export default db;
