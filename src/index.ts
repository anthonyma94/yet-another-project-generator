#!/usr/bin/env node

import { join } from "path";
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import { languagePrompt, modulesPrompt, QuestionType } from "./lib/prompts.js";
import { projectPrompt, ProjectType } from "./lib/project/index.js";
import { packageManagerPrompt } from "./lib/package-manager/index.js";
import { mkdir, rm } from "./lib/utils.js";
import { parseProject } from "./lib/project/node.js";

const gitignoreContent = `
node_modules
dist
`;

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
let deleteConfirmed = false;

if (exists) {
    const answer = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            default: false,
            message: "This will delete everything in the directory. Proceed?",
        },
    ]);

    if (answer.confirm) {
        deleteConfirmed = true;
    } else {
        process.exit(1);
    }
}

const answers = await inquirer.prompt<Record<QuestionType, any>>([
    languagePrompt,
    packageManagerPrompt,
    projectPrompt,
    modulesPrompt,
]);

if (deleteConfirmed) {
    await rm(cwdPath, { recursive: true, force: true });
}

await mkdir(cwdPath);

const { LANGUAGE, MODULES, PACKAGE_MANAGER, PROJECT } = answers;

if (PROJECT === ProjectType.NODE) {
    await parseProject({
        language: LANGUAGE,
        manager: PACKAGE_MANAGER,
        absolutePath: cwdPath,
    });
}
