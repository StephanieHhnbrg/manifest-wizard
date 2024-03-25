import {PluginData} from "../data/plugin.data";

export const TeadsAwsPlugin: PluginData = {
    name: "Teads AWS",
    method: "TeadsAWS",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "teads-aws",

    manifestAttributes: {
        globalConfig: [
            {name: "interpolation", type: "string"}, // linear, spline
        ],
        defaults: [
            {name: "cloud/instance-type", type: "string"}, // t2.micro
            {name: "cpu/expected-lifespan", type: "number", unit: "secs", optional: true},
        ],
        config: [],
        input: [
            {name: "cpu/utilization", type: "number", unit: "%"},

        ]
    },
    outputAttributes: [
        {name: "carbon-embodied", unit: "gCO2eq"},
        {name: "energy", unit: "kWh"},
    ]
};
