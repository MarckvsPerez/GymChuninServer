/*----------  Importaciones  ----------*/
/*
La función "require" en JavaScript se utiliza para cargar un módulo externo antes 
de que el programa comience a ejecutarse.
Mongoose - Importa la biblioteca Mongoose, que es una biblioteca de Node.js que se utiliza 
para conectarse y manipular bases de datos MongoDB.
app - Importa el archivo "app.js" que contiene la configuración y definición de la 
aplicación Node.js.
El código está utilizando la destructuración de objeto en JavaScript para asignar 
variables a los valores de ciertas constantes exportadas desde el módulo "constants.js". 
Las constantes son "DB_USER", "DB_PASSWORD", "DB_HOST", "API_VERSION" e "IP_SERVER".
*/
const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require("./constants");

/*----------  PUERTO  ----------*/
/**
 * El código establece una constante llamada PORT que se utiliza para establecer el
 * número de puerto en el que se ejecutará el servidor (backend) de una aplicación.
 * El valor de PORT se establece a través del proceso process.env.POST, que busca
 * una variable de entorno llamada POST y la asigna si está definida. En caso contrario,
 * el valor predeterminado del puerto al que se conectará el servidor es 3977. Este
 * código permite a los desarrolladores modificar el valor de PORT en función de las
 * necesidades de su aplicación, ya sea a través de una variable de entorno o estableciendo
 * manualmente el valor dentro del código.
 */
const PORT = process.env.PORT || 3977;

/*----------  Conexión  ----------*/
/**
*Este código se utiliza para conectar una aplicación de Node.js a una base de datos
MongoDB a través del controlador Mongoose. Se utiliza el método connect() proporcionado
por el objeto mongoose.La cadena de conexión a la base de datos se compone de varias 
partes, que se concatenan mediante plantilla de cadena de JavaScript. Estas partes 
incluyen los valores de las variables DB_USER, DB_PASSWORD, DB_HOST que se pasan como 
parámetros al script, y conforman la dirección de conexión a la base de datos en la nube 
de MongoDB.La función connect() toma esta cadena de conexión, la procesa y establece una 
conexión activa con la base de datos. Si hay un error, se imprime este error en la 
consola.Después de la conexión exitosa a la base de datos, la aplicación se inicializa y 
se pone a la escucha en el puerto definido en la variable PORT (también pasada como 
parámetro al script). Se imprime en la consola un conjunto de mensajes informativos, 
incluyendo la dirección del servidor, versión del API, etc. que informa al usuario que 
la aplicación está activa y lista para ser utilizada.
 */
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
  (error) => {
    if (error) throw error;

    app.listen(PORT, () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  }
);
