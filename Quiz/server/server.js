const express = require('express');
const cors= require ('cors');
const bodyParser = require ('body-parser');
const router = require ('./routes/routes')
const db = require('./database/index')
require('dotenv').config();
const port = 5000;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://quiz-topia.vercel.app',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use('/',router);

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    db.close(); // Close MongoDB connection
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});