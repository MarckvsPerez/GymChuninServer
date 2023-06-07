/*----------  Importaciones  ----------*/
/**
 * Este código carga el módulo jsonwebtoken utilizando el método require de Node.js. Luego,
 * utiliza la sintaxis de desestructuración de objetos para extraer la constante
 * JWT_SECRET_KEY del módulo ../constants.
 *
 * La constante JWT_SECRET_KEY se utiliza como clave secreta para firmar y verificar tokens
 * JWT (JSON Web Tokens) utilizando la biblioteca jsonwebtoken. Los tokens JWT se utilizan
 * para autenticación y autorización en aplicaciones web y servicios de API.
 */
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

function createAccesToken(user) {
  /*----------  Fijar fecha expiración  ----------*/
  /**
   * Este código crea un objeto Date y lo almacena en la variable expToken. Luego, modifica
   * la hora del objeto de fecha agregando 3 horas usando el método setHours(). En otras
   * palabras, expToken contendrá la fecha actual más 3 horas.
   */
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);

  /*----------  Crear y firmar token  ----------*/
  /**
   * Este código utiliza la biblioteca 'jsonwebtoken' (jwt) para crear y firmar un token de
   * autenticación ('access token'). Primero se crea un objeto 'payload' que contiene la
   * información que se desea incluir en el token, como:
   * el tipo de token ('access'),
   * el identificador del usuario ('user_id'),
   * la fecha de emisión y expiración.
   *
   * El objeto 'payload' se pasa como primer argumento a la función 'jwt.sign', que a su vez
   * utiliza un secreto compartido ('JWT_SECRET_KEY') para firmar el token. Finalmente, el
   * token firmado se devuelve como resultado de la función.
   */
  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
}

function createRefreshToken(user) {
  /*----------  Fijar fecha expiración  ----------*/
  /**
   * El código crea un objeto de fecha llamado expToken, que se establece en la fecha y hora
   * en que se creó. Luego, mediante el uso del método setMonth, el valor del mes del objeto
   * de fecha se aumenta en 1, lo que significa que expToken ahora representa la fecha y hora
   * con un mes agregado. Esto se utiliza comúnmente en la creación de tokens de acceso que
   * tienen una fecha de caducidad, donde la fecha de expiración se establece en un tiempo
   * específico en el futuro (en este caso, 1 mes desde la fecha y hora actual).*/
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1);

  /*----------  Crear y firmar token  ----------*/
  /**
   * El código utiliza la librería jwt para generar un token de autenticación usando la clave
   * secreta JWT_SECRET_KEY. El token se genera con la información de
   * usuario proporcionada en la variable user._id,
   * el tipo de token "refresh" (para renovación de token),
   * la fecha y hora de generación "iat" y la fecha y hora de expiración "exp".
   * Esta información se almacena en un objeto llamado "payload" y se utiliza como parámetro
   * para la función "jwt.sign()", que toma la información y genera el token de
   * autenticación.
   */
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
}

/*----------  Decodificar  ----------*/
/**
 * Este código define una función llamada "decoded" que toma un parámetro llamado "token".
 * La función utiliza la librería "jwt" para decodificar el token que se le pasa como
 * argumento utilizando una clave secreta ("JWT_SECRET_KEY"). El último argumento, "true",
 * indica que se debe verificar que la firma del token es válida. La función devuelve el
 * token decodificado.
 */
function decoded(token) {
  return jwt.decode(token, JWT_SECRET_KEY, true);
}

/*----------  Exportar  ----------*/
/**
 * Este código exporta un módulo que contiene tres funciones: createAccessToken,
 * createRefreshToken, y decoded. Estas funciones se utilizan en el proceso de autenticación
 * y autorización para generar tokens de acceso y actualizarlos. Al exportar estas funciones,
 * se pueden utilizar en otros archivos del proyecto.
 */
module.exports = {
  createAccesToken,
  createRefreshToken,
  decoded,
};
