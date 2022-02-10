const Image = require("../models/Image");
const Service = require("../models/Service");
const { deleteContainer } = require("./docker");

const getOrCreateImage = async (resolvedName) => {
    const { repository, imageName, tag } = parseResolvedName(resolvedName);
    if (!imageName || !tag || !repository) {
        return -1;
    }

    let image = await Image.findOne({
        repository,
        name: imageName,
        tag,
    });

    if (!image) {
        image = new Image({
            repository,
            name: imageName,
            tag,
            resolvedName,
        });
        await image.save();
    }

    return image;
};

const createService = async (serviceRequest, image) => {
    const service = new Service({
        name: `traefiker_${serviceRequest.name}`,
        status: "pulling",
        image: image._id,
        hosts: serviceRequest.hosts,
        redirects: serviceRequest.redirects,
        order: serviceRequest.order,
        tag: serviceRequest.name,
    });

    const oldService = await Service.findOne({
        name: service.name,
    });

    if (oldService) {
        if (oldService.containerId) {
            await deleteContainer(oldService);
        }
        await oldService.remove();
    }
    await service.save();
    return service;
};

const parseResolvedName = (resolvedName) => {
    const regex = /^(.+)\/(.+):(.+)$|^(.+):(.+)$|^(.+)\/(.+)|^(.+)$/;
    const match = regex.exec(resolvedName);

    const repository = match[1] ?? match[6] ?? "_";
    const imageName = match[2] ?? match[4] ?? match[7] ?? match[8];
    const tag = match[3] ?? match[5] ?? "latest";

    return {
        repository,
        imageName,
        tag,
    };
};

const parseHostLabels = (labels) => {
    const hosts = [];
    labels.forEach((label) => {
        const regex = /traefik\.http\.routers\..+\.rule=([\s\S]+)/;
        const match = regex.exec(label);
        if (match) {
            const _hosts = match[1].split("||").map((host) => host.trim());
            _hosts.forEach((host) => {
                const hostReg =
                    /(?:Host\(`(.+)`\) *&& *PathPrefix\(`(.+)`\))|Host\(`(.+)`\)/;
                const hostMatch = hostReg.exec(host);
                if (hostMatch) {
                    if (hostMatch[1]) {
                        hosts.push(`${hostMatch[1]}${hostMatch[2]}`);
                    } else {
                        hosts.push(hostMatch[3]);
                    }
                }
            });
        }
    });
    return hosts;
};

const parseRedirectLabels = (labels) => {
    const redirects = [];

    const matchingLabels = {};

    labels.forEach((label) => {
        const redirectRegex = /traefik\.http\.middlewares\.(.+)\.redirectregex/;
        const redirectMatch = redirectRegex.exec(label);
        if (redirectMatch) {
            const redirectName = redirectMatch[1];
            if (!matchingLabels[redirectName]) {
                matchingLabels[redirectName] = [label];
            } else {
                matchingLabels[redirectName].push(label);
            }
        }
    });

    Object.keys(matchingLabels).forEach((redirectName) => {
        const redirectLabels = matchingLabels[redirectName];
        const fromLabel = redirectLabels.find((label) =>
            label.includes("redirectregex.regex")
        );
        const toLabel = redirectLabels.find((label) =>
            label.includes("redirectregex.replacement")
        );

        const from = fromLabel.split("=")[1];
        const to = toLabel.split("=")[1];

        if (from && to) {
            redirects.push({
                from,
                to,
            });
        }
    });

    return redirects;
};

const parseTraefikerLabels = (labels) => {
    const tagLabel = labels.find((label) => label.includes("traefiker.tag"));
    const tag = tagLabel ? tagLabel.split("=")[1] : "";

    return {
        tag,
    };
};

module.exports = {
    getOrCreateImage,
    createService,
    parseResolvedName,
    parseHostLabels,
    parseRedirectLabels,
    parseTraefikerLabels,
};
