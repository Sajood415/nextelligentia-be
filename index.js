import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import jobRoutes from "./routes/job.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Configure body-parser first, before any other middleware
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// CORS Configuration
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Other middleware
app.use(cors(corsOptions));
app.use(cookieParser());

// Support both old and new routes
app.use("/admin", adminRoutes); // For backward compatibility
app.use("/api/admin", adminRoutes); // New standard route

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/jobs", jobRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Nextelligentia Technologies API",
    status: "Server is running",
    version: "1.0.0",
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Set a timeout for MongoDB connection
    const connectWithRetry = async (retries = 5) => {
      try {
        await connectDB();
        app.listen(PORT, "0.0.0.0", () => {
          logger.info(`🚀 Server running on port ${PORT}`);
        });
      } catch (error) {
        if (retries > 0) {
          logger.info(`Retrying connection... ${retries} attempts left`);
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
          return connectWithRetry(retries - 1);
        }
        throw error;
      }
    };

    await connectWithRetry();
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  process.exit(1);
});
