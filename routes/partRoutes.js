const express = require("express");
const partController = require("../controllers/partControler");

const router = express.Router();

router
  .route("/")
  .get(partController.getAllParts)
  .post(partController.createPart);
router
  .route("/:id")
  .get(partController.getPartById)
  .patch(partController.updatePart)
  .delete(partController.deletePart);

module.exports = router;
