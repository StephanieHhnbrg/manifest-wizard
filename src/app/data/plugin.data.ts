import {ManifestInputData} from "./input.data";

export interface PluginData {

    name: string;
    method: string;
    path: string;

    pCategory: PluginCategory[];

    pipelineId: string;

    ghLink: string;
    manifestAttributes: ManifestInputData;

    outputAttributes: OutputData[];
}

export interface OutputData {
    name: string,
    unit?: string,
}

export enum PluginCategory {
    ARITHMETIC = "PLUGIN_CATEGORY.ARITHMETIC",
    CLOUD = "PLUGIN_CATEGORY.CLOUD",
    RESTRUCTURE = "PLUGIN_CATEGORY.RESTRUCTURE",
    HELPER = "PLUGIN_CATEGORY.HELPER",
    CARBON = "PLUGIN_CATEGORY.CARBON",
    ENERGY = "PLUGIN_CATEGORY.ENERGY",
    CPU = "PLUGIN_CATEGORY.CPU",

}