import ErrorHandeler from "../middlewares/error.js";
import { empModal } from "../schema/userSchema.js";

export const getEmpIdService = async (req, res, next) => {
  const id = req.params.id;
 console.log(id)
 const emp = await empModal.findById(id);
  if (!emp) {
    return next(new ErrorHandeler(404, "Employee not found"));
  }

  res.status(200).json({
    success: true,
    
     emp,
  });
};
