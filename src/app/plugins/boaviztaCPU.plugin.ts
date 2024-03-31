import {PluginCategory, PluginData} from "../data/plugin.data";

export const BoaviztaCPUPlugin: PluginData = {
    name: "Boavizta CPU",
    method: "BoaviztaCpuOutput",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "boavizta-cpu",
    pCategory: [PluginCategory.CARBON, PluginCategory.CPU, PluginCategory.ENERGY],
    ghLink: "https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/boavizta",

    manifestAttributes: {
        globalConfig: [
            {name: "allocation", type: "string"}, // LINEAR
            {name: "verbose", type: "boolean"},
        ],
        defaults: [
            {name: "cpu/number-cores", type: "number"},
            {name: "cpu/name", type: "string"}, // Intel® Core™ i7-1185G7
            {name: "cpu/expected-lifespan", type: "number", unit: "secs", optional: true},
            {name: "instance-type", type: "string", optional: true}, // r6g.medium
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