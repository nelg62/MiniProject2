const express = require("express");
const cors = require("cors");
// create route for the userDataRoute
const userRoutes = require("./routes/userDataRoutes");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
const app = express();
const port = 3083;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// added a limit to allow the express server side to recieve files as the images were being blocked for being to large
app.use(express.json({ limit: "10mb" }));
// allow cors on the nextjs ports to allow request to the server
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/", express.static("public"));
// use /users for the userDataRoutes paths
app.use("/users", userRoutes);

// host the port to listen
app.listen(port, () => {
  console.log(`Example app listening
at http://localhost:${port}`);
});
