import cloudinary from "../config/cloudnary.js";
import ErrorHandeler from "../middlewares/error.js";
import { empModal } from "../schema/userSchema.js";
import fs from "fs";

export async function updateEmpService(req, res, next) {
  try {
    const { name, email, phone, department, salary } = req.body;
    const { id } = req.params;

    const emp = await empModal.findById(id);
    if (!emp) {
      return next(new ErrorHandeler(404, "Employee not found"));
    }

    let imageUrl = emp.url;
    let publicId = emp.public_id;

   
    
    if (req.file) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "emp-management",
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;

      fs.unlinkSync(req.file.path);
    }

    const updatedEmp = await empModal.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        department,
        salary,
        url: imageUrl,
        public_id: publicId,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      updatedEmp,
    });
  } catch (error) {
    next(error);
  }
}
