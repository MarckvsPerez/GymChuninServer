/*----------  Importaciones  ----------*/
/*
La función "require" en JavaScript se utiliza para cargar un módulo externo antes 
de que el programa comience a ejecutarse.
Mongoose - Importa la biblioteca Mongoose, que es una biblioteca de Node.js que se utiliza 
para conectarse y manipular bases de datos MongoDB.
*/
const mongoose = require("mongoose");

/*----------  Esquema de usuario  ----------*/
/**
 * El código crea un esquema de usuario para MongoDB utilizando la biblioteca mongoose.
 * El esquema define que los documentos de usuario tendrán los campos "firstname",
 * "lastname", "email", "password", "role", "active" y "avatar".
 * El "type" de "email" se establece en "String". Además, se establece la opción "unique"
 * como verdadera, lo que significa que el valor de "email" en un documento de usuario
 * debe ser único en la colección. Cada campo se define como un tipo de datos aceptable
 * para MongoDB, como "String" para "firstname" y "lastname", y "Boolean" para "active".
 */
const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
});

module.exports = mongoose.model("User", UserSchema);
/*----------  Exportar  ----------*/
/**
 * El código crea un modelo de datos llamado "User" en la biblioteca MongoDB basada en
 * Mongoose. El modelo "User" utiliza el esquema definido en "UserSchema" y se exporta
 * a través de la función "module.exports", lo que permite que se importe y se use en
 * otros archivos de Node.js de manera sencilla.
 */
