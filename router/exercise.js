const express = require("express");
const ExerciseController = require("../controllers/exercise");
const md_auth = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./uploads/exercises" });
const api = express.Router();

api.post(
  "/exercise",
  [md_auth.asureAuth, md_upload],
  ExerciseController.createExercise
);
api.get("/exercise", ExerciseController.getExercise);
api.patch(
  "/exercise/:id",
  [md_auth.asureAuth, md_upload],
  ExerciseController.updateExercise
);
api.delete(
  "/exercise/:id",
  [md_auth.asureAuth],
  ExerciseController.deleteExercise
);
api.get("/exercise/:path", ExerciseController.getOneExercise);

module.exports = api;
