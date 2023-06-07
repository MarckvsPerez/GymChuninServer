/*----------  Importaciones  ----------*/
/**
 * El código importa "express" y el controlador de autenticación (AuthController)
 * desde el archivo "../controllers/auth". Se utilizará el objeto
 * Express en el resto del código para definir rutas HTTP y realizar solicitudes de
 * servidor, mientras que el controlador de autenticación manejará la lógica de
 * autenticación de usuarios.
 */
const express = require("express");
const AuthController = require("../controllers/auth");

/*----------  API  ----------*/
/**
 * El código crea un objeto Router en el módulo Express de Node.js y lo asigna a
 * una constante llamada "api". Este objeto Router permite definir rutas HTTP
 * (GET, POST, etc.) en una aplicación web. La variable "api" se puede usar para
 * definir rutas específicas que se utilizarán en la API de la aplicación.
 */
const api = express.Router();

/*----------  API POST  ----------*/
/**
 * El código define tres rutas para un servidor API, todas relacionadas con la
 * autenticación de un usuario.
 * La primera ruta, api.post("/auth/register", AuthController.register);, está relacionada
 * con la creación de nuevas cuentas de usuario. Esto significa que cuando el cliente
 * solicita hacer un POST en '/auth/register', el servidor ejecuta el controlador definido
 * 'AuthController.register'.
 *
 * La segunda ruta, api.post("/auth/login", AuthController.login);, está pendiente de
 * implementación, pero probablemente se utilizará para que los usuarios inicien sesión
 * en su cuenta enviando sus credenciales.
 *
 * La tercera ruta, api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);,
 * también está pendiente de implementación, y probablemente permita al cliente solicitar
 * un nuevo token de acceso si el antiguo ha expirado.
 */
api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);

module.exports = api;
/*----------  Exportar  ----------*/
/**
 * Este código exporta la variable api para que pueda ser utilizada por otros módulos
 * de Node.js. Cuando se importa el módulo que contiene esta línea de código, la
 * variable api se convierte en una propiedad del objeto de módulo que se está importando.
 * Esto significa que el valor de api se puede acceder desde otros módulos como
 * nombreDeModulo.api.
 */
