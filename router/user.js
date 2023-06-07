/*----------  Importar  ----------*/
/**
 * Este código importa los módulos "express" y "UserController" utilizando la función
 * "require" de Node.js. El módulo "express" es un framework de Node.js utilizado para
 * construir aplicaciones web, mientras que "UserController" es una clase o archivo que
 * contiene las funciones controladoras que gestionan las solicitudes y respuestas HTTP
 * relacionadas con las operaciones del usuario en la aplicación web.
 */
const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");

/*----------  API  ----------*/
/**
 * El código crea un objeto Router en el módulo Express de Node.js y lo asigna a
 * una constante llamada "api". Este objeto Router permite definir rutas HTTP
 * (GET, POST, etc.) en una aplicación web. La variable "api" se puede usar para
 * definir rutas específicas que se utilizarán en la API de la aplicación.
 */
const api = express.Router();
const md_upload = multiparty({ uploadDir: "./uploads/avatar" });

/*----------  Solicitud HTTP ----------*/
/**
 * Este código hace una solicitud HTTP GET a la ruta "/user/me" de la API y cuando se
 * recibe una respuesta, la controla mediante la función "getMe" del controlador
 * UserController.
 */
api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.updateUser
);
api.delete("/user/:id", [md_auth.asureAuth], UserController.deleteUser);

module.exports = api;
/*----------  Exportar  ----------*/
/**
 * Se exporta el objeto api del módulo actual (archivo JavaScript) para que pueda ser
 * utilizado en otros archivos dentro del mismo proyecto.
 */
