import dotenv from "dotenv";
import express from "express";
import config from "./Db/config.js";
// import Routes from "./Routes/Routes.js";
// import jwt  from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import connectToMongo from "./Db/config.js";

dotenv.config();
connectToMongo();

// Middlewares
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Routes(app);

app.get ("/", (req, res) => {
    res.send("Welcome to the API");
});

const port = process.env.PORT || 8080;

app.listen(config.port, () => {
    console.log(`Server running on port ${port}`);
});