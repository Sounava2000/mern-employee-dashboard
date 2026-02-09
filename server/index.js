import express from "express";
import multer from 'multer'
import cors from 'cors'
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConfig.js";
import { Router } from "./routes/empRoutes.js";
import { ErrorMiddleWare } from "./middlewares/error.js";
const app = express();
app.use(cors())
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' })
const PORT = process.env.PORT || 4000;
app.use("/v1", Router);


app.use(ErrorMiddleWare)
function server() {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

dbConnect()
  .then(server)
  .catch((error) => console.log(error.message));
