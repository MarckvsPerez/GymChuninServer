const Exercise = require("../models/exercise");
const User = require("../models/user");
const image = require("../utils/image");

function createExercise(req, res) {
  const exercise = new Exercise(req.body);
  exercise.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  exercise.miniature = imagePath;

  exercise.save((error, exerciseStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el ejercicio" });
    } else {
      res.status(200).send(exerciseStored);
    }
  });
}

function getExercise(req, res) {
  const { page = 1, limit = 10, muscleGroup, muscle } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { likedByUsers: "desc" },
  };

  const query = {};

  if (muscle) {
    const muscleArray = muscle.split(",");
    query.muscle = { $in: muscleArray };
  }

  if (muscleGroup) {
    const muscleGroupArray = muscleGroup.split(",");
    query.muscleGroup = { $in: muscleGroupArray };
  }

  Exercise.paginate(query, options, (error, exerciseStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los ejercicios" });
    } else {
      res.status(200).send(exerciseStored);
    }
  });
}

function updateExercise(req, res) {
  const { id } = req.params;
  const exerciseData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    exerciseData.miniature = imagePath;
  }

  Exercise.findByIdAndUpdate({ _id: id }, exerciseData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar" });
    } else {
      res.status(200).send({ msg: "Actualización correcta" });
    }
  });
}

async function deleteExercise(req, res) {
  const { id } = req.params;

  try {
    const deleteExercise = await Exercise.findByIdAndDelete(id);

    if (!deleteExercise) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }

    await User.updateMany(
      { likedExercises: id },
      { $pull: { likedExercises: id } }
    );

    return res
      .status(200)
      .json({ message: "Ejercicio eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el ejercicio:", error);
    return res.status(500).json({ error: "Error al eliminar el ejercicio" });
  }
}

function getOneExercise(req, res) {
  const { path } = req.params;

  Exercise.findOne({ path }, (error, exerciseStored) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else if (!exerciseStored) {
      res.status(400).send({ msg: "No se ha encontrado ningun exercise" });
    } else {
      res.status(200).send(exerciseStored);
    }
  });
}

module.exports = {
  createExercise,
  getExercise,
  updateExercise,
  deleteExercise,
  getOneExercise,
};
