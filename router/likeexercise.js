const express = require("express");
const likesController = require("../controllers/like");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/like", [md_auth.asureAuth], likesController.likeExercise);
api.get(
  "/like/:userId",
  [md_auth.asureAuth],
  likesController.getLikedExercises
);
api.delete("/like", [md_auth.asureAuth], likesController.unlikeExercise);

module.exports = api;
