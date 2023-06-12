const express = require('express')
const cors = require('cors')
//Routes
const userRouter = require('./routes/users.routes')
const repairRoutes = require('./routes/repairs.routes')

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/v1/users", userRouter);
app.use("/api/v1/repairs", repairRoutes);

module.exports = app;