import {PluginData} from "./plugin.data";
import {InputData} from "./input.data";

export function getInputLabel(inputName: string, plugin: PluginData): string {
    let label = inputName;
    if (inputName.startsWith('<') && inputName.endsWith('>')) {
        let parent = findParentInput(inputName, plugin)
        if (parent && parent.value) {
            label = parent.value;
        }
    }
    return label;
}

export function getUnitLabel(unit: string | undefined, plugin: PluginData): string | undefined {
    let label = unit;
    if (unit && unit.includes('<') && unit.includes('>')) {
        let part = unit.split('<')[1];
        let name = part.split('>')[0];
        let parent = findParentInput(`<${name}>`, plugin)
        if (parent && parent.value) {
            label = unit.replace(`<${parent.name}>`, parent.value);
        }
    }
    return label;
}

export function findParentInput(inputName: string, plugin: PluginData): InputData | undefined {
    let possibleLabels = plugin.manifestAttributes.globalConfig.concat(plugin.manifestAttributes.defaults).concat(plugin.manifestAttributes.config);
    return possibleLabels.find(p => "<" + p.name + ">" == inputName);
}

