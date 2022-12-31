import { stripIndent } from "common-tags";
import { ParseModuleParamType } from "../types.js";
import { addDevPackages, addFiles, addPostinstallCmds } from "../utils.js";

const prettierContent = stripIndent`
{
    "tabWidth": 4,
    "htmlWhitespaceSensitivity": "css",
    "overrides": [
      {
        "files": [
          "*.yaml",
          "*.yml",
          "*.html",
          "*.jsx",
          "*.css",
          "*.tsx",
          "*.vue",
          "*.json"
        ],
        "options": {
          "tabWidth": 2
        }
      }
    ]
  }  
`;

export const parsePrettierModule = (params: ParseModuleParamType) => {
    addDevPackages("prettier");
    addFiles({
        content: prettierContent,
        path: ".prettierrc",
    });
    addPostinstallCmds("npx prettier --write");
};
