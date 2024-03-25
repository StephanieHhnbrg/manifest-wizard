import {PluginData} from "../data/plugin.data";

export const MockObservationsPlugin: PluginData = {
    name: "Mock Observations",
    method: "MockObservations",
    path: "@grnsft/if-plugins",
    pipelineId: "mock-observations",

    manifestAttributes: {
        globalConfig: [
            {name: "timestamp-from", type: "timestamp"},
            {name: "timestamp-to", type: "timestamp"},
            {name: "components.instance-type", type: "list"},
            {name: "generators.common.region", type: "string"},
            {name: "generators.common.common-key", type: "string"},
            {name: "generators.randint.cpu/utilization.min", type: "number", unit: "%"},
            {name: "generators.randint.cpu/utilization.max", type: "number", unit: "%"},
            {name: "generators.randint.memory/utilization.min", type: "number", unit: "%"},
            {name: "generators.randint.memory/utilization.max", type: "number", unit: "%"},
        ],
        defaults: [],
        config: [],
        input: []
    },

    outputAttributes: [
        {name: "exports generated mock observations into a yaml file"}
    ]
};