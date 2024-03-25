import {PluginData} from "../data/plugin.data";

export const ShellPlugin: PluginData = {
    name: "Shell",
    method: "Shell",
    path: "@grnsft/if-plugins",
    pipelineId: "sampler",

    manifestAttributes: {
        globalConfig: [
            {name: "command", type: "string"},
            {name: "command-parameters", type: "list", optional: true},
        ],
        defaults: [],
        config: [],
        input: [
            {name: "<command-parameters>", type: "string"},
        ]
    },

    outputAttributes: [
        {name: "depending on wrapped plugin/shell command"}
    ]
};