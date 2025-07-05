import User from "../models/User.model.js";

export const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("✅ Admin already exists");
      return;
    }

    await User.create({
      name: "Admin",
      email: "info@nextelligentia.com",
      password: "admin123", // Stored as plain text
      role: "admin",
    });

    console.log("✅ Admin user created successfully");
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};
