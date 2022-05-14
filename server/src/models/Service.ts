import mongoose, { HydratedDocument } from "mongoose";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import { EnvironmentVariable } from "../types/EnvironmentVariable";
import { Redirect } from "../types/Redirect";
import { io } from "../utils/socket";
export interface Internal_ServiceDocument {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    status: ServiceStatus;
    image: mongoose.Schema.Types.ObjectId;
    network?: string;
    hosts: string[];
    environmentVariables: EnvironmentVariable[];
    redirects: Redirect[];
    containerId?: string;
    internalName?: string;
    order: number;
    createdAt: Date;
}

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        default: ServiceStatus.PULLING,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true,
    },
    network: {
        type: String,
        required: false,
    },
    hosts: {
        type: [String],
        required: true,
    },
    environmentVariables: {
        type: [{ key: String, value: String }],
        default: [],
        required: true,
    },
    redirects: {
        type: [{ from: String, to: String }],
        default: [],
        required: true,
    },
    containerId: {
        type: String,
        required: false,
    },
    internalName: {
        type: String,
        required: false,
    },
    order: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

serviceSchema.post(
    "save",

    function (
        this: HydratedDocument<Internal_ServiceDocument>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _res: any,
        next
    ) {
        const status = this.status;
        if (io.sockets) {
            io.sockets.emit("status", {
                name: this.name,
                status: ServiceStatus[status],
            });
        }
        next();
    }
);

const ServiceModel = mongoose.model<Internal_ServiceDocument>(
    "Service",
    serviceSchema
);

export default ServiceModel;
