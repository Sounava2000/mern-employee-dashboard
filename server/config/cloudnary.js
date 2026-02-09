import dotenv from 'dotenv'
import { v2 as cloudinary } from "cloudinary";

dotenv.config()

cloudinary.config({
cloud_name: process.env.my_cloud_name,
api_key: process.env.my_key,
api_secret: process.env.my_secret
});
export default cloudinary