import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// .env files
dotenv.config();
//port
const port = process.env.PORT;
if (!port) {
  console.error("Error: PORT is not defined in the .env file.");
  process.exit(1); // Exit the process with an error code
}
// defining express
const app = express();

// middleware for handeling cors 
// allow all the origins with default cors 
app.use(cors());
// all custom origin
// app.use(cors(
//   {
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   }
// ))

// Middleware for parsing req body
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("HI ");
});

// routes 
app.use("/books", booksRoute);


// connecting to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connectd to db");
    // listening
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// db password
// 2a29mDycPkX96TQr
