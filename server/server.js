import express from 'express'
import { connectDB } from './config/db.js';

const port = process.env.SERVER_PORT || 7000;
const app = express();

app.use(express.json()); //middle ware to accept json data in req.body

app.get("/", (req, res) => {
  res.send("Hello World");
})

app.get("/heart", (req, res) => {
  res.send("Server is healthy");
})

app.listen(port, () => {
  connectDB();
  console.log(`server started at https://localhost:${port}`);
});
