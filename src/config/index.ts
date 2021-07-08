import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const MONGODB_URI = process.env["MONGODB_URI"];
export const PORT = process.env["PORT"];




