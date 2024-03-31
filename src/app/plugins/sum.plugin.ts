import {PluginCategory, PluginData} from "../data/plugin.data";

export const SumPlugin: PluginData = {
    name: "Sum",
    method: "Sum",
    path: "@grnsft/if-plugins",
    pipelineId: "sum",
    pCategory: [PluginCategory.ARITHMETIC],
    ghLink: "https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/sum",

    manifestAttributes: {
        globalConfig: [
            {name: "input-parameters", type: "list"},
            {name: "output-parameter", type: "string"},
        ],
        defaults: [],
        config: [],
        input: [
            {name: "<input-parameters>", type: "string"},
        ]
    },

    outputAttributes: [
        {name: "<output-parameter>"}
    ]
};
