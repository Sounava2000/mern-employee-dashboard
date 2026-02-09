import mongoose from "mongoose";
const empSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
       
    },

    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },

    department: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    url: {
      type: String,
    },
    public_id: {
  type: String,
}

  },
  {
    timestamps: true,
  },
);

empSchema.methods.genetation =  function() {

}
export const empModal = mongoose.model("emp-management", empSchema);
