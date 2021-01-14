const express =  require('express');
const {load, run} = require('./config/mount');
const path = require('path');

let app = express();

async function runApp() {
    app = await load(app)
    app.get('*', function (req, res) {
        console.log("in frontend");
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    run(app);
}

runApp();