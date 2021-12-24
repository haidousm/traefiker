const createService = (name, image) => {
    return {
        image: image,
        labels: [],
        networks: ["web", "internal"],
    };
};

const addHostname = (name, service, hostname) => {
    const labels = service.labels || [];
    const labelIndex = labelExists(
        service,
        `traefik.http.routers.${name}.rule`
    );

    let path = "";

    if (hostname.includes("/")) {
        const hostnameParts = hostname.split("/");
        hostname = hostnameParts[0];
        path = "/" + hostnameParts[1];
    }

    if (labelIndex !== -1) {
        const label = labels[labelIndex];
        labels[labelIndex] = label.concat(
            path !== ""
                ? ` || (Host(\`${hostname}\`) && PathPrefix(\`${path}\`))`
                : ` || Host(\`${hostname}\`)`
        );
    } else {
        labels.push(
            path !== ""
                ? `(Host(\`${hostname}\`) && PathPrefix(\`${path}\`))`
                : `Host(\`${hostname}\`)`
        );
    }

    if (path !== "") {
        labels.push(
            `traefik.http.middlewares.${name}-prefix.stripprefix.prefixes=${path}`
        );
        labels.push(`traefik.http.routers.${name}.middlewares=${name}-prefix`);
    }
};

const labelExists = (service, label) => {
    const labels = service.labels || [];
    return labels.findIndex((l) => l.includes(label));
};

module.exports = {
    createService,
    addHostname,
};
