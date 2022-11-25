const Part = require("../models/partModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllParts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Part.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const parts = await features.query;

  res.status(200).json({
    status: "success",
    results: parts.length,
    data: {
      parts,
    },
  });
});

exports.createPart = catchAsync(async (req, res, next) => {
  const newPart = await Part.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      part: newPart,
    },
  });
});

exports.getPartById = catchAsync(async (req, res, next) => {
  const part = await Part.findById(req.params.id);
  if (!part) {
    return next(
      new AppError(`No part found with that Id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      part,
    },
  });
});

exports.updatePart = catchAsync(async (req, res, next) => {
  const part = await Part.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!part) {
    return next(
      new AppError(`No part found with that Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      part,
    },
  });
});

exports.deletePart = catchAsync(async (req, res, next) => {
  const part = await Part.findByIdAndDelete(req.params.id);
  if (!part) {
    return next(
      new AppError(`No part found with that Id: ${req.params.id}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
