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
    .usage("Usage: $0 <path>")
    .command("path", "Path to create project", {
        path: {
            description: "Path to create project",
            string: true,
        },
    })
    .demandCommand(1).argv;

const { _ } = await argv;
const path = _[0] as string;

const cwdPath = join(process.cwd(), path);

const exists = fs.existsSync(cwdPath);

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
        await rm(cwdPath, { recursive: true, force: true });
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

await mkdir(cwdPath);

const { LANGUAGE, MODULES, PACKAGE_MANAGER, PROJECT } = answers;

if (PROJECT === ProjectType.NODE) {
    await parseProject({
        language: LANGUAGE,
        manager: PACKAGE_MANAGER,
        absolutePath: cwdPath,
    });
}
