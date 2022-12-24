export const ProjectType = {
    NODE: {
        name: "Node.JS",
        value: "NODE",
    },
    EXPRESS: {
        name: "ExpressJS",
        value: "EXPRESS",
    },
    REACT: {
        name: "React",
        value: "REACT",
    },
    NEXTJS: {
        name: "NextJS",
        value: "NEXTJS",
    },
} as const;
export type ProjectType = keyof typeof ProjectType;
