const mongoose = require("mongoose");

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

console.log(MONGODB_URI);

const dbConnection = () => {
  // Establecer conexión con la base de datos
  mongoose.connect(MONGODB_URI);

  // Verificación de la conexión
  mongoose.connection
    .once("open", () => {
      console.log("The connection has been successful");
    })
    .on("error", (error) => console.error(error));
};

module.exports = dbConnection;
