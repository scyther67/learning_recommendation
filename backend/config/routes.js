const express = require('express');
const router = express.Router();

const Test = require('../api/routes/test');

router.get('/test/test', Test.TestMessage);
router.post('/test/resourceAccess', Test.ResourceAccess);
module.exports = router;