import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path'
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js'
import { connectDb } from "./db/connectDb.js";

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(express.json());

const PORT = process.env.PORT;
const __dirname = path.resolve();



app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


app.listen(PORT, () => {
   connectDb();
  console.log("Server is running on port", PORT);
});
