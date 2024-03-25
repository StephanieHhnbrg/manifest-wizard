import {PluginData} from "../data/plugin.data";

export const SciPlugin: PluginData = {
    name: "SCI",
    method: "Sci",
    path: "@grnsft/if-plugins",
    pipelineId: "sci",

    manifestAttributes: {
        globalConfig: [
            {name: "functional-unit-time", type: "string"},
        ],
        defaults: [],
        config: [
            {name: "functional-unit", type: "string"},
        ],
        input: [
            {name: "carbon-operational", type: "number", unit: "gCO2eq"},  // TODO: options: either c-o && c-e or carbon
            {name: "carbon-embodied", type: "number", unit: "gCO2eq"},
            {name: "<functional-unit>", type: "number", unit: "<functional-unit-time>"},
        ]
    },

    outputAttributes: [
        {name: "carbon", unit: "gCO2eq"},
        {name: "sci", unit: "gCO2eq/<functional-unit-time>"},
    ]
};
