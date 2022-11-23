const Part = require("../models/partModel");

exports.getAllParts = async (req, res) => {
  //Build query
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  //Filtering les('<') or more ('>')

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Part.find(JSON.parse(queryStr));

  //Sorting

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    //default sort
    // query = query.sort('-createdAt');
  }

  // Filtering by fields(Selecting fields)

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  //Execute query
  const parts = await query;

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
