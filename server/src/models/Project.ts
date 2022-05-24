import mongoose from "mongoose";
import { Project } from "../types/Project";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

// projectSchema.pre(
//     "remove",
//     async function (this: Internal_ProjectDocument, next) {
//         const services = await ServiceModel.find({ project: this._id });
//         for (const service of services) {
//             const defaultProject = await ProjectModel.findOne({
//                 name: "default",
//             }).exec();
//             if (!defaultProject) {
//                 throw new Error("Default project not found");
//             }
//             service.project = defaultProject._id;
//             await service.save();
//         }
//         next();
//     }
// );

const ProjectModel = mongoose.model<Project>("Project", projectSchema);
export default ProjectModel;
