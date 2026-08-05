const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));


app.get("/", (req,res)=>{
    res.send("Travel1 Backend Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});