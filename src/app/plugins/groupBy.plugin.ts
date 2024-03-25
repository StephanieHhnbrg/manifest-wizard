import {PluginData} from "../data/plugin.data";

export const GroupByPlugin: PluginData = {
    name: "GroupBy",
    method: "GroupBy",
    path: "builtin",
    pipelineId: "group-by",

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
