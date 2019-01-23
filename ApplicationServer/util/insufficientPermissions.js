module.exports = (req, res, message = "You do not have the necessary permission to execute this request.")=>{
    res.status(401);
    res.send(message);
}