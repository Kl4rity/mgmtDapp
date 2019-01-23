module.exports = (req, res, message = "OK") => {
    res.status(200);
    res.send(message);
}
