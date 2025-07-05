import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { seedAdmin } from "../utils/adminSeeder.js";

dotenv.config();

const runSeeder = async () => {
  try {
    await connectDB();
    await seedAdmin();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

runSeeder();
