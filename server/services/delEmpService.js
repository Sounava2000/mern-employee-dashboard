import { empModal } from "../schema/userSchema.js";
import ErrorHandeler from "../middlewares/error.js";
import cloudinary from "../config/cloudnary.js";

export async function delEmpService(req, res, next) {
  try {
const id = req.params.id;



     console.log(id)
    const emp = await empModal.findById(id);

    if (!emp) {
      return next(new ErrorHandeler(404, "Employee not found"));
    }
   if (emp.public_id) {
      await cloudinary.uploader.destroy(emp.public_id);
    }
    await empModal.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
message: "Employee and image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
