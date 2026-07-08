const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {createElection, getAllElections, getActiveElection, updateElectionStatus} = require("../controllers/electionController");

const router = express.Router();

router.post("/",authMiddleware,adminMiddleware,createElection);
router.get("/",authMiddleware,adminMiddleware,getAllElections);
router.get("/active",authMiddleware,getActiveElection);
router.patch("/:id/status",authMiddleware,adminMiddleware,updateElectionStatus);

module.exports = router;