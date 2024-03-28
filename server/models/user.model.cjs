const { schema, model, Schema, SchemaTypes } = require("mongoose");

const userModel = model("user", schema);
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
    min: 2,
    max: 20,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    min: 6,
    max: 10,
  },
  emale: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 20,
  },
  avatar: {
    type: Schema.Types.String,
    required: false,
  },
});

module.exports = userModel;
