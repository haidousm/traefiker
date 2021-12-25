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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.json());
app.use("/containers", require("./routes/containers").router);

app.get("/", (req, res) => {
    res.render("pages/dashboard", {
        containers: require("./routes/containers").getAllContainers(),
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
