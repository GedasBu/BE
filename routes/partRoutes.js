const express = require("express");
const partController = require("../controllers/partControler");

const router = express.Router();

router.param("id", partController.checkID);

router
  .route("/")
  .get(partController.getAllParts)
  .post(partController.insertNewPart);
router
  .route("/:id")
  .get(partController.getPartById)
  .patch(partController.updatePart)
  .delete(partController.deletePart);

module.exports = router;
