// weatherRoutes.js
const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
    res.send('Weather API endpoint');
});

// Export the router
module.exports = router;
