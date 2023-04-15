const { Console } = require("console");
const path = require("path");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

dotenv.config({path: './password.env'})

const app = express();
app.use(cookieParser())

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies - as sent by HTML forms
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL Connected");
    }
});

// Define Routes
app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth'));


app.listen(5000, () => {
    console.log("Server started on Port 5000");
});