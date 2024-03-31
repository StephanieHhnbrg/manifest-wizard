import {PluginCategory, PluginData} from "../data/plugin.data";

export const GroupByPlugin: PluginData = {
    name: "GroupBy",
    method: "GroupBy",
    path: "builtin",
    pipelineId: "group-by",
    pCategory: [PluginCategory.RESTRUCTURE],
    ghLink: "https://github.com/Green-Software-Foundation/if/tree/main/src/builtins",

    manifestAttributes: {
        globalConfig: [],
        defaults: [],
        config: [
            {name: "groupBy", type: "list"},
        ],
        input: []
    },

    outputAttributes: [
        {name: "regroups context of input data by given configuration"}
    ]
};
