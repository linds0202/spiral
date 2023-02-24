const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const resourcesController = require("../controllers/resources")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//Resource Routes
router.get("/:id", ensureAuth, resourcesController.getResource)

router.post("/createResource", upload.single("file"), resourcesController.createResource)

router.put("/updateResource/:id", resourcesController.updateResource)

router.put("/addNewTutorial/:id", resourcesController.addNewTutorial)

router.delete("/deleteResource/:id", resourcesController.deleteResource)

module.exports = router
