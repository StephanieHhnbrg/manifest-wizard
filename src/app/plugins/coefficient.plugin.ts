import {PluginData} from "../data/plugin.data";

export const CoefficientPlugin: PluginData = {
    name: "Coefficient",
    method: "Coefficient",
    path: "@grnsft/if-plugins",
    pipelineId: "coefficient",

    manifestAttributes: {
        globalConfig: [
            {name: "input-parameter", type: "string"},
            {name: "coefficient", type: "number"},
            {name: "output-parameter", type: "string"},
        ],
        defaults: [],
        config: [],
        input: [
            {name: "<input-parameter>", type: "string"},
        ]
    },

    outputAttributes: [
        {name: "<output-parameter>"}
    ]
};
