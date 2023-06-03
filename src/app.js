const express = require('express')

//Routes
const userRouter = require('./routes/users.routes')
const repairRoutes = require('./routes/repairs.routes')

const app = express();
app.use(express.json());

app.use("/api/v1/repairs", repairRoutes);
app.use("/api/v1/users", userRouter)

module.exports = app