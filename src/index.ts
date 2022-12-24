#!/usr/bin/env node

import * as childProcess from "child_process";
import { join } from "path";
import * as fs from "fs";
import { promisify } from "util";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import {
    languagePrompt,
    modulesPrompt,
    projectPrompt,
    QuestionType,
} from "./lib/prompts.js";

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const rm = promisify(fs.rm);
const exec = promisify(childProcess.exec);
const cwdPath = join(process.cwd(), "test");
const execInPath = async (cmd: string) => await exec(cmd, { cwd: cwdPath });

const gitignoreContent = `
node_modules
dist
`;

async function run() {
    console.log(cwdPath);
    const exists = fs.existsSync(cwdPath);

    if (exists) {
        await rm(cwdPath, { recursive: true, force: true });
    }
    await mkdir(cwdPath);

    await execInPath("npm init -y");
    await execInPath("yarn add -D typescript");
    // console.log("hi");
}

// Main

export const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 <path>")
    .command("path", "Path to create project", {
        path: {
            description: "Path to create project",
            string: true,
        },
    })
    .demandCommand(1).argv;

console.log(await argv);
const answers = await inquirer.prompt<Record<QuestionType, any>>([
    languagePrompt,
    projectPrompt,
    modulesPrompt,
]);

console.log(`Hello, ${answers.LANGUAGE}!`);
console.log("Project", answers.PROJECT);
console.log("Modules", answers.MODULES);

// const modules = await inquirer.prompt([
//   {
//     message: "Select modules",
//     name: "modules",
//     type: "checkbox",
//     choices: [
//       {
//         name: "Prettier",
//         value: "prettier",
//       },
//       {
//         name: "ESLint",
//         value: "eslint",
//       },
//     ],
//   },
// ]);
// await run();
console.log("Done");
