const express = require('express');
const async = require('async')

const app = express();

const PORT = 3000;

const sleep = (ms) => {
    const future = Date.now() + ms
    while (Date.now() < future);
}

const await_data  = (callback) => {
    async.series([
        (done1) => setTimeout(done1, 1000),
        (done1) => async.parallel([
            (done2) => setTimeout(done2,  1000),
            (done2) => setTimeout(done2, 1000),
            (done2) => setTimeout(done2, 1000),
            (done2) => setTimeout(done2, 1000),
            (done2) => setTimeout(done2, 1000)
        ], done1)
    ], callback)
}

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
    sleep(50);
    await_data(function () {
        res.send('Hello World');
    })
});