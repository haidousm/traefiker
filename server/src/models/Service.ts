import mongoose, { HydratedDocument, Schema } from "mongoose";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import { Service } from "../types/Service";

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
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true,
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
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
    },
    order: {
        type: Number,
        required: true,
    },
    dockerInfo: {
        type: [
            {
                network: String,
                containerName: String,
                containerId: String,
            },
        ],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// serviceSchema.pre(
//     "save",
//     async function (this: Internal_ServiceDocument, next) {
//         if (!this.project) {
//             // creates the default project if it doesn't exist (backward compatible with pre-project services)
//             let defaultProject = await ProjectModel.findOne({
//                 name: "default",
//             }).exec();
//             if (!defaultProject) {
//                 defaultProject = new ProjectModel({ name: "default" });
//                 await defaultProject.save();
//             }
//             this.project = defaultProject._id;
//         }
//         next();
//     }
// );

// serviceSchema.post(
//     "save",
//     function (
//         this: HydratedDocument<Internal_ServiceDocument>,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         _res: any,
//         next
//     ) {
//         const status = this.status;
//         if (io.sockets) {
//             io.sockets.emit("status", {
//                 name: this.name,
//                 status: status,
//             });
//         }
//         next();
//     }
// );

const ServiceModel = mongoose.model<Service>("Service", serviceSchema);

export default ServiceModel;
