const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userDataRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = express();
const port = 3083;

// Setup Swagger documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Added a limit to allow the express server side to receive files as the images were being blocked for being too large
app.use(express.json({ limit: "10mb" }));

// Allow CORS for requests coming from Netlify
app.use(
  cors({
    origin:
      // "https://66b42a2f65f0a100084b9e3a--miniproject2glenharding.netlify.app",
      "https://miniproject2glenharding.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/", express.static("public"));

// Use /users for the userDataRoutes paths
app.use("/users", userRoutes);

// Start server and listen on specific port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
