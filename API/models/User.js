const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sexe: { type: String, required: true },
  age: { type: Date, required: true },
  token: { type: String },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  avatar: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  //   avis: { type: Date, required: true },
});

module.exports = mongoose.model("User", UserSchema);
