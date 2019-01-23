module.exports = (req, res, message = "An error occured. Please try again later.") => {
    res.status(500);
    res.send(message);
}