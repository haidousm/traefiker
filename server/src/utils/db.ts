import { PrismaClient } from "@prisma/client";
import { io } from "../utils/socket";

const prisma = new PrismaClient();
prisma.$use(async (params, next) => {
    const result = await next(params);
    if (params.model === "Service") {
        if (params.action === "create" || params.action === "update") {
            const name = result.name;
            const status = result.status;
            if (io.sockets) {
                io.sockets.emit("status", {
                    name,
                    status,
                });
            }
        }
    }
    return result;
});
export default prisma;
