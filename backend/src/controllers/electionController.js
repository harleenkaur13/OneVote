const Election = require("../models/Election");
const Candidate = require("../models/Candidate");

const createElection = async (req, res, next) => {
    try {
        const { title, description, startDate, endDate } = req.body;

        // Validate input
        if (!title || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        // Validate dates
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: "End date must be after start date.",
            });
        }

        const election = await Election.create({
            title,
            description,
            startDate,
            endDate,
        });

        res.status(201).json({
            success: true,
            message: "Election created successfully.",
            election,
        });

    } catch (error) {
        next(error);
    }
};

const getAllElections = async (req, res, next) => {
    try {
        const elections = await Election.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: elections.length,
            elections,
        });

    } catch (error) {
        next(error);
    }
};

const getActiveElection = async (req, res, next) => {
    try {
        const election = await Election.findOne({
            status: "Active",
        });

        if (!election) {
            return res.status(404).json({
                success: false,
                message: "No active election found.",
            });
        }

        res.status(200).json({
            success: true,
            election,
        });

    } catch (error) {
        next(error);
    }
};

const updateElectionStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        // Validate status
        if (!["Upcoming", "Active", "Closed"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status.",
            });
        }

        // Business Rule
        if (status === "Active") {
            const candidateCount = await Candidate.countDocuments({
                election: id,
            });

            if (candidateCount < 2) {
                return res.status(400).json({
                    success: false,
                    message:
                        "At least two candidates are required to activate an election.",
                });
            }
            const activeElection = await Election.findOne({
                status: "Active",
            });
            if (
                activeElection &&
                activeElection._id.toString() !== id
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Another election is already active.",
                });
            }
        }

        const election = await Election.findByIdAndUpdate(
            id,
            { status },
            { returnDocument: "after" }
        );

        if (!election) {
            return res.status(404).json({
                success: false,
                message: "Election not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Election status updated.",
            election,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createElection,
    getAllElections,
    getActiveElection,
    updateElectionStatus,
};