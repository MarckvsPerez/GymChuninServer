const Exercise = require("../models/exercise");
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
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Exercise.paginate({}, options, (error, exerciseStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los exercise" });
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

function deleteExercise(req, res) {
  const { id } = req.params;

  Exercise.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el ejercicio" });
    } else {
      res.status(200).send({ msg: "exercise eliminado" });
    }
  });
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

function getExerciseByMuscle(req, res) {
  const { muscle } = req.params;

  Exercise.find(
    { muscle: { $regex: muscle, $options: "i" } },
    (error, exerciseStored) => {
      if (error) {
        res.status(500).send({ msg: "Error del servidor" });
      } else if (!exerciseStored || exerciseStored.length === 0) {
        res.status(400).send({ msg: "No se ha encontrado ningun ejercicio" });
      } else {
        res.status(200).send(exerciseStored);
      }
    }
  );
}

module.exports = {
  createExercise,
  getExercise,
  updateExercise,
  deleteExercise,
  getOneExercise,
  getExerciseByMuscle,
};
