const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "./config/config.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/containers", require("./routes/containers"));

app.get("/", (req, res) => {
    res.send("nothing to see here");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
