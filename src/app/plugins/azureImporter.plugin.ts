import {PluginCategory, PluginData} from "../data/plugin.data";

export const AzureImporterPlugin: PluginData = {
    name: "Azure Importer",
    method: "AzureImporter",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "azure-importer",
    pCategory: [PluginCategory.CLOUD],
    ghLink: "https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/azure-importer",

    manifestAttributes: {
        globalConfig: [],
        defaults: [],
        config: [
            {name: "azure-observation-window", type: "string"}, // 5 min
            {name: "azure-observation-aggregation", type: "string"}, // average
            {name: "azure-subscription-id", type: "string"}, // xxx-xxx-xxx-xxx-xxx
            {name: "azure-resource-group", type: "string"}, // my-group
            {name: "azure-vm-name", type: "string"} // my-name
        ],
        input: []
    },

    outputAttributes: [
        {name: "cpu/utilization", unit: "%"},
        {name: "cloud/instance-type"}, // VM instance name
        {name: "location"}, // VM region
        {name: "memory/available/GB", unit: "GB"},
        {name: "memory/used/GB", unit: "GB"},
        {name: "memory/capacity/GB", unit: "GB"},
        {name: "memory/utilization", unit: "%"},
    ]
};