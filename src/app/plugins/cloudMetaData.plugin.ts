import {PluginData} from "../data/plugin.data";

export const CloudMetaDataPlugin: PluginData = {
    name: "Cloud Metadata",
    method: "CloudMetadata",
    path: "@grnsft/if-plugins",
    pipelineId: "cloud-metadata",

    manifestAttributes: {
        globalConfig: [],
        defaults: [],
        config: [],
        input: [
            {name: "cloud/vendor", type: "string"}, // aws
            {name: "cloud/instance-type", type: "string"}, // m5n.large
            {name: "cpu/utilization", type: "number", unit: "%"},
        ]
    },

    outputAttributes: [
        {name: "physical-processor"}, // Intel® Xeon® Platinum 8259CL
        {name: "vcpus-allocated"}, //TODO: What are the units here?
        {name: "vcpus-total"},
        {name: "memory-available"},
        {name: "cpu/thermal-design-power", unit: "W"},
    ]
};