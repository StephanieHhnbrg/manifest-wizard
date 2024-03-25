import {PluginData} from "../data/plugin.data";

export const RegexPlugin: PluginData = {
    name: "Regex",
    method: "Regex",
    path: "@grnsft/if-plugins",
    pipelineId: "regex",

    manifestAttributes: {
        globalConfig: [
            {name: "parameter", type: "string"},
            {name: "match", type: "string"}, // regex
            {name: "output", type: "string"},
        ],
        defaults: [],
        config: [],
        input: [
            {name: "<parameter>", type: "string"},
        ]
    },

    outputAttributes: [
        {name: "<output>"}
    ]
};
