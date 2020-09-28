const router = require('express').Router();
const songController = require("../../controllers/songController");

// router
//   .route("/")
//   .get(songController.findAll);

router.route('/:userid')
.get(songController.findUserSongs)
.post(songController.AddUserSongs)

module.exports = router;
