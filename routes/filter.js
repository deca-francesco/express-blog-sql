// rotta filter

// importo express
const express = require("express");
// definisco l'istanza di router
const router = express.Router();
// importo il controller
const TagFilterController = require("../controllers/TagFilterController.js");





// rotta tagFilter
router.get("/", TagFilterController.tagFilter);





module.exports = router;