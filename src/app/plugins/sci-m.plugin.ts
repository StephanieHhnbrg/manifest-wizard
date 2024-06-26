import {PluginCategory, PluginData} from "../data/plugin.data";

export const SciMPlugin: PluginData = {
    name: "SCI-M",
    method: "SciM",
    path: "@grnsft/if-plugins",
    pipelineId: "sci-m",
    pCategory: [PluginCategory.CARBON],
    ghLink: "https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/sci-m",

    manifestAttributes: {
        globalConfig: [],
        defaults: [
            {name: "device/emissions-embodied", type: "number", unit: "gCO2eq"},
            {name: "device/expected-lifespan", type: "number", unit: "secs"},
            {name: "resources-reserved", type: "number"},
            {name: "resources-total", type: "number"},
        ],
        config: [],
        input: []
    },

    outputAttributes: [
        {name: "carbon-embodied", unit: "gCO2eq"}
    ]
};
