import { createUser, deleteUser, findUser } from "../src/services/user.service";
import logger from "../src/utils/logger";

const createAdminUser = async (username: string, password: string) => {
    const user = await findUser({ username });
    if (user) await deleteUser({ username });
    await createUser(username, password);
};

(async () => {
    if (process.argv.length != 4) {
        console.log("Usage: yarn create-user <username> <password>");
        process.exit(1);
    }

    const username = process.argv[2];
    const password = process.argv[3];

    await createAdminUser(username, password);
    logger.info(`Created admin user ${username}`);
    process.exit(0);
})();
