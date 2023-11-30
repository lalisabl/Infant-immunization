const express = require("express");
const app = express();
require("./config/db");
const globalErrorHandler = require("./controllers/errorController");
const healthCareRoute = require("./routes/healthcareProvider");
const infantRoute = require("./routes/infant");
const vaccineRoute = require("./routes/vaccine");
const userRoute = require("./routes/users");
// body parser
app.use(express.json());
// middlewares
app.use("/api/v1/healthCare", healthCareRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/vaccine", vaccineRoute);
app.use("/api/v1/infant", infantRoute);
app.use(globalErrorHandler);
module.exports = app;
