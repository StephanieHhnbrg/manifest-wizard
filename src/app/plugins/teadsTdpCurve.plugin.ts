import {PluginCategory, PluginData} from "../data/plugin.data";

export const TeadsTdpCurvePlugin: PluginData = {
    name: "Teads TDP Curve",
    method: "TeadsCurve",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "teads-curve",
    pCategory: [PluginCategory.CPU, PluginCategory.ENERGY],
    ghLink: "https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/teads-curve",

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

