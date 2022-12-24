import { QuestionCollection } from "inquirer";
import { QuestionType } from "../prompts.js";

export const ProjectType = {
    NODE: "NODE",
    EXPRESS: "EXPRESS",
    REACT: "REACT",
    NEXTJS: "NEXTJS",
} as const;
export type ProjectType = keyof typeof ProjectType;

export const ProjectTypeOpts = {
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
export type ProjectTypeOpts = typeof ProjectTypeOpts;

export const projectPrompt: QuestionCollection = {
    message: "Select project",
    name: QuestionType.PROJECT,
    type: "list",
    choices: Object.values(ProjectTypeOpts),
};
