import { PackageManagerType } from "../package-manager/index.js";
import { ParseProjectParamType } from "../types.js";
import { addDevPackages, addPackages, addPreinstallCmds } from "../utils.js";

export const parseNextJSProject = (params: ParseProjectParamType) => {
    const { language, manager } = params;

    let template = `. --${language.toLowerCase()} --no-eslint`;

    switch (manager) {
        case PackageManagerType.NPM: {
            addPreinstallCmds(`npx create-next-app@latest . ${template}`);
            break;
        }
        case PackageManagerType.YARN: {
            addPreinstallCmds(`yarn create next-app . ${template}`);
            break;
        }
    }
};
