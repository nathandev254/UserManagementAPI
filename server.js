import express from "express";
import UserRoute from "./routes/EmployeeRoute.js";
import AuthRoute from "./routes/authRoute.js";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
// import config from "./model/Configuration.js";

const {PORT} = process.env
const app = express();

// const PORT = 8081;



// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// route middlewares
app.use("/employee", UserRoute);
app.use("/", AuthRoute);


app.listen(PORT || 5000, () => {
  console.log(`i create my first server at 20`);
});
