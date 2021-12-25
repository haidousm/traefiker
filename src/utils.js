const YAML = require("yaml");
const fs = require("fs");

const createDockerFile = (filepath) => {
    fs.writeFileSync(
        filepath,
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
};

const getDataFromFile = (filepath) => {
    const yaml = fs.readFileSync(filepath, "utf8");
    return YAML.parse(yaml);
};

const createService = (image) => {
    const service = {
        image,
        labels: [],
        networks: ["web", "internal"],
    };

    return service;
};

const getHostsFromService = (service) => {
    const labels = service.labels || [];
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
    return hosts;
};

const transformHostsToLabels = (name, hosts) => {
    const labels = [];
    hosts.forEach((host) => {
        const path = host.includes("/") ? host.split("/")[1] : "";
        labels.push(
            `traefik.http.routers.${name}.rule=${formatHostAsLabel(
                host.split("/")[0],
                path
            )}`
        );

        if (path !== "") {
            labels.push(
                `traefik.http.middlewares.${name}-prefix.stripprefix.prefixes=/${path}`
            );
            labels.push(
                `traefik.http.routers.${name}.middlewares=${name}-prefix`
            );
        }
    });
    return labels;
};

const addHostToExistingLabels = (name, service, host) => {
    const labels = service.labels;
    const hostLabel = labels.filter((label) => label.includes("Host"))[0];

    const path = host.includes("/") ? host.split("/")[1] : "";
    const newHostLabel = `${hostLabel} || ${formatHostAsLabel(
        host.split("/")[0],
        path
    )}`;
    labels.splice(labels.indexOf(hostLabel), 1, newHostLabel);
    if (path !== "") {
        labels.push(
            `traefik.http.middlewares.${name}-prefix.stripprefix.prefixes=/${path}`
        );
        labels.push(`traefik.http.routers.${name}.middlewares=${name}-prefix`);
    }
    return labels;
};

const formatHostAsLabel = (host, path) => {
    return path !== ""
        ? `(Host(\`${host}\`) && PathPrefix(\`/${path}\`))`
        : `Host(\`${host}\`)`;
};

module.exports = {
    createDockerFile,
    getDataFromFile,
    createService,
    getHostsFromService,
    transformHostsToLabels,
    addHostToExistingLabels,
};
