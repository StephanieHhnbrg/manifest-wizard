import {PluginCategory, PluginData} from "../data/plugin.data";

export const Co2JsPlugin: PluginData = {
    name: "CO2.JS",
    method: "Co2js",
    path: "@grnsft/if-unofficial-plugins",
    pipelineId: "co2js",
    pCategory: [PluginCategory.CARBON],
    ghLink: "https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/co2js",

    manifestAttributes: {
        globalConfig: [
            {name: "options.dataReloadRatio", type: "number", unit: "% between 0&1", optional: true},
            {name: "options.firstVisitPercentage", type: "number", unit: "% between 0&1", optional: true},
            {name: "options.returnVisitPercentage", type: "number", unit: "% between 0&1", optional: true},
            {name: "options.gridIntensity.device", type: "number", unit: "gCO2e/kWh", optional: true}, //TODO: or .country : code
            {name: "options.gridIntensity.dataCenter", type: "string", unit: "gCO2e/kWh", optional: true}, //TODO: or .country : code
            {name: "options.gridIntensity.networks", type: "string", unit: "gCO2e/kWh", optional: true}, //TODO: or .country : code
        ],
        defaults: [],
        config: [
            {name: "type", type: "string", unit: "swd/1byte"},
            {name: "green-web-host", type: "boolean"},
        ],
        input: [
            {name: "network/data/bytes", type: "number", unit: "GB"},
        ]
    },

    outputAttributes: [
        {name: "carbon-operational", unit: "gCO2e/kWh"}
    ]
};
