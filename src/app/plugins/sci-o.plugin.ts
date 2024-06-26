import {PluginCategory, PluginData} from "../data/plugin.data";

export const SciOPlugin: PluginData = {
    name: "SCI-O",
    method: "SciO",
    path: "@grnsft/if-plugins",
    pipelineId: "sci-o",
    pCategory: [PluginCategory.CARBON],
    ghLink: "https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/sci-o",

    manifestAttributes: {
        globalConfig: [],
        defaults: [],
        config: [],
        input: [
            {name: "energy", type: "number", unit: "kWh"},
            {name: "grid/carbon-intensity", type: "number", unit: "gCO2e/kWh"},
        ]
    },

    outputAttributes: [
        {name: "carbon-operational", unit: "gCO2eq"}
    ]
};
