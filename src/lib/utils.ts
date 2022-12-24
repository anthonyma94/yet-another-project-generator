import { promisify } from "util";
import * as fs from "fs";
import * as childProcess from "child_process";

export const writeFile = promisify(fs.writeFile);
export const readFile = promisify(fs.readFile);
export const mkdir = promisify(fs.mkdir);
export const rm = promisify(fs.rm);
export const exec = promisify(childProcess.exec);
