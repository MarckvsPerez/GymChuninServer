const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ExerciseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  content: String,
  muscle: String,
  muscleGroup: String,
  path: {
    type: String,
    unique: true,
  },
  created_at: Date,
});

ExerciseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Exercise", ExerciseSchema);
