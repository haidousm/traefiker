const Docker = require("dockerode");
const io = require("../config/socket");

const Image = require("../models/Image");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

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
                        method: "launchService",
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
        name: service.tag,
    });

    service.dockerId = container.id;
    await service.save();
    await container.start();
};

module.exports = { docker, launchService };
