import { empModal } from "../schema/userSchema.js";

export const getEmpService = async (req, res, next) => {
  try {
    let { page, limit, search } = req.query;
console.log(search)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;

    let searchCriteria = {};

 if (search) {
  searchCriteria = {
    name: {
      $regex: search.trim(),
      $options: "i",
    },
  };
}


    const totalEmployees = await empModal.countDocuments(searchCriteria);

    const emps = await empModal
      .find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      success: true,
      message: "All Employees",
      emps,
      pagination: {
        totalEmployees,
        currentPage: page,
        totalPages,
        pageSize: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};
