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
    hosts: {
        type: [String],
        required: true,
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
        unique: true,
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

    const middlewareLabel = getMiddlewareLabel(this, [
        ...pathPrefixMiddlewareLabels,
    ]);

    return [hostLabel, ...pathPrefixMiddlewareLabels, middlewareLabel];
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

const getMiddlewareLabel = (service, middlewares) => {
    const regex = /traefik\.http.middlewares\.(.+?)\..*/;
    const middlewareNames = middlewares.map((middleware) => {
        const matches = regex.exec(middleware);
        return matches[1];
    });
    return `traefik.http.routers.${
        service.name
    }.middlewares=${middlewareNames.join(",")}`;
};

module.exports = mongoose.model("Service", ServiceSchema);
