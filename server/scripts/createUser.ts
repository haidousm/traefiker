import { createUser, findUser } from "../src/services/user.service";
import connectDB from "../src/utils/db";
import logger from "../src/utils/logger";

const createAdminUser = async (username: string, password: string) => {
    const userAlreadyExists = await findUser({ username });
    if (userAlreadyExists) {
        await userAlreadyExists.remove();
    }
    await createUser(username, password);
};

(async () => {
    if (process.argv.length != 4) {
        console.log("Usage: yarn create-user <username> <password>");
        process.exit(1);
    }

    await connectDB();
    const username = process.argv[2];
    const password = process.argv[3];

    await createAdminUser(username, password);
    logger.info(`Created admin user ${username}`);
    process.exit(0);
})();
