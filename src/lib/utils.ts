import { promisify } from "util";
import * as fs from "fs";
import * as childProcess from "child_process";
import { FileToAddType } from "./types.js";
import {
    packageInstallCmd,
    PackageManagerType,
} from "./package-manager/index.js";
import { join, parse as pathParse } from "path";

export const writeFile = promisify(fs.writeFile);
export const readFile = promisify(fs.readFile);
export const mkdir = promisify(fs.mkdir);
export const rm = promisify(fs.rm);
export const exec = promisify(childProcess.exec);
export const spawn = promisify(childProcess.spawn);

const prodPackages: string[] = [];
const devPackages: string[] = [];
const preinstallCmds: string[] = [];
const postinstallCmds: string[] = [];
const packageJsonModify: object[] = [];
const filesToAdd: Array<FileToAddType> = [];

export const addPackages = (...packages: string[]) => {
    prodPackages.push(...packages);
};
export const addDevPackages = (...packages: string[]) => {
    devPackages.push(...packages);
};
export const addPreinstallCmds = (...cmds: string[]) => {
    preinstallCmds.push(...cmds);
};
export const addFiles = (...files: FileToAddType[]) => {
    filesToAdd.push(...files);
};
export const addPostinstallCmds = (...cmds: string[]) => {
    postinstallCmds.push(...cmds);
};
export const modifyPackageJson = (...changes: object[]) => {
    packageJsonModify.push(...changes);
};

export const generate = async (params: {
    cwdPath: string;
    managerType: PackageManagerType;
}) => {
    const { cwdPath, managerType } = params;
    // const actualExec = async (cmd: string) => await exec(cmd, { cwd: cwdPath });
    const actualExec = async (cmd: string) => {
        return await new Promise<void>((resolve, reject) => {
            const section = cmd.split(" ");
            const out = childProcess.spawn(section[0], section.slice(1), {
                cwd: cwdPath,
                stdio: ["inherit", "inherit", "inherit"],
            });

            console.log(`===== ${cmd} =====`);

            out.on("close", (code) => {
                if (code === 0 || code === null) {
                    resolve();
                } else {
                    reject(code);
                }
            });

            out.on("exit", (code) => {
                if (code === 0 || code === null) {
                    resolve();
                } else {
                    reject(code);
                }
            });
        });
    };

    // Delete folder if exists

    const exists = fs.existsSync(cwdPath);
    if (exists) {
        await rm(cwdPath, { recursive: true, force: true });
    }

    // Create empty folder
    await mkdir(cwdPath);

    if (preinstallCmds.length > 0) {
        for (const cmd of preinstallCmds) {
            await actualExec(cmd);
        }
    }

    if (prodPackages.length > 0) {
        const packageString = prodPackages.join(" ");
        const packageCmdStr =
            packageInstallCmd[managerType].install(packageString);
        await actualExec(packageCmdStr);
    }

    if (devPackages.length > 0) {
        const devPackageString = devPackages.join(" ");
        const devPackageCmdStr =
            packageInstallCmd[managerType].installDev(devPackageString);
        await actualExec(devPackageCmdStr);
    }

    for (const file of filesToAdd) {
        const { content: content, path } = file;
        const joinedPath = join(cwdPath, path);
        const parsedPath = pathParse(joinedPath);

        if (!fs.existsSync(parsedPath.dir)) {
            await mkdir(parsedPath.dir, { recursive: true });
        }
        await writeFile(joinedPath, content);
    }

    if (packageJsonModify.length > 0) {
        const json = JSON.parse(
            (await readFile(join(cwdPath, "package.json"))).toString()
        );
    }

    if (postinstallCmds.length > 0) {
        for (const cmd of postinstallCmds) {
            await actualExec(cmd);
        }
    }
};
