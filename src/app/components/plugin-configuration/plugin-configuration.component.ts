import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PluginData} from "../../data/plugin.data";
import {PLUGINS} from "../../data/plugins.data";

@Component({
    selector: 'app-plugin-configuration',
    templateUrl: './plugin-configuration.component.html',
    styleUrl: './plugin-configuration.component.scss'
})
export class PluginConfigurationComponent implements OnInit {

    @Output() pluginConfigurationChanged = new EventEmitter<PluginData[]>();

    public plugins: PluginOption[] = [];
    public selectedPlugins: PluginData[] = [];

    public accordionStep = 0;

    constructor() {
    }

    ngOnInit() {
        this.plugins = [...PLUGINS].map(plugin => {
            return {plugin, isSelected: false};
        });
    }

    @Input()
    public set isOpen(isOpen: boolean) {
        if (!isOpen) {
            this.pluginConfigurationChanged.emit(this.selectedPlugins);
        }
    }

    selectPlugin(opt: PluginOption) {
        opt.isSelected = true;
        this.selectedPlugins.push(opt.plugin);
        this.pluginConfigurationChanged.emit(this.selectedPlugins);
    }

    deselectPlugin(opt: PluginOption) {
        let index = this.selectedPlugins.findIndex(p => p.name == opt.plugin.name);
        if (this.accordionStep == index && index != 0 && index == this.selectedPlugins.length - 1) {
            this.accordionStep--;
        }

        opt.isSelected = false;
        this.selectedPlugins = this.selectedPlugins.filter(p => p.name != opt.plugin.name);
        this.pluginConfigurationChanged.emit(this.selectedPlugins);
    }

    setStep(index: number) {
        this.accordionStep = index;
    }

    nextStep() {
        if (this.accordionStep < this.selectedPlugins.length - 1) {
            this.accordionStep++;
        }
    }

    prevStep() {
        if (this.accordionStep != 0) {
            this.accordionStep--;
        }
    }

    public switchWithPrevious(index: number) {
        if (index == 0 || this.selectedPlugins.length <= 1) {
            return;
        }
        let prev = {...this.selectedPlugins[index - 1]};
        let current = {...this.selectedPlugins[index]};
        this.selectedPlugins[index] = prev;
        this.selectedPlugins[index - 1] = current;
        this.pluginConfigurationChanged.emit(this.selectedPlugins);
    }

    public switchWithNext(index: number) {
        if (index >= this.selectedPlugins.length - 1) {
            return;
        }
        let next = {...this.selectedPlugins[index + 1]};
        let current = {...this.selectedPlugins[index]};
        this.selectedPlugins[index] = next;
        this.selectedPlugins[index + 1] = current;
        this.pluginConfigurationChanged.emit(this.selectedPlugins);
    }

    getPluginDescriptionTranslationKey(plugin: string): string {
        return `PLUGIN.${plugin.toUpperCase()}.DESCRIPTION`;
    }
}

export interface PluginOption {
    plugin: PluginData;
    isSelected: Boolean;

}
