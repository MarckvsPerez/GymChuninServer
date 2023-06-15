const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Exercise = require("../models/exercise");
const image = require("../utils/image");

async function getMe(req, res) {
  /**
   * El código define una función asincrónica llamada getMe que recibe dos parámetros como
   * entrada: req y res (que representan una solicitud y una respuesta web).
   *
   * La función simplemente establece el estado de la respuesta HTTP en 200 y envía como
   * respuesta un objeto JSON con una propiedad msg cuyo valor es "OK".
   */
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400), send({ msg: "No se ha encontrado el usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active == undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user.save((error, userStored) => {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "Error al crear el usuario" });
    } else {
      res.status(200).send(userStored);
    }
  });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Actualización correcta" });
    }
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await Exercise.updateMany(
      { likedByUsers: id },
      { $pull: { likedByUsers: id } }
    );

    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({ error: "Error al eliminar usuario" });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
/*----------  Exportar  ----------*/
/**
 * Este código exporta un objeto que contiene una función llamada getMe utilizando la
 * sintaxis de module.exports en JavaScript. Esto significa que getMe se puede utilizar
 * en otro archivo que importa este módulo.
 */
