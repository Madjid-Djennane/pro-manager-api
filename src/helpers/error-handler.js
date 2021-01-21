module.exports = function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') {
        // Don't log stack in test env
        // eslint-disable-next-line no-console
        console.dir(err, { depth: null })
    }

    res.status(err.statusCode || err.code || err.status || 500).json(
        {
            ...err,
            status: err.status,
            message: err.message,
            stack: err.stack
        }
    )
}
