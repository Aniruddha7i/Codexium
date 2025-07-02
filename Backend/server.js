import 'dotenv/config';
import app from './app.js';
import http from 'http';
import ConnectDB from './config/mongoDB.js';

const port = process.env.PORT || 8000;
ConnectDB();
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});