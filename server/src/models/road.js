const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    usrn: String,
    road_name: String,
    fully_claimed: Boolean,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
