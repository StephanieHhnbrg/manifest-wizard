import {PluginData} from "../data/plugin.data";

export const DividePlugin: PluginData = {
    name: "Divide",
    method: "Divide",
    path: "@grnsft/if-plugins",
    pipelineId: "divide",

    manifestAttributes: {
        globalConfig: [
            {name: "numerator", type: "string"},
            {name: "denominator", type: "number"},
            {name: "output", type: "string"}
        ],
        defaults: [],
        config: [],
        input: [
            {name: "<numerator>", type: "number"},
        ]
    },

    outputAttributes: [
        {name: "<output>"}
    ]
};

