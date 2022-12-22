const express = require("express");
const partController = require("../controllers/partControler");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, partController.getAllParts)
  .post(partController.createPart);
router
  .route("/:id")
  .get(partController.getPartById)
  .patch(partController.updatePart)
  .delete(
    authController.protect,
    authController.restrict("admin"),
    partController.deletePart
  );

module.exports = router;
