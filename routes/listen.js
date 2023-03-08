const { notificationHandler } = require("../helpers/notificationHandler");
const logger = require("../helpers/consoleLogger")

const router = require("express").Router();

// POST /listen
// This is the notification endpoint MS Graph will send notifications to
router.post("/", async (req, res) => {
    logger.consoleLogger("Request received on: POST /listen")

    // This is for the initial validation when creating the subscription
    if (req.query && req.query.validationToken) {
        res.set('Content-Type', 'text/plain');
        res.send(req.query.validationToken);
        return;
    }

    console.log(req.body);

    // For loop to handle the several notifications
    for (let i = 0; i < req.body.value.length; i++) {

        const notification = req.body.value[i];

        if (notification.clientState == process.env.SUBSCRIPTION_CLIENT_STATE) {
            logger.consoleLogger("State is valid!");
            notificationHandler(notification);
        }

    }

    // Send the 202 back to MS Graph
    res.status(202).send();
    logger.consoleLogger("202 sent back to MS Graph")
    return;
})

module.exports = router;