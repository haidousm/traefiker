const Image = require("../models/Image");
const docker = require("../config/docker");
const io = require("../config/socket");

const launchService = async (service) => {
    const image = await Image.findById(service.image);
    const fullImageName = `${
        image.repository === "_" ? "" : `${image.repository}/`
    }${image.name}:${image.tag}`;
    docker.pull(fullImageName, (err, stream) => {
        if (err) {
            console.log(fullImageName);
            console.error(err);
        } else {
            docker.modem.followProgress(
                stream,
                async () => {
                    await launchContainer(service, fullImageName);
                },
                (chunk) => {
                    const notification = {
                        route: "launchService",
                        chunk,
                    };
                    io.sockets.emit("notifications", notification);
                }
            );
        }
    });
};

const launchContainer = async (service, fullImageName) => {
    const container = await docker.createContainer({
        Image: fullImageName,
        name: `traefiker_${service.name}`,
    });

    service.dockerId = container.id;
    await service.save();
    await container.start();
};

module.exports = launchService;
