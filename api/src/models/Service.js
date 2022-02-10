const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["pulling", "created", "running", "stopped"],
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true,
    },
    network: {
        type: String,
        required: false,
        default: "web",
    },
    hosts: {
        type: [String],
        required: true,
    },
    redirects: {
        type: [{ from: String, to: String }],
        required: false,
    },
    environments: {
        type: [{ key: String, value: String }],
        required: false,
        default: [],
    },
    order: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    containerId: {
        type: String,
        required: false,
    },
    tag: {
        type: String,
        required: false,
    },
});

ServiceSchema.set("toJSON", {
    virtuals: true,
});

ServiceSchema.methods.getServiceLabels = function () {
    const hostLabel = transformHostsToLabel(this);
    const pathPrefixMiddlewareLabels = getPathPrefixMiddlewareLabels(this);
    const redirectMiddlewareLabels = getRedirectMiddlewareLabels(this);

    const middlewareLabel = getMiddlewareLabel(this, [
        ...pathPrefixMiddlewareLabels,
        ...redirectMiddlewareLabels,
    ]);

    const labels = [
        ...pathPrefixMiddlewareLabels,
        ...redirectMiddlewareLabels,
        `traefiker.tag=${this.tag}`,
    ];

    if (hostLabel.split("=")[1] && hostLabel.split("=")[1] !== "") {
        labels.push(hostLabel);
    }

    if (hostLabel.split("=")[1] && middlewareLabel.split("=")[1] !== "") {
        labels.push(middlewareLabel);
    }

    return labels;
};

ServiceSchema.methods.getEnvironments = function () {
    const environments = this.environments.map((environment) => {
        return `${environment.key}=${environment.value}`;
    });

    return environments;
};

const transformHostsToLabel = (service) => {
    const label = `traefik.http.routers.${service.name}.rule`;
    const hosts = service.hosts.map((host) => {
        const [hostname, path] = host.split("/");
        const formattedHost = `Host(\`${hostname}\`)`;
        if (path) {
            return `${formattedHost} && PathPrefix(\`/${path}\`)`;
        }
        return formattedHost;
    });
    return `${label}=${hosts.join(" || ")}`;
};

const getPathPrefixMiddlewareLabels = (service) => {
    const hostsWithPaths = service.hosts.filter((host) => host.includes("/"));

    const paths = hostsWithPaths.map((host) => {
        const [_, path] = host.split("/");
        return path;
    });

    return paths.map((path) => {
        return `traefik.http.middlewares.${path}-prefix.stripprefix.prefixes=/${path}`;
    });
};

const getRedirectMiddlewareLabels = (service) => {
    const redirects = service.redirects;
    if (!redirects) {
        return [];
    }
    const labels = [];
    redirects.forEach((redirect, i) => {
        const from = redirect.from;
        const to = redirect.to;
        labels.push(
            `traefik.http.middlewares.${i}-redirect-${service.name}.redirectregex.regex=${from}`,
            `traefik.http.middlewares.${i}-redirect-${service.name}.redirectregex.replacement=${to}`
        );
    });
    return labels;
};

const getMiddlewareLabel = (service, middlewares) => {
    const regex = /traefik\.http.middlewares\.(.+?)\..*/;
    const middlewareNames = middlewares.map((middleware) => {
        const matches = regex.exec(middleware);
        return matches[1];
    });

    const uniqueMiddlewareNames = [...new Set(middlewareNames)];
    return `traefik.http.routers.${
        service.name
    }.middlewares=${uniqueMiddlewareNames.join(",")}`;
};

module.exports = mongoose.model("Service", ServiceSchema);
