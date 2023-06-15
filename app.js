/*----------  Importar  ----------*/
/**
 * El código está importando los módulo express, body-parser, cors y el objeto API_VERSION
 * desde el archivo constants.js.
 * express es un framework de Node.js utilizado para construir aplicaciones web.
 * body-parser es un middleware de express que permite analizar y manipular datos enviados
 * en el cuerpo de una solicitud HTTP.
 * cors es otro middleware de express que facilita la configuración de la política de
 * intercambio de recursos de origen cruzado (CORS) en una aplicación, lo que permite
 * que los recursos compartidos en una página web sean solicitados por otro dominio fuera
 * del dominio que sirvió el recurso original.
 * El objeto API_VERSION contiene información sobre la versión de la API utilizada en la
 * aplicación y se utiliza en otras partes del código.
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

/*----------  App  ----------*/
/**
 * Se está creando una instancia de la aplicación web utilizando el framework de Node.js
 * llamado Express. La constante 'app' contiene todos los métodos y propiedades necesarias
 * para crear y configurar un servidor web, como definir direcciones URL para rutas
 * específicas, realizar acciones en respuesta a las solicitudes HTTP, entre otras tareas
 * que son necesarias para crear una aplicación web funcional.
 */
const app = express();

/*----------  Importar rutas  ----------*/
/**
 * Importamos las rutas para la autenticación y el manejo de usuarios
 */
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const exerciseRoutes = require("./router/exercise");
const newsletterRoutes = require("./router/newsletter");
const likesRouter = require("./router/likeexercise");

/*----------  Configurar Body-Pasrer  ----------*/
/**
 * El siguiente código es parte de la configuración de un servidor en Express.js, donde
 * se utiliza el middleware de body-parser. El middleware se utiliza para procesar el
 * cuerpo de una solicitud que puede contener datos en formato JSON o en formato de URL
 * codificado.
 *
 * body-parser.urlencoded es una función que devuelve un middleware para analizar los
 * datos de entrada codificados en una URL. La opción extended permite elegir cuál de los
 * dos tipos de analizador que se van a usar. Si está configurado en true, permitirá el
 * análisis de datos codificados en una URL con funciones extendidas.
 *
 * Por otro lado, body-parser.json es una función que devuelve un middleware para analizar
 * el cuerpo de la solicitud como JSON. Aquí simplemente estamos utilizando la
 * configuración predeterminada de body-parser que analiza el cuerpo como JSON, sin
 * opciones adicionales.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder

/*----------  Configurar carpeta estática  ----------*/
/**
 * El código app.use(express.static("uploads")); se utiliza para crear una ruta de
 * middleware en una aplicación Node.js usando framework Express.js.
 *
 * Lo que hace este código es permitir el acceso a los archivos que se encuentran en el
 * directorio "uploads" de la aplicación. Esto significa que cuando un usuario visite una
 * URL que solicite un archivo que se encuentra en ese directorio, Express buscará el
 * archivo y lo servirá al usuario.
 *
 * El middleware express.static se utiliza para servir contenido estático directamente
 * desde el servidor sin procesamiento adicional. En este caso, la carpeta "uploads" se
 * considera contenido estático que se puede servir directamente al cliente sin necesidad
 * de procesamiento adicional.
 */
app.use(express.static("uploads"));

/*----------  Configurar Header HTTP - Cors  ----------*/
/**
 * Este código habilita el middleware Cors en una aplicación Node.js. CORS significa
 * “Cross-Origin Resource Sharing” y es una política de seguridad de los navegadores
 * web que limita las solicitudes HTTP que se pueden realizar desde un dominio diferente
 * al de la página web que se está cargando. Al habilitar el middleware CORS con
 * app.use(cors()), permitimos que los navegadores web se comuniquen con el servidor
 * desde orígenes cruzados, lo que significa que el servidor puede recibir solicitudes
 * HTTP de diferentes dominios.
 */
app.use(cors());

// Configure routings

/*----------  Configurar rutas  ----------*/
/**
 * El código configura dos rutas para una aplicacion de Express.js.
 *
 * La primera línea define una ruta de autenticación (authRoutes) que esté disponible en el
 * subdirectorio /api de la versión (API_VERSION) especificada.
 * La segunda línea define otra ruta de usuario (userRoutes) disponible también en el
 * subdirectorio /api de la misma versión (API_VERSION).
 *
 * En ambas líneas, el método app.use especifica que se use el middleware correspondiente
 * para procesar las rutas definidas.
 */
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, exerciseRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);
app.use(`/api/${API_VERSION}`, likesRouter);

module.exports = app;
/*----------  Exportar  ----------*/
/**
 * Se xporta un objeto llamado app que se define en el archivo actual (module se
 * refiere a este archivo). Al exportar este objeto, otros archivos que importen
 * este archivo tendrán acceso a este objeto app.
 */
