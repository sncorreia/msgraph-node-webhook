// Graph Helper
// Here we implement the functions to perform the following operations:
// -- Get devices a user: function getUserDevices
// -- Add devices to a group: function addDevices
// -- Remove devices from a group: function removeDevices

const axios = require("axios");
const { consoleLogger, errorLogger } = require("./consoleLogger");

const dotenv = require("dotenv");
dotenv.config();

/**
 * Function to get the devices of a specific user 
 * @param {string} userId Target user objectId 
 * @param {string} accessToken Valid accessToken
 * @returns {object} devices from the user
 */
const getUserDevices = async (userId, accessToken) => {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    consoleLogger("Getting devices from user")

    try {
        const response = await axios.default.get(`https://graph.microsoft.com/v1.0/users/${userId}/ownedDevices`, options);
        consoleLogger("Devices acquired successfully")
        return response.data;
    } catch (error) {
        errorLogger(error);
        return error;
    }
}

/**
 * Function to add devices to a specific group
 * @param {string} userId 
 * @param {Array} devices 
 * @param {string} accessToken 
 * @returns 
 */
const addDevices = async (userId, devices, accessToken) => {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    consoleLogger(`Adding devices from the user ${userId} to the desired group`)

    devices.forEach(async (device) => {
        const body = {
            "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${device.id}`
        }

        try {
            await axios.default.post(`https://graph.microsoft.com/v1.0/groups/${process.env.DEVICES_GROUP}/members/$ref`, body, options);
            consoleLogger(`Device ${device.id} for user ${userId} added successfully`)
        } catch (error) {
            console.log(error)
            return;
        }
    })
    consoleLogger(`All devices from user ${userId} added successfully`)
    return;
}

/**
 * Function to remove devices from a specific group
 * @param {string} userId 
 * @param {Array} devices 
 * @param {string} accessToken 
 * @returns 
 */
const removeDevices = async (userId, devices, accessToken) => {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    consoleLogger(`Removing devices from the user ${userId} to the desired group`)

    devices.forEach(async (device) => {
        try {
            await axios.default.delete(`https://graph.microsoft.com/v1.0/groups/${process.env.DEVICES_GROUP}/members/${device.id}/$ref`, options);
            consoleLogger(`Device ${device.id} from user ${userId} removed successfully`)
        } catch (error) {
            console.log(error)
            return
        }
    })

    consoleLogger(`All devices from user ${userId} removed successfully`)

    return;
}

module.exports = {
    getUserDevices: getUserDevices,
    addDevices: addDevices,
    removeDevices: removeDevices
}