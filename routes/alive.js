// Router just to check if the API is alive

const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("Request received on: GET /alive")
    res.send("I am alive")
    return;
})

module.exports = router;