exports.checkID = (req, res, next, val) => {
  console.log("tour id is", val);
  if (val * 1 > tours.length) {
    return res.status(404).json({
      message: "not founddd",
    });
  }
  next();
};

exports.getAllParts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: "data is under construction!",
    data: {},
  });
};

exports.insertNewPart = (req, res) => {
  res.status(201).json({
    status: "success",
    results: "Insert new part is under construction",
    data: {},
  });
  res.send(200);
};

exports.updatePart = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated part",
    },
  });
};

exports.deletePart = (req, res) => {
  res.status(204).json({
    status: "success",
  });
};

exports.getPartById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
