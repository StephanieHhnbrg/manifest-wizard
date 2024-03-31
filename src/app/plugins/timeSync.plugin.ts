import {PluginCategory, PluginData} from "../data/plugin.data";

export const TimeSyncPlugin: PluginData = {
    name: "Time Sync",
    method: "TimeSync",
    path: "builtin",
    pipelineId: "time-sync",
    pCategory: [PluginCategory.RESTRUCTURE],
    ghLink: "https://github.com/Green-Software-Foundation/if/tree/main/src/builtins",

    manifestAttributes: {
        globalConfig: [
            {name: "start-time", type: "timestamp"},
            {name: "end-time", type: "timestamp"},
            {name: "interval", type: "number"}, // in seconds
        ],
        defaults: [],
        config: [],
        input: []
    },

    outputAttributes: [
        {name: "synchronized the inputs by given configuration"}
    ]
};