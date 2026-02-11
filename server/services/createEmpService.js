import cloudinary from "../config/cloudnary.js";
import ErrorHandeler from "../middlewares/error.js";
import { empModal } from "../schema/userSchema.js";
import fs from "fs";
export async function createEmpService(req, res, next) {
  const body = req.body;
  if (
    !body.name ||
    !body.email ||
    !body.phone ||
    !body.department ||
    !body.salary
  ) {
    const err = new ErrorHandeler(400, "All fields required");

    return next(err);
  }
  const file = req.file;
  const existingUser = await empModal
    .find()
    .or([{ email: body.email }, { phone: body.phone }]);
  if (existingUser.length > 0) {
    const err = new ErrorHandeler(400, "Phone or Email already exist");
    return next(err);
  }
  const regex = /^[6-9]\d{9}$/;
  const isPhoneValid = regex.test(body.phone);
  if (!isPhoneValid) {
    const err = new ErrorHandeler(400, "Phone no is not valid");
    return next(err);
  }
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "emp-management",
  });

  const empCreate = new empModal({
    ...body,
    url: result.secure_url,
    public_id: result.public_id,
  });
  console.log(empCreate);

  await empCreate.save();
  fs.unlinkSync(file.path);
  return res.status(200).json({
    success: true,
    newData:empCreate,
    message: "Successfully User Create",
  });
}
