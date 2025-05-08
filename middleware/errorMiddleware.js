const errorMiddleware = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({
        success: false,
        message: 'somehing is error',
        err,
    }
    )
}

export default errorMiddleware