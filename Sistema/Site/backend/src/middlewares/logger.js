const express = require('express');

const requestLogger = (req, res, next) => {
    res.on('error', (e) => {
        console.log(e)
    })
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(`HTTP Log => Method:${req.method}, Path:${req.path}, Status:${res.statuscode} Exec:${elapsed}ms`)
    })
    next();
}
module.exports = requestLogger;