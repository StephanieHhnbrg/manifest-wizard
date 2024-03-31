import {PluginCategory, PluginData} from "../data/plugin.data";

export const CsvExportPlugin: PluginData = {
    name: "CSV Export",
    method: "CsvExport",
    path: "@grnsft/if-plugins",
    pipelineId: "csv-exporter",
    pCategory: [PluginCategory.HELPER],
    ghLink: "https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/csv-export",

    manifestAttributes: {
        globalConfig: [],
        config: [
            {name: "headers", type: "list", optional: true},
            {name: "output-path", type: "string", unit: "*.csv"},
        ],
        defaults: [],
        input: [
            {name: "<headers>", type: "string"},
        ]
    },

    outputAttributes: [
        {name: "exports input data into a CSV file"}
    ]
};
