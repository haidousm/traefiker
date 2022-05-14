import { deleteAllImages } from "../services/images.service";
import { deleteAllContainers } from "../services/services.service";
import { getAllContainers } from "../../libs/docker";

export const useDockerAsSourceOfTruth = async () => {
    await deleteAllContainers();
    await deleteAllImages();

    const containers = await getAllContainers();
    console.log(containers);
    // await Service.deleteMany({});
    // await Image.deleteMany({});
    // await createImages();
    // const images = await Image.find();
    // await createContainers(images);
};
