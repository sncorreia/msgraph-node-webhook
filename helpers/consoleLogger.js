// Simple console logger to track what is happening in the console
// Feel free to implement your own logging mechanism

const consoleLogger = (message) => {
    console.log("[" + new Date().toString() + "]: " + message);
}

const errorLogger = (error) => {
    console.log("[" + new Date().toString() + "] ERROR!!: " + error);
}

module.exports = {
    consoleLogger: consoleLogger,
    errorLogger: errorLogger
}