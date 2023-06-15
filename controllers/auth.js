/*----------  Importaciones  ----------*/
/*
La función "require" en JavaScript se utiliza para cargar un módulo externo antes 
de que el programa comience a ejecutarse.
Este código carga los módulos necesarios para utilizar la biblioteca de cifrado bcrypt,
el modelo de usuario definido en el archivo user.js de la carpeta models y el módulo jwt, 
que se utiliza para generar tokens web JSON
*/
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

/*----------  Registro de usuarios  ----------*/
function register(req, res) {
  /*----------  Destructuring i validación ----------*/
  /*
  Este código utiliza destructuring assignment para extraer las propiedades 
  "firstname", "lastname", "email" y "password" del objeto "req.body". 
  Esto significa que, una vez que el código se ejecute, tendrás variables separadas 
  llamadas "firstname", "lastname", "email" y "password", cada una conteniendo el 
  valor de la propiedad correspondiente que se encontraba dentro de "req.body". 
  Esto hace que sea más fácil trabajar con los valores y manipularlos según sea necesario.

  Este código garantiza que tanto el correo electrónico como la contraseña sean enviados 
  en una solicitud HTTP y responde con un error si cualquiera de los dos valores no está 
  presente.
  Si la variable email está vacía, devuelve true, lo que produce que se ejecute la 
  sentencia res.status(400).send({ msg: "El email es obligatorio" }). 
  El resultado de esa sentencia es el envío de una respuesta HTTP con un estado de 400 
  y un mensaje indicando que el email es obligatorio.
  */
  const { firstname, lastname, email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  /*----------  Creación de usuarios  ----------*/
  /**
  Este código crea una nueva instancia de la clase User.
  El uso del método lowerCase() asegura que los correos electrónicos sean únicos, 
  ya que no se permiten mayúsculas y el correo electrónico es sensible a ellas.

  En resumen, este código crea un nuevo objeto de usuario con los datos proporcionados 
  (nombre, apellido, correo electrónico y contraseña), y establece algunas propiedades 
  predeterminadas (rol y estado de activación) para el usuario creado. 
   */
  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: true,
  });

  /*----------  Encriptacion password  ----------*/
  /*
  Este código utiliza "bcrypt" para generar una cadena aleatoria llamada "salt".
  Se utilizará para aumentar la seguridad de la función de hash de contraseña.
  La función genSaltSync() de bcrypt acepta un parámetro que determina cuántas rondas de 
  cálculo de hash se deben realizar.
  Un mayor número de rondas aumenta la seguridad, pero también aumenta la complejidad y 
  el tiempo de cálculo. En este caso, se usan 10 rondas.
  La constante "salt" se utilizará más tarde en el proceso de hash de la contraseña 
  para aumentar la seguridad.
  La función hashSync recibe la contraseña y el valor de "salt", y produce un hash seguro
  de la contraseña.
  El hash resultante es lo que se almacena en la base de datos para la autenticación, 
  en lugar de la contraseña en texto sin formato.
  password = 123456
  hashPassword = $2a$10$oWisJEniz.jchlipP58AGOS5xSnTbgoJFG3NtufSibLXfA9su50wO
  */
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  /*----------  Crear usuario  ----------*/
  /**
   * Este código guarda los datos de un usuario en una base de datos por medio de una función
   * llamada "save". Si ocurre un error durante el proceso de guardado, el servidor responde
   * con un código de estado HTTP 400 y un mensaje de texto indicando que hubo un error al crear
   * el usuario. En caso contrario, el servidor responde con un código de estado HTTP 200 y
   * envía de vuelta al cliente los datos del usuario guardados en la base de datos.
   */
  user.save((error, userStorage) => {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "Error al crear el usuario" });
    } else {
      res.status(200).send(userStorage);
    }
  });
}

/*----------  Inicio de sesión  ----------*/
function login(req, res) {
  /*----------  Email y pass  ----------*/
  /**
   * La función recibe una solicitud req y una respuesta res. En la solicitud req
   * se espera que se incluyan el correo electrónico y la contraseña del usuario,
   * los cuales se extraen desestructurando el objeto req.body.
   * Posteriormente, se validan tanto el correo electrónico como la contraseña.
   * Si alguno de ellos no existe, la función devuelve un código de estado 400 y
   * un mensaje de error.
   * Por útlimo, se convierte el valor de la variable "email" a minúsculas utilizando
   * el método toLowerCase() de JavaScript. Esto es útil en situaciones en las que se
   * necesite un valor completamente en minúsculas para evitar errores de programación
   * al realizar comparaciones o búsquedas de strings. El resultado se almacena en una
   * nueva variable llamada "emailLowerCase".
   */
  const { email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });
  const emailLowerCase = email.toLowerCase();

  /*----------  Buscar usuario por mail  ----------*/
  /**
   * Este código es una función que busca un usuario en la base de datos por correo
   * electrónico y compara su contraseña hasheada con la contraseña ingresada por el
   * usuario.
   *
   * Si ocurre un error al buscar al usuario en la base de datos o al comparar
   * las contraseñas, la función responde con un mensaje de error del servidor con un
   * estado de 500.
   *
   * Si la contraseña no coincide con la contraseña hasheada del usuario, la función
   * responde con un mensaje de error con un estado de 400.
   *
   * Si el usuario no está activo en la base de datos, la función responde con un
   * mensaje de error con un estado de 401.
   *
   * Finalmente, si todo ha ido bien y se ha encontrado el usuario y la contraseña coincide
   * con la contraseña hasheada en la base de datos, la función devuelve un objeto JSON que
   * contiene tokens de acceso y actualización generados a través de JWT con un estado 200.
   */
  User.findOne({ email: emailLowerCase }, (error, userStore) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else if (!userStore) {
      res.status(400).send({ msg: "Usuario no encontrado" });
    } else {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña incorrecta" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "Usuario no autorizado o no activo" });
        } else {
          res.status(200).send({
            access: jwt.createAccesToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    }
  });
}

/*----------  Actualizar token  ----------*/
function refreshAccessToken(req, res) {
  /*----------  token  ----------*/
  /**
   * Este código extrae el token de un objeto recibido en una solicitud HTTP utilizando
   * el middleware 'body-parser' para Parser JSON y decodifica el token utilizando la
   * biblioteca JSON Web Token (JWT).
   * Luego, comprueba si se recibió un token y devuelve un mensaje de 'Token requerido'
   * en caso contrario, respondiendo con un estado de error HTTP 400.
   */
  const { token } = req.body;
  const { user_id } = jwt.decoded(token);
  if (!token) res.status(400).send({ msg: "Token requerido." });

  /*----------  Buscar usuario por id  ----------*/
  /**
   * El código se encarga de buscar a un usuario en la base de datos con el ID proporcionado
   * por el parámetro user_id. Si se produce un error en la búsqueda, se devuelve una
   * respuesta HTTP con código 500 y un mensaje "Error del servidor".
   * Si la búsqueda se realiza sin problemas, se crea un token de acceso para el usuario
   * encontrado utilizando una función llamada createAccessToken de la biblioteca jwt y se
   * devuelve en una respuesta HTTP con código 200.
   */
  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccesToken(userStorage),
      });
    }
  });
}

module.exports = {
  /*----------  Exportar función  ----------*/
  /**
   * Este código exporta un módulo de Node.js que contiene tres funciones: "register",
   * "login" y "refreshAccessToken".
   */
  register,
  login,
  refreshAccessToken,
};
