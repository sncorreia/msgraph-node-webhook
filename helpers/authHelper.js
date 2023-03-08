// MSAL configuration
// In this file, we configure MSAL 
// MSAL is used to acquire tokens to call MS Graph and perform the desired operations

const msal = require("@azure/msal-node")
const LogLevel = msal.LogLevel;

const dotenv = require("dotenv");
dotenv.config();

const msalConfig = {
    auth: {
        clientId: process.env.OAUTH_CLIENT_ID,
        authority: process.env.OAUTH_AUTHORITY,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
    }
};

const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"]
}

const cca = new msal.ConfidentialClientApplication(msalConfig);

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest
 */
async function getToken(tokenRequest) {
    return await cca.acquireTokenByClientCredential(tokenRequest);
}

module.exports = {
    tokenRequest: tokenRequest,
    getToken: getToken
}
