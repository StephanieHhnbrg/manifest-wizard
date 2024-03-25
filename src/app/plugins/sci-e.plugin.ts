import {PluginData} from "../data/plugin.data";

export const SciEPlugin: PluginData = {
    name: "SCI-E",
    method: "SciE",
    path: "@grnsft/if-plugins",
    pipelineId: "sci-e",

    manifestAttributes: {
        globalConfig: [],
        defaults: [],
        config: [],
        input: [
            {name: "cpu/energy", type: "number", unit: "kWh"}, //TODO: at least one of the following
            {name: "memory/energy", type: "number", unit: "kWh"},
            {name: "network/energy", type: "number", unit: "kWh"},
        ]
    },

    outputAttributes: [
        {name: "energy", unit: "kWh"}
    ]
};
