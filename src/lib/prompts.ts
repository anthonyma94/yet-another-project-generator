import inquirer, { Question, QuestionCollection } from "inquirer";
import { ProjectType, ProjectTypeOpts } from "./project/index.js";
import { PromptTypeOpts } from "./types.js";

export const QuestionType = {
    LANGUAGE: "LANGUAGE",
    PROJECT: "PROJECT",
    MODULES: "MODULES",
    PACKAGE_MANAGER: "PACKAGE_MANAGER",
} as const;
export type QuestionType = keyof typeof QuestionType;

export const LanguageType = {
    JS: "JS",
    TS: "TS",
} as const;
export type LanguageType = keyof typeof LanguageType;

const LanguageTypeOpts: PromptTypeOpts<LanguageType> = {
    JS: {
        name: "JavaScript",
        value: "JS",
    },
    TS: {
        name: "TypeScript",
        value: "TS",
    },
} as const;
export type LanguageTypeOpts = typeof LanguageTypeOpts;

export const ModulesType = {
    PRETTIER: "PRETTIER",
    ESLINT: "ESLINT",
} as const;
export type ModulesType = keyof typeof ModulesType;

const ModuleTypeOpts: PromptTypeOpts<ModulesType> = {
    PRETTIER: {
        name: "Prettier",
        value: "PRETTIER",
    },
    ESLINT: {
        name: "ESLint",
        value: "ESLINT",
    },
} as const;

export const languagePrompt: QuestionCollection = {
    message: "JavaScript or TypeScript?",
    name: QuestionType.LANGUAGE,
    type: "list",
    default: "TS",
    choices: Object.values(LanguageTypeOpts),
};

export const modulesPrompt: QuestionCollection = {
    message: "Select modules",
    name: QuestionType.MODULES,
    type: "checkbox",
    choices: Object.values(ModuleTypeOpts),
};
