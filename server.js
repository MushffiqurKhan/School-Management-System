const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {connectDB} = require('./Config/db');
const authRoutes = require('./Routes/AuthRoute');
const Routes = require('./Routes/Route');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../Swagger");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/',authRoutes);
app.use('/',Routes);


app.get('/', (req, res) => {
    res.send('Server is running successfully on localhost!');
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT || 7000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));