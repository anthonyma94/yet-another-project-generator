export type PromptTypeOpts<T extends string> = {
    [P in T]: { name: string; value: P };
};

export type ExecType = (cmd: string) => Promise<{
    stdout: string;
    stderr: string;
}>;
