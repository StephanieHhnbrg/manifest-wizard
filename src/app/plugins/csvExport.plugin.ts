import {PluginData} from "../data/plugin.data";

export const CsvExportPlugin: PluginData = {
    name: "CSV Export",
    method: "CsvExport",
    path: "@grnsft/if-plugins",
    pipelineId: "csv-exporter",

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
