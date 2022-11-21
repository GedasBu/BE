const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Part mus have code"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A part must have a name"],
    unique: true,
  },
  alternative_codes: String,
  attribute: {
    type: String,
    required: [true, "Part must have atttribute"],
  },
  maker: {
    type: String,
    required: [true, "A part must have a maker"],
  },
  group: {
    type: String,
    required: true,
  },
  unit_of_measurement: {
    type: String,
    required: true,
  },
  notes: String,
  suppliers_numbers: {},
});

const Part = mongoose.model("Part", partSchema);

module.exports = Part;
