

const errorHandler = (err, req, res, next) => {
    console.log(`${err.name}: ${err.message}`)
    res.status(500).send(err.message);
};

module.exports = errorHandler;
