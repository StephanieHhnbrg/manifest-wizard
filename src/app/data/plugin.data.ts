import {ManifestInputData} from "./input.data";

export interface PluginData {

    name: string;
    method: string;

    path: string;

    pipelineId: string;

    manifestAttributes: ManifestInputData;

    outputAttributes: OutputData[];
}

export interface OutputData {
    name: string,
    unit?: string,
}