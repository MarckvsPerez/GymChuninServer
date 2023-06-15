const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const User = require("../models/user");
const Exercise = require("../models/exercise");

async function likeExercise(req, res) {
  const { userId, exerciseId } = req.body;

  if (!userId || !exerciseId) {
    return res
      .status(400)
      .send({ msg: "Se requiere el ID del usuario y del ejercicio" });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedExercises: exerciseId },
    });
    await Exercise.findByIdAndUpdate(exerciseId, {
      $addToSet: { likedByUsers: userId },
    });

    res.status(200).send({ msg: "Like agregado exitosamente" });
  } catch (error) {
    res.status(400).send({ msg: "Error al dar like al ejercicio" });
  }
}

async function unlikeExercise(req, res) {
  const { userId, exerciseId } = req.body;

  if (!userId || !exerciseId) {
    return res
      .status(400)
      .send({ msg: "Se requiere el ID del usuario y del ejercicio" });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { likedExercises: exerciseId },
    });
    await Exercise.findByIdAndUpdate(exerciseId, {
      $pull: { likedByUsers: userId },
    });
    res.status(200).send({ msg: "Like eliminado exitosamente" });
  } catch (error) {
    res.status(400).send({ msg: "Error al dar unlike al ejercicio" });
  }
}

const getLikedExercises = async (req, res) => {
  const { page = 1, limit = 10, muscleGroup } = req.query;
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({ msg: "Se requiere el ID del usuario" });
  }

  try {
    const user = await User.findById(userId);
    const likedExerciseIds = user.likedExercises;

    const filter = { _id: { $in: likedExerciseIds } };

    if (muscleGroup) {
      filter.muscleGroup = muscleGroup;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const response = await Exercise.paginate(filter, options);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({
        msg: "Error al obtener los ejercicios que le gustan al usuario",
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: "Error al obtener los ejercicios que le gustan al usuario",
    });
  }
};

module.exports = getLikedExercises;

module.exports = {
  likeExercise,
  getLikedExercises,
  unlikeExercise,
};
