const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const resourcesController = require("../controllers/resources")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//Main Routes 
router.get("/", homeController.getIndex)

router.get("/profile", ensureAuth, resourcesController.getProfile)

router.get("/feed", ensureAuth, resourcesController.getFeed)

router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
router.get("/signup", authController.getSignup)
router.post("/signup", authController.postSignup)

module.exports = router