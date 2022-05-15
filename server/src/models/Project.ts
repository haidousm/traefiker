import mongoose from "mongoose";
import ServiceModel from "./Service";

export interface Internal_ProjectDocument {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    services: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
}

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    services: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

projectSchema.pre(
    "remove",
    async function (this: Internal_ProjectDocument, next) {
        const services = await ServiceModel.find({ project: this._id });
        for (const service of services) {
            const defaultProject = await ProjectModel.findOne({
                name: "default",
            }).exec();
            if (!defaultProject) {
                throw new Error("Default project not found");
            }
            defaultProject.services.push(service._id);
            await defaultProject.save();
            service.project = defaultProject._id;
            await service.save();
        }
        next();
    }
);

const ProjectModel = mongoose.model<Internal_ProjectDocument>(
    "Project",
    projectSchema
);
export default ProjectModel;
