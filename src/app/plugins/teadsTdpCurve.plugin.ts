import {PluginData} from "../data/plugin.data";

export const TeadsTdpCurvePlugin: PluginData = {
    name: "Teads TDP Curve",
    method: "TeadsCurve",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "teads-curve",

    manifestAttributes: {
        globalConfig: [
            {name: "interpolation", type: "string"}, // linear, spline
        ],
        defaults: [],
        config: [],
        input: [
            {name: "cpu/thermal-design-power", type: "number", unit: "W"},
            {name: "cpu/utilization", type: "number", unit: "%"},
        ]
    },

    outputAttributes: [
        {name: "cpu/energy", unit: "kWh"}
    ]
};

