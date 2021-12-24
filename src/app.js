const express = require("express");
const app = express();
const YAML = require("yaml");
const fs = require("fs");
const { createService, addHostname } = require("./utils");

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

const FILE_PATH = `${__dirname}/assets/docker-compose.yaml`;

app.get("/", (req, res) => {
    res.send("nothing to see here");
});

app.get("/containers", (req, res) => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(
            FILE_PATH,
            YAML.stringify({
                version: "3",
                networks: {
                    web: {
                        external: true,
                    },
                    internal: {
                        external: false,
                    },
                },
                services: {},
            })
        );
    }

    const yaml = fs.readFileSync(FILE_PATH, "utf8");
    const data = YAML.parse(yaml);
    const services = Object.keys(data.services);
    const containers = services.map((service) => {
        const { image, labels } = data.services[service];
        const hostLabels = labels.filter((label) => label.includes("Host"))[0];
        const labelString = hostLabels.split("=")[1];
        let hosts = labelString.includes("||")
            ? labelString.split("||")
            : [labelString];

        hosts = hosts.map((hostString) => {
            let hostname = hostString
                .split("Host(`")
                .pop()
                .split("`)")
                .shift()
                .trim();

            if (hostString.includes("PathPrefix")) {
                hostname =
                    hostname +
                    hostString
                        .split("PathPrefix(`")
                        .pop()
                        .split("`)")
                        .shift()
                        .trim();
            }
            return hostname;
        });

        return {
            name: service,
            image,
            hosts,
        };
    });
    res.send(containers);
});

app.post("/containers/host", (req, res) => {
    const { name, hostname } = req.body;
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
