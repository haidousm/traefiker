const express = require("express");
const app = express();
const YAML = require("yaml");
const fs = require("fs");
const { createService, addHostname } = require("./utils");

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("nothing to see here");
});

app.get("/yaml", (req, res) => {
    const dockerComposeFile = fs.readFileSync(
        __dirname + "/../test.yaml",
        "utf8"
    );
    const dockerCompose = YAML.parse(dockerComposeFile);

    const serviceName = "test";
    const imageName = "test";
    const hostname = "test.com/shell";

    const service = createService(serviceName, imageName);
    addHostname(serviceName, service, hostname);

    dockerCompose.services[serviceName] = service;

    const portfolio = dockerCompose.services["portfolio"];
    addHostname("portfolio", portfolio, "portfolio.com");
    dockerCompose.services["portfolio"] = portfolio;
    res.send(dockerCompose);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
