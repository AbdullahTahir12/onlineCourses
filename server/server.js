const express = require("express");
require("dotenv").config();
const connectDb = require("./utils/db");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-Router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const errorMiddleware = require("./middleware/error-middleware");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET , POST, PUT, DELETE, PATCH , HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(5000, () => {
    console.log(`server listening on port 5000`);
  });
});
