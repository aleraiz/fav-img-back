const mongoose = require("mongoose");

const dbConnection = () => {
  // Establecer conexión con la base de datos
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  // Verificación de la conexión
  mongoose.connection
    .once("open", () => {
      console.log("The connection has been successful");
    })
    .on("error", (error) => console.error(error));
};

module.exports = dbConnection;
