const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 20,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 30,
  },
  login: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    min: 2,
    max: 20,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    min: 6,
    max: 10,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    min: 1,
    max: 20,
  },
  avatar: {
    type: Schema.Types.String,
    required: false,
  },
  background: {
    type: Schema.Types.String,
    required: false,
  },
});

const userModel = model("user", schema);
module.exports = userModel;
