import {PluginData} from "../data/plugin.data";

export const BoaviztaCloudPlugin: PluginData = {
    name: "Boavizta Cloud",
    method: "BoaviztaCloudOutput",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "boavizta-cloud",


    manifestAttributes: {
        globalConfig: [
            {name: "allocation", type: "string"},
            {name: "verbose", type: "boolean"},
        ],
        defaults: [
            {name: "provider", type: "string"}, // aws
            {name: "instance-type", type: "string"}, // r6g.medium
            {name: "country", type: "string", optional: true},
        ],
        config: [],
        input: [
            {name: "cpu/utilization", type: "number", unit: "%"},
            {name: "gpu-util", type: "number", unit: "%", optional: true},
            {name: "ram-util", type: "number", optional: true},
        ]
    },
    outputAttributes: [
        {name: "carbon-embodied", unit: "gCO2eq"},
        {name: "energy", unit: "kWH"},
    ]
};