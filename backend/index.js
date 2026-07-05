const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const userRouter = require("./routes/authRoutes");
const projectRouter = require("./routes/projectRoutes");
const taskRouter = require("./routes/taskRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working...");
});

app.use("/api/auth", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});