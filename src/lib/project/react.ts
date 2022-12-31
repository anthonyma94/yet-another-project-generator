import * as path from "path";
import { PackageManagerType } from "../package-manager/index.js";
import { ParseProjectParamType } from "../types.js";
import { addPreinstallCmds } from "../utils.js";

export const parseReactProject = (params: ParseProjectParamType) => {
    const { language, manager, cwdPath } = params;
    const projectName = cwdPath.split(path.sep)[
        cwdPath.split(path.sep).length - 1
    ];
    let template = `--template ${language === "TS" ? "react-ts" : "react"}`;

    const cmds: string[] = [];

    switch (manager) {
        case PackageManagerType.NPM: {
            template = "npm create vite@latest . -- " + template;
            cmds.push(template, "npm install");
            break;
        }
        case PackageManagerType.YARN: {
            template = "yarn create vite . " + template;
            cmds.push(template, "yarn");
            break;
        }
        default:
            throw new Error(`${manager} not implemented yet.`);
    }

    addPreinstallCmds(...cmds);
};
