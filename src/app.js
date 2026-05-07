import express from "express";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3'; 
export const db = drizzle(process.env.DB_FILE_NAME);
const app = express();

app.use(express.json()); //Middleware

app.use("/users", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 