// import express from 'express';
// import cors from 'cors'
// import mysql from 'mysql'

// const app = express();

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "ab123",
//     database: "swd-g6"
// })

// app.listen(8081, () => {
//     console.log("listening")
// })


// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM user";
//     db.query(sql, (err, result) => {
//         if (err) return res.json({ Message: "Error inside server" });
//         return res.json(result);
//     })
// })

// app.use(express.json());
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://phone-auth-8bbe2.firebaseapp.com'],
//     methods: ['POST', 'GET'],
//     credentials: true
// }
// ));
