import { ModulesType } from "../prompts.js";
import { ParseModuleParamType } from "../types.js";
import { parsePrettierModule } from "./prettier.js";

export const parseModule = async (params: ParseModuleParamType) => {
    const { modules, language } = params;

    for (const module of modules) {
        switch (module) {
            case ModulesType.PRETTIER: {
                parsePrettierModule(params);
                return;
            }
            default:
                throw new Error(`${module} not yet implemented.`);
        }
    }
};
