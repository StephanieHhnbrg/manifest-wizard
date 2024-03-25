import {PluginData} from "../data/plugin.data";

export const ENetPlugin: PluginData = {
    name: "E-Net", method: "ENet", path: "@grnsft/if-plugins", pipelineId: "e-net",

    manifestAttributes: {
        globalConfig: [
            {name: "energy-per-gb", type: "number", unit: "kWh/GB"},
        ],
        defaults: [],
        config: [],
        input: [
            {name: "network/data-in", type: "number", unit: "GB"},
            {name: "network/data-out", type: "number", unit: "GB"},
        ]
    },

    outputAttributes: [
        {name: "network/energy", unit: "kWh"}
    ]
};

