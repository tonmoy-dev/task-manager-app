const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
const dotenv = require("dotenv");

// env config
dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


// mysql connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// connect to database
db.connect((error) => error ?
    (console.error(`getting error: ${error}`)) :
    console.log('connected to mysql'))

// get route
app.get("/", (req, res) => {
    res.send("welcome to server...");
})

app.get("/tasks", (req, res) => {
    const query = 'SELECT * FROM tasks';

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send("Error on fetching tasks");
            return;
        }
        res.status(200).json(results)
    })
})

// post route
app.post("/tasks", (req, res) => {
    const { task_name, assign_to, project_name, deadline, status } = req.body;
    const query = 'INSERT INTO tasks (task_name, assign_to, project_name, deadline, status) VALUES (?,?,?,?,?)';

    db.query(query, [task_name, assign_to, project_name, deadline, status], (error, result) => {
        if (error) {
            console.error("Error on adding tasks:", error);  // Log the error for debugging
            res.status(500).send({ message: "Error on adding tasks", error: error.message });
            return;
        }
        res.status(201).send({ id: result.insertId, task_name, assign_to, project_name, deadline, status });
    });

})

// update route
// update status only
app.put("/tasks/:id/status", (req, res) => {
    const { id } = req.params;

    const { status } = req.body;
    const query = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.query(query, [status, id], (error, result) => {
        if (error) {
            res.status(500).send({ message: "Error on updating task: ", error: error.message })
            return;
        }
        res.status(200).send({ message: "Task updated successfully" })
    })
})
// update full task
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const { task_name, assign_to, project_name, deadline } = req.body;
    const query = `
        UPDATE tasks 
        SET task_name = ?, 
        assign_to = ?,
        project_name = ?,
        deadline = ?
        WHERE id = ?`;
    db.query(query, [task_name, assign_to, project_name, deadline, id], (error, result) => {
        if (error) {
            res.status(500).send({ message: "Error on updating task: ", error: error.message })
            return;
        }
        res.status(200).send({ message: "Task updated successfully" })
    })
})


// delete route
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).send({ message: "Error on deleting task: ", error: error.message })
            return;
        }
        res.status(200).send({ message: "Task deleted successfully" })
    })
})


// listen to server
app.listen(port, () => console.log(`server is listening at http://localhost:${port}`))


/*
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    assign_to VARCHAR(255),
    project_name VARCHAR(255),
    deadline DATE,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/
