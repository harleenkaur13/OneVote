const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {createElection, getAllElections, getActiveElection, updateElectionStatus} = require("../controllers/electionController");
const {getEligibleStudents,addCandidate,getCandidatesByElection,deleteCandidate} = require("../controllers/candidateController")
const router = express.Router();

router.post("/",authMiddleware,adminMiddleware,createElection);
router.get("/",authMiddleware,adminMiddleware,getAllElections);
router.get("/active",authMiddleware,getActiveElection);
router.patch("/:id/status",authMiddleware,adminMiddleware,updateElectionStatus);

// candidate management
router.get("/:electionID/eligible-students",authMiddleware,adminMiddleware,getEligibleStudents);
router.post("/:electionID/candidates",authMiddleware,adminMiddleware,addCandidate);
router.get("/:electionID/candidates",authMiddleware,getCandidatesByElection);
router.delete("/:electionID/candidates/:candidateID",authMiddleware,adminMiddleware,deleteCandidate);
module.exports = router;