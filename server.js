require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Routes
const routes = require("./routes/index.routes");
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// DB Connection
const dbConnection = require("./dbConnection/dbConnection");
dbConnection();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
