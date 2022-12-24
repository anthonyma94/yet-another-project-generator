import inquirer, { Question, QuestionCollection } from "inquirer";
import { ProjectType } from "./project/index.js";

export const QuestionType = {
    LANGUAGE: "LANGUAGE",
    PROJECT: "PROJECT",
    MODULES: "MODULES",
} as const;
export type QuestionType = keyof typeof QuestionType;

export const LanguageType = {
    JS: {
        name: "JavaScript",
        value: "JS",
    },
    TS: {
        name: "TypeScript",
        value: "TS",
    },
} as const;
export type LanguageType = keyof typeof LanguageType;

export const ModulesType = {
    PRETTIER: {
        name: "Prettier",
        value: "PRETTIER",
    },
    ESLINT: {
        name: "ESLint",
        value: "ESLINT",
    },
} as const;
export type ModulesType = keyof typeof ModulesType;

export const languagePrompt: QuestionCollection = {
    message: "JavaScript or TypeScript?",
    name: QuestionType.LANGUAGE,
    type: "list",
    default: "TS",
    choices: Object.values(LanguageType),
};

export const projectPrompt: QuestionCollection = {
    message: "Select project",
    name: QuestionType.PROJECT,
    type: "list",
    choices: Object.values(ProjectType),
};

export const modulesPrompt: QuestionCollection = {
    message: "Select modules",
    name: QuestionType.MODULES,
    type: "checkbox",
    choices: Object.values(ModulesType),
};
