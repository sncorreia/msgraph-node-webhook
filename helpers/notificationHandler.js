// Notification handler
// This is the function that will handle the notification

const authHelper = require("./authHelper")
const logger = require("./consoleLogger")
const { getUserDevices, addDevices, removeDevices } = require("./graphHelper")

const notificationHandler = async (notification) => {
    logger.consoleLogger("Reached the notificationHandler")
    console.log(notification.resourceData['members@delta'])

    const changedMembers = notification.resourceData['members@delta'];

    // A notification can bring several members, so we need to iterate on each one 
    changedMembers.forEach(async (member) => {
        const userId = member.id;
        logger.consoleLogger(`This is the userId being targetted: ${userId}`)

        // const to check if the user was added or removed from the group
        const isRemoved = member.hasOwnProperty('@removed');

        try {
            // Getting an accessToken with MSAL 
            const authResponse = await authHelper.getToken(authHelper.tokenRequest);

            // Getting the list of devices of the userId
            const devicesResponse = await getUserDevices(userId, authResponse.accessToken);
            const devices = devicesResponse.value;

            if (isRemoved) {
                // Removing the devices to the group
                await removeDevices(userId, devices, authResponse.accessToken);
            } else {
                // Adding the devices to the group 
                await addDevices(userId, devices, authResponse.accessToken);
            }
        } catch (error) {
            console.log(error)
        }
    });

}

module.exports = {
    notificationHandler
}