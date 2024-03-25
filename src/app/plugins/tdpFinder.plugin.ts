import {PluginData} from "../data/plugin.data";

export const TdpFinderPlugin: PluginData = {
    name: "TDP Finder",
    method: "TdpFinder",
    path: "@grnsft/if-plugins",
    pipelineId: "finder",

    manifestAttributes: {
        globalConfig: [],
        defaults: [],
        config: [],
        input: [
            {name: "physical-processor", type: "string"}, // Intel Xeon Platinum 8175M, AMD A8-9600
        ]
    },

    outputAttributes: [
        {name: "cpu/thermal-design-power", unit: "W"}
    ]
};
