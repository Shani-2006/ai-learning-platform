const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ override: true });
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middlewares/errorHandler");
const promptRoutes = require("./routes/promptRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");
console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use(errorHandler);
app.use("/api/prompts", promptRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.get("/", (req, res) => {
  res.json({ message: "AI Learning Platform API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});