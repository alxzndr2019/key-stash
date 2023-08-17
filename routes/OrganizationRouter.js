const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/OrganizationController");

router.post("/register", organizationController.createOrganization);
router.post("/login", organizationController.login);
router.post("/createkey", organizationController.createKey);
router.get("/:id", organizationController.getOrganizationById);
module.exports = router;
