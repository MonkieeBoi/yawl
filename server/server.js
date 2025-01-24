import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import swaggerDocs from "./utils/swagger.js";
import userRouter from "./routes/user.route.js";
import itemRoute from "./routes/item.route.js"

const port = process.env.SERVER_PORT || 7000;
const app = express();

app.use(express.json()); //middle ware to accept json data in req.body
app.use(cookieParser()); // middle ware to parse cookies
app.use("/api/users/", userRouter);
app.use("/api/item", itemRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/heart", (req, res) => {
  res.send("Server is healthy");
});

app.listen(port, () => {
  connectDB();

  // Serve swagger docs
  swaggerDocs(app);

  console.log(`server started at https://localhost:${port}`);
});

