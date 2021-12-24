const express = require("express");
const app = express();

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("nothing to see here");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
