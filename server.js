import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//mongooes connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

//routes
app.use("/api", route); 


//listen at PORT
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});