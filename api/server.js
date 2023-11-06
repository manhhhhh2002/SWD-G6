// Import modules the ES module way
import express from 'express';
import { settingRouter, userRouter } from './src/router/IndexRouter.js';
import cors from 'cors'
import cookieParser from "cookie-parser";
import db from './src/dao/BaseDao.js';
import classRouter from './src/router/ClassRouter.js';

// Create an instance of the express app
const app = express();

// Use express.json() middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://phone-auth-8bbe2.firebaseapp.com'],
    methods: ['POST', 'GET', 'PUT'],
    credentials: true
}
));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to HOME REST API !!!')
})

// Set up session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
// }));

// Use the imported routes
app.use('/users', userRouter)
app.use('/settings', settingRouter)
app.use('/class', classRouter)

app.get('/home', (req, res) => {
    const sql = "SELECT * FROM project";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})


app.post('/create', (req, res) => {
    const sql = "INSERT INTO project (project_id, project_name, description, member, status) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.des,
        req.body.mem,
        req.body.status,
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE project SET project_name = ?, description = ?, member = ?, status = ? WHERE project_id = ?";

    const values = [
        req.body.name,
        req.body.des,
        req.body.mem,
        req.body.status,
    ];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(data);
    });
});

app.delete('/project/:id', (req, res) => {
    const sql = "DELETE FROM project WHERE project_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(data);
    });
});

// Start the server
app.listen(8800, () => {
    console.log("Connected!");
});
