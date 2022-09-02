import { Prisma } from "@prisma/client";

const populatedService = Prisma.validator<Prisma.ServiceArgs>()({
    include: {
        image: true,
        project: true,
        containerInfo: true,
        environmentVariables: true,
        redirects: true,
    },
});

export type PopulatedService = Prisma.ServiceGetPayload<
    typeof populatedService
>;
