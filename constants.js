/*----------  Definir constantes  ----------*/
/**
 * El código define varias constantes.
 * - La constante DB_USER almacenará el nombre de usuario para conectarse a una base de
 * datos. En este caso es "Admin".
 * - La constante DB_PASSWORD almacena la contraseña para conectarse a la base de datos.
 * En este caso es "Admin1234".
 * - La variable DB_HOST contiene la dirección de la base de datos a la que se quiere
 * conectar. En este caso, la base de datos está alojada en
 * "web-personal.bgtih5q.mongodb.net".
 * - La constante API_VERSION contiene la versión de la API que se quiere utilizar.
 * En este caso es "v1".
 * - La constante IP_SERVER guarda la dirección IP del servidor local. En este caso,
 * es "localhost".
 * El código define una constante llamada JWT_SECRET_KEY y le asigna una cadena de texto
 * "GASBDHJKGASDVASHJDVBASJ".
 * El propósito de esta constante es ser utilizada como una clave secreta para firmar y
 * verificar tokens JWT (JSON Web Token) en una aplicación que implemente esta funcionalidad.
 * Los tokens JWT son una forma de autenticación utilizada en aplicaciones web modernas, y
 * su uso requiere el uso de una clave secreta para asegurar que el token no pueda ser
 * alterado o falsificado por entidades maliciosas. La constante JWT_SECRET_KEY es un
 * elemento crítico en la implementación de dicha seguridad.
 */
const DB_USER = "admin";
const DB_PASSWORD = "admin123456";
const DB_HOST = "gymchunin.dvqeujg.mongodb.net";

const API_VERSION = "v1";
const IP_SERVER = "localhost";

const JWT_SECRET_KEY = "GASBDHJKGASDVASHJDVBASJ";

module.exports = {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  JWT_SECRET_KEY,
  IP_SERVER,
  API_VERSION,
};
/*----------  Exportar  ----------*/
/**
 * Este código exporta un módulo llamado "module.exports" que contiene varias variables.
 * Estas estarán disponibles para ser importadas por otros módulos o archivos de JavaScript
 * que necesiten utilizarlas.
 */
