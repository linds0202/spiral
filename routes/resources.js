const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const resourcesController = require("../controllers/resources");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Item Routes - simplified for now
router.get("/:id", ensureAuth, resourcesController.getResource);

router.post("/createResource", upload.single("file"), resourcesController.createResource);

// router.put("/addItem/:id", itemsController.addItem);

router.put("/updateResource/:id", resourcesController.updateResource);

router.put("/addNewTutorial/:id", resourcesController.addNewTutorial);

// router.put("/checkItem/:id", itemsController.checkItem);

router.delete("/deleteResource/:id", resourcesController.deleteResource);

module.exports = router;
