import {PluginCategory, PluginData} from "../data/plugin.data";

export const CcfPlugin: PluginData = {
    name: "CCF",
    method: "CloudCarbonFootprint",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "ccf",
    pCategory: [PluginCategory.CARBON, PluginCategory.CLOUD, PluginCategory.CPU],
    ghLink: "https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/ccf",

    manifestAttributes: {
        globalConfig: [],
        defaults: [
            {name: "cloud/vendor", type: "string"}, // aws
            {name: "cloud/instance-type", type: "string"}, // m5n.large
        ],
        config: [],
        input: [
            {name: "cpu/utilization", type: "string", unit: "m5n.large"},
        ]
    },
    outputAttributes: [
        {name: "carbon-embodied", unit: "gCO2eq"},
        {name: "energy", unit: "kWh"},
    ]
};
