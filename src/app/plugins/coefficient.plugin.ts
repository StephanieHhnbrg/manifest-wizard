import {PluginCategory, PluginData} from "../data/plugin.data";

export const CoefficientPlugin: PluginData = {
    name: "Coefficient",
    method: "Coefficient",
    path: "@grnsft/if-plugins",
    pipelineId: "coefficient",
    pCategory: [PluginCategory.ARITHMETIC],
    ghLink: "https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/coefficient",

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
