import {PluginCategory, PluginData} from "../data/plugin.data";

export const WattTimePlugin: PluginData = {
    name: "Watt Time",
    method: "WattTimeGridEmissions",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "watt-time",
    pCategory: [PluginCategory.CARBON, PluginCategory.CLOUD],
    ghLink: "https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/watt-time",

    manifestAttributes: {
        globalConfig: [
            {name: "base-url", type: "string"}, // URL for the WattTime API endpoint
        ],
        defaults: [],
        config: [],
        input: [
            {name: "geolocation", type: "string", unit: "latitude,longitude"}, // only one of 3 need to be provided
            {name: "cloud/region-geolocation", type: "string"},
            {name: "cloud/region-wt-id", type: "string"},
            {name: "signal-type", type: "string", optional: true},

        ]
    },

    outputAttributes: [
        {name: "grid/carbon-intensity", unit: "gCO2e/kWh"}
    ]
};
