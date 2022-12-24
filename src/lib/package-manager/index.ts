import { QuestionCollection } from "inquirer";
import { QuestionType } from "../prompts.js";
import { PromptTypeOpts } from "../types.js";

export const PackageManagerType = {
    NPM: "NPM",
    YARN: "YARN",
} as const;
export type PackageManagerType = keyof typeof PackageManagerType;

const PackageManagerTypeOpts: PromptTypeOpts<PackageManagerType> = {
    NPM: {
        name: "NPM",
        value: "NPM",
    },
    YARN: {
        name: "yarn v1.x",
        value: "YARN",
    },
} as const;

export const packageManagerPrompt: QuestionCollection = {
    message: "Select package manager",
    name: QuestionType.PACKAGE_MANAGER,
    type: "list",
    choices: Object.values(PackageManagerTypeOpts),
};

export const packageInstallCmd: {
    [P in PackageManagerType]: {
        install: (packages: string) => string;
        installDev: (packages: string) => string;
    };
} = {
    NPM: {
        install: (packages: string) => `npm install --save ${packages}`,
        installDev: (packages: string) => `npm install -D ${packages}`,
    },
    YARN: {
        install: (packages: string) => `yarn add ${packages}`,
        installDev: (packages: string) => `yarn add -D ${packages}`,
    },
} as const;
