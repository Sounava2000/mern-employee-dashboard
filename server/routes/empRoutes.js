import express from "express";
import {
  createEmp,
  delEmp,
  getEmp,
  getEmpId,
  updateEmp,
} from "../controllers/empController.js";
import { upload } from "../multer/singleLocal.js";
export const Router = express.Router();
Router.post("/create", upload.single("file"), createEmp);
Router.get("/get-emp", getEmp);
Router.get("/get-empId/:id", getEmpId);
Router.post("/update-emp/:id",  upload.single("file"),updateEmp);

Router.post("/del-emp/:id", delEmp);
