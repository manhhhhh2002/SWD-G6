// Import modules the ES module way
import express from 'express';
import session from 'express-session';
import { userRouter } from './routes/index.js';
import cors from 'cors'
import cookieParser from "cookie-parser";
import mysql from 'mysql'

// Create an instance of the express app
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    databaseL: "crud"
})

app.listen(8081, () => {
    console.log("listening")
})

// Use express.json() middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true
}
));

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

// app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Welcome to HOME REST API !!!')
// })

// Set up session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
// }));

// Use the imported routes
app.use('/users', userRouter)

// Start the server
app.listen(8800, () => {
    console.log("Connected!");
});
