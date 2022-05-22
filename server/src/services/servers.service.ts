import ServerModel from "../models/Server";
import { Internal_ServerDocument } from "../models/Server";
import { Server } from "../types/Server";

export const findAllServers = async () => {
    const internalServers: Internal_ServerDocument[] = await ServerModel.find(
        {}
    ).exec();
    return internalServers.map((internalServer) =>
        internalServerToServer(internalServer)
    );
};
export const findServerByName = async (name: string) => {
    const internalServer = await ServerModel.findOne({ name }).exec();
    if (!internalServer) {
        return null;
    }
    return internalServerToServer(internalServer);
};

export const saveServer = async (Server: Server) => {
    const internalServer = await ServerModel.findById(Server.id).exec();
    if (!internalServer) {
        throw new Error("server not found");
    }
    internalServer.name = Server.name;
    await internalServer.save();
    return internalServerToServer(internalServer);
};

export const createServer = async (name: string) => {
    if (await findServerByName(name)) {
        throw new Error(`server ${name} already exists`);
    }
    const internalServer = await new ServerModel({
        name: name,
    }).save();
    return internalServerToServer(internalServer);
};

export const deleteServerByName = async (name: string) => {
    const internalServer = await ServerModel.findOne({ name }).exec();
    if (!internalServer) {
        throw new Error("Server not found");
    }
    await internalServer.remove();
};

const internalServerToServer = (
    internalServer: Internal_ServerDocument
): Server => {
    return {
        id: internalServer._id.toString(),
        name: internalServer.name,
        host: internalServer.host,
        port: internalServer.port,
    };
};
