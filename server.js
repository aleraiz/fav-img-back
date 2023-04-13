require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Routes
const publicRoutes = require("./routes/public.routes");
const userRoutes = require("./routes/user.routes");
const imageRoutes = require("./routes/images.routes");

app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: true })); // para recibir datos desde los forms
app.use(express.json());

// DB Connection
const dbConnection = require("./dbConnection/dbConnection");
dbConnection();

app.use(publicRoutes);
app.use(userRoutes);
app.use(imageRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
