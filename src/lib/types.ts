import { PackageManagerType } from "./package-manager/index.js";
import { ProjectType } from "./project/index.js";
import { LanguageType, ModulesType } from "./prompts.js";

export type PromptTypeOpts<T extends string> = {
    [P in T]: { name: string; value: P };
};

export type ExecType = (cmd: string) => Promise<{
    stdout: string;
    stderr: string;
}>;

export type FileToAddType = {
    path: string;
    content: string | Buffer;
};

export type ParseModuleParamType = {
    modules: ModulesType[];
    language: LanguageType;
};

export type ParseProjectParamType = {
    project: ProjectType;
    language: LanguageType;
    manager: PackageManagerType;
    cwdPath: string;
    modules: ModulesType[];
};
