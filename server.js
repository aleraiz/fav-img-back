require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Routes
const routes = require("./routes/index.routes");

app.use(express.static("public"));
// app.use(cors());
app.use(express.urlencoded({ extended: true })); // para recibir datos desde los forms
app.use(express.json());

// DB Connection
const dbConnection = require("./dbConnection/dbConnection");
dbConnection();

app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
