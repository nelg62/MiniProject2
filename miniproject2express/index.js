const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userDataRoutes");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
const app = express();
const port = 3083;

// Setup Swagger documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Added a limit to allow the express server side to recieve files as the images were being blocked for being to large
app.use(express.json({ limit: "10mb" }));
// Allow cors on the nextjs ports to allow request to the server from frountend
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use(
  cors({
    origin:
      "https://66b42a2f65f0a100084b9e3a--miniproject2glenharding.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/", express.static("public"));

// Use /users for the userDataRoutes paths
app.use("/users", userRoutes);

// Start server and listen on spesific port
app.listen(port, () => {
  console.log(`Example app listening
at http://localhost:${port}`);
});
