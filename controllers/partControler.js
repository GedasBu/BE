const Part = require("../models/partModel");

exports.getAllParts = async (req, res) => {
  const parts = await Part.find();
  res.status(200).json({
    status: "success",
    results: parts.length,
    data: {
      parts,
    },
  });
};

exports.createPart = async (req, res) => {
  try {
    const newPart = await Part.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        part: newPart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        part,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updatePart = async (req, res) => {
  console.log(req.params.id);
  try {
    const part = await Part.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        part,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deletePart = async (req, res) => {
  try {
    await Part.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
