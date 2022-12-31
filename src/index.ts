#!/usr/bin/env ts-node

import { join } from "path";
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import { languagePrompt, modulesPrompt, QuestionType } from "./lib/prompts.js";
import { parseProject, projectPrompt } from "./lib/project/index.js";
import {
    packageManagerPrompt,
    PackageManagerType,
} from "./lib/package-manager/index.js";
import { generate, mkdir, rm } from "./lib/utils.js";
import { parseModule } from "./lib/module/index.js";

// Main
const argv = yargs(hideBin(process.argv))
    .usage(
        "$0 <path>",
        "A template builder for popular JavaScript/TypeScript projects.",
        (yargs) => {
            return yargs.positional("path", {
                describe: "The path to build the project",
                type: "string",
            });
        }
    )
    .version(false).argv;

const { path } = (await argv) as typeof argv & { path: string };
const cwdPath = path.match(/^[\/\\]/) ? path : join(process.cwd(), path);
const exists = fs.existsSync(cwdPath);

if (exists) {
    const answer = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            default: false,
            message: `This will delete everything in ${cwdPath}. Proceed?`,
        },
    ]);

    if (answer.confirm === false) {
        process.exit(1);
    }
}

const answers = await inquirer.prompt<Record<QuestionType, any>>([
    languagePrompt,
    projectPrompt,
    modulesPrompt,
]);

const { LANGUAGE, MODULES, PROJECT } = answers;

const PACKAGE_MANAGER = process.env.npm_config_user_agent?.includes("yarn")
    ? PackageManagerType.YARN
    : PackageManagerType.NPM;

parseProject({
    language: LANGUAGE,
    project: PROJECT,
    cwdPath,
    manager: PACKAGE_MANAGER,
    modules: MODULES,
});

parseModule({
    language: LANGUAGE,
    modules: MODULES,
});

await generate({ cwdPath, managerType: PACKAGE_MANAGER });
