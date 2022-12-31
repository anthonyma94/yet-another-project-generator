import { stripIndent } from "common-tags";
import { ParseProjectParamType } from "../types.js";
import { addDevPackages, addFiles, addPreinstallCmds } from "../utils.js";

const gitIgnoreContent = stripIndent`
node_modules
`;

export const parseNodeProject = async (params: ParseProjectParamType) => {
    const { language } = params;

    addPreinstallCmds("npm init -y");

    if (language === "TS") {
        addDevPackages("typescript", "@types/node", "ts-node");
    }

    addFiles(
        { path: "src/index.ts", content: 'console.log("hello world");' },
        { path: ".gitignore", content: gitIgnoreContent }
    );
};
