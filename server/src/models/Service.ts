import mongoose, { HydratedDocument } from "mongoose";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import { EnvironmentVariable } from "../types/EnvironmentVariable";
import { Redirect } from "../types/Redirect";
import { io } from "../utils/socket";
import ProjectModel from "./Project";
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
    project: mongoose.Schema.Types.ObjectId;
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
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

serviceSchema.pre(
    "remove",
    async function (this: Internal_ServiceDocument, next) {
        const project = await ProjectModel.findById(this.project);
        if (project) {
            project.services = project.services.filter(
                (service) => service.toString() !== this._id.toString()
            );
            await project.save();
        }
        next();
    }
);

serviceSchema.pre(
    "save",
    async function (this: Internal_ServiceDocument, next) {
        if (!this.project) {
            // creates the default project if it doesn't exist (backward compatible with pre-project services)
            let defaultProject = await ProjectModel.findOne({
                name: "default",
            }).exec();
            if (!defaultProject) {
                defaultProject = new ProjectModel({ name: "default" });
                await defaultProject.save();
            }
            this.project = defaultProject._id;
            defaultProject.services.push(this._id);
            await defaultProject.save();
        }
        next();
    }
);

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
                status: status,
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
