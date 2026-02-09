import express from "express";
import { createEmpService } from "../services/createEmpService.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { getEmpService } from "../services/getEmpService.js";
import { getEmpIdService } from "../services/getEmpIdService.js";
import { delEmpService } from "../services/delEmpService.js";
import { updateEmpService } from "../services/updateEmpService.js";

export const createEmp = catchAsync(async (req, res, next) => {
  await createEmpService(req, res, next);
});
export const getEmp = catchAsync(async (req, res, next) => {
  await getEmpService(req, res, next);
});
export const getEmpId = catchAsync(async (req, res, next) => {
  await getEmpIdService(req, res, next);
});

export const delEmp = catchAsync(async (req, res, next) => {
  await delEmpService(req, res, next);
});
export const updateEmp = catchAsync(async (req, res, next) => {
  await updateEmpService(req, res, next);
});
