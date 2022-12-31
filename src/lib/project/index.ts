import { QuestionCollection } from "inquirer";
import { QuestionType } from "../prompts.js";
import { ParseProjectParamType } from "../types.js";
import { parseNextJSProject } from "./nextjs.js";
import { parseNodeProject } from "./node.js";
import { parseReactProject } from "./react.js";

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

export const parseProject = (params: ParseProjectParamType) => {
    const { project, language } = params;
    switch (project) {
        case ProjectType.NODE: {
            return parseNodeProject(params);
        }
        case ProjectType.REACT: {
            return parseReactProject(params);
        }
        case ProjectType.NEXTJS: {
            return parseNextJSProject(params);
        }
        default:
            throw new Error(`${project} is not implemented yet.`);
    }
};
