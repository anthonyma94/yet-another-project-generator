import {
    packageInstallCmd,
    PackageManagerType,
} from "../package-manager/index.js";
import { LanguageType } from "../prompts.js";
import { exec as baseExec } from "../utils.js";

export const parseProject = async (params: {
    language: LanguageType;
    manager: PackageManagerType;
    absolutePath: string;
}) => {
    const { language, manager, absolutePath: path } = params;

    const exec = async (cmd: string) => await baseExec(cmd, { cwd: path });

    await exec("npm init -y");

    if (language === "TS") {
        await exec(
            packageInstallCmd[manager].installDev(
                "typescript @types/node ts-node"
            )
        );
    }
};
