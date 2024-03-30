export interface InputData {
    name: string;
    type: string;
    value?: string;

    unit?: string;
    optional?: boolean;
}

export interface ManifestInputData {
    globalConfig: InputData[];
    defaults: InputData[];
    config: InputData[];
    input: InputData[];

    defaultsByContext?: Map<string, InputData[]>
    configByContext?: Map<string, InputData[]>
}