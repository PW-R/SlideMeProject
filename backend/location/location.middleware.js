//middleware
exports.validateLocationQuery = (req, res, next) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).json({ message: "Both start and end location are required." });
    }
    next(); 
};
