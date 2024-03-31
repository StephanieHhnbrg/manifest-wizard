import {PluginCategory, PluginData} from "../data/plugin.data";

export const MultiplyPlugin: PluginData = {
    name: "Multiply",
    method: "Multiply",
    path: "@grnsft/if-plugins",
    pipelineId: "multiply",
    pCategory: [PluginCategory.ARITHMETIC],
    ghLink: "https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/multiply",

    manifestAttributes: {
        globalConfig: [
            {name: "input-parameters", type: "list"},
            {name: "output-parameter", type: "string"},
        ],
        defaults: [],
        config: [],
        input: [
            {name: "<input-parameters>", type: "number"},
        ]
    },

    outputAttributes: [
        {name: "<output-parameter>"}
    ]
};
