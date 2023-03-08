const express = require("express")
const dotenv = require("dotenv");
const aliveRouter = require("./routes/alive")
const listenRouter = require("./routes/listen")

const app = express();
dotenv.config();

app.use(express.json());

// Set up routers
app.use("/alive", aliveRouter);
app.use("/listen", listenRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on Port ${process.env.PORT}`)
})
