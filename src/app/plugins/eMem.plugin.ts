import {PluginCategory, PluginData} from "../data/plugin.data";

export const EMemPlugin: PluginData = {
    name: "E-Mem",
    method: "EMem",
    path: "@grnsft/if-plugins",
    pipelineId: "e-mem",
    pCategory: [PluginCategory.ENERGY],
    ghLink: "https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/e-mem",

    manifestAttributes: {
        globalConfig: [
            {name: "energy-per-gb", type: "number", unit: "kWh/GB", optional: true} // default: 0.000392
        ],
        defaults: [],
        config: [],
        input: [
            {name: "memory/utilization", type: "number", unit: "%"},
            {name: "memory/capacity", type: "number", unit: "GB"}
        ]
    },

    outputAttributes: [
        {name: "memory/energy", unit: "kWh"}
    ]
};