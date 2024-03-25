import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PluginData} from "../../data/plugin.data";
import {ProjectData} from "../../data/project.data";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {
    TerminalInstructionDialog
} from "../../dialogs/terminal-instruction-dialog/terminal-instruction-dialog.component";
import {PipelineDialogComponent} from "../../dialogs/pipeline-dialog/pipeline-dialog.component";
import {getInputLabel, getUnitLabel} from "../../data/plugin.utils";
import {Subject, Subscription} from "rxjs";
import {InputDataDialogComponent} from "../../dialogs/input-data-dialog/input-data-dialog.component";
import {ObservationInputComponent} from "../observation-input/observation-input.component";
import {InputData} from "../../data/input.data";


@Component({
    selector: 'app-manifest-creator',
    templateUrl: './manifest-creator.component.html',
    styleUrl: './manifest-creator.component.scss'
})
export class ManifestCreatorComponent implements OnInit, OnDestroy {

    public selectedPlugins: PluginData[] = [];
    public observations = new Map<string, Map<string, string>[]>();

    private subscriptions: Subscription[] = [];

    constructor(private translate: TranslateService,
                private dialog: MatDialog) {
    }

    public project: ProjectData = {name: "", description: ""};


    public manifest: string;
    @ViewChild(MatTooltip) tooltip: MatTooltip;
    @ViewChild('observation_input') observationInput: ObservationInputComponent;

    ngOnInit() {
        this.manifest = this.getDefaultManifest();
    }

    getDefaultManifest(): string {
        return "" +
            "name:\n" +
            "description:\n" +
            "tags:\n" +
            "initialize:\n" +
            "  plugins:\n" +
            "    <to be defined> \n" +
            "  outputs: ['yaml']\n" +
            "tree:\n" +
            "  children:\n" +
            "    child:\n" +
            "      pipeline:\n" +
            "      config:\n" +
            "      defaults:\n" +
            "      inputs: \n" +
            "        <to be defined> \n";
    }

    updateManifest(selectedPlugins: PluginData[], observations: Map<string, Map<string, string>[]>) {
        this.selectedPlugins = [...selectedPlugins];
        this.observations = observations;
        if (selectedPlugins.length == 0) {
            this.manifest = this.getDefaultManifest();
            return;
        }
        let header = "" +
            `name: ${this.project.name}\n` +
            `description: ${this.project.description}\n` +
            `tags: \n` +
            "initialize:\n" +
            "  outputs: ['yaml']\n";
        let pluginsBody = "  plugins:\n";
        let pipelineBody = "      pipeline:\n";
        let configBody = "      config:\n";
        let defaultsBody = "      defaults:\n";

        selectedPlugins.forEach(p => {
            pluginsBody += `    ${p.pipelineId}:\n`;
            pluginsBody += `      method: ${p.method}\n`;
            pluginsBody += `      path: '${p.path}'\n`;
            if (p.manifestAttributes.globalConfig.length > 0) {
                pluginsBody += `      global-config:\n`;
                let parts: string[] = [];
                p.manifestAttributes.globalConfig.forEach(config => {
                    let key = config.name;
                    if (!key.includes(".")) {
                        pluginsBody += `        ${key}: ${this.getConfigValue(config)}\n`;
                        parts = [];
                    } else {
                        let keyParts = key.split(".");
                        if (parts.length == 0) {
                            let space = '';
                            parts = keyParts.slice(0, keyParts.length - 1);
                            parts.forEach(part => {
                                pluginsBody += `        ${space}${part}:\n`;
                                space += '  ';
                            })
                            pluginsBody += `        ${space}${keyParts[keyParts.length - 1]}: ${this.getConfigValue(config)}\n`;
                        } else {
                            let space = ''
                            keyParts.slice(0, keyParts.length - 1).forEach((part, index) => {
                                if (index >= parts.length || part != parts[index]) {
                                    pluginsBody += `        ${space}${part}:\n`;
                                    parts = [];
                                }
                                space += '  ';
                            });
                            pluginsBody += `        ${space}${keyParts[keyParts.length - 1]}: ${this.getConfigValue(config)}\n`;
                            parts = keyParts.slice(0, keyParts.length - 1);
                        }
                    }
                });

            }
            pipelineBody += `        - ${p.pipelineId}\n`;

            if (p.manifestAttributes.config.length > 0) {
                configBody += `        ${p.pipelineId}:\n`;
            }
            p.manifestAttributes.config.forEach((config, index) => {
                configBody += `          ${config.name}: ${this.getConfigValue(config)}\n`;
            });
            p.manifestAttributes.defaults.forEach((config, index) => {
                defaultsBody += `        ${config.name}: ${config.value}\n`;
            });

        });
        let observationsBody = "" +
            "tree:\n" +
            "  children:\n";
        Array.from(observations.keys()).forEach(context => {
            let contextHeader = `    ${context}:\n`;
            let inputBody = "      inputs: \n";
            observations.get(context)!.forEach(inputMapArray => {
                let start = true;
                inputMapArray.forEach((value, key) => {
                    if (start) {
                        inputBody += `        - ${key}: ${value}\n`;
                        start = false;
                    } else {
                        inputBody += `          ${key}: ${value}\n`;
                    }
                });

            });
            observationsBody += contextHeader + pipelineBody + configBody + defaultsBody + inputBody;
        });

        this.manifest = header + pluginsBody + observationsBody;
    }

    private getConfigValue(config: InputData): string {
        if (config.type != 'list') {
            return config.value || "";
        } else if (config.value && config.value.length > 0) {
            return `[${config.value}]`;
        }
        return "[]";
    }

    public async copyManifestToClipboard() {
        if (this.project.name.length == 0) {
            this.project.name = 'manifest-wizard';
        }
        this.updateManifest(this.selectedPlugins, this.observations);
        await navigator.clipboard.writeText(this.manifest);
        await new Promise(
            (resolve) =>
                setTimeout(resolve, 500));
        this.tooltip.toggle();
    }

    public getCopiedToClipboardTooltip(): string {
        return this.translate.instant("INFO.COPIED_TO_CLIPBOARD");
    }

    public downloadManifestAsYmlFile() {
        if (this.project.name.length == 0) {
            this.project.name = 'manifest-wizard';
        }
        this.updateManifest(this.selectedPlugins, this.observations);
        const blob = new Blob([this.manifest], {type: 'yaml'});
        const url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = `${this.project.name}.yaml`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }

    public openTerminalInstructionDialog() {
        this.dialog.open(TerminalInstructionDialog, {
            autoFocus: false
        });
    }

    public showPipeline() {
        this.dialog.open(PipelineDialogComponent, {
            data: [...this.selectedPlugins].map(p => {
                let input = p.manifestAttributes.input.map(attr => {
                    return {
                        name: getInputLabel(attr.name, p),
                        type: "",
                        unit: getUnitLabel(attr.unit, p),
                        optional: attr.optional
                    }
                });
                let manifestAttributes = {globalConfig: [], config: [], input, defaults: []}
                let outputAttributes = p.outputAttributes.map(attr => {
                    return {name: getInputLabel(attr.name, p), unit: getUnitLabel(attr.unit, p)}
                });

                return {name: p.name, method: p.method, pipelineId: p.pipelineId, manifestAttributes, outputAttributes}
            })
        });
    }

    public showInputData() {
        let removedObservation$ = new Subject<Map<string, string>>();
        let contexts = Array.from(this.observations.keys());
        let input: Map<string, string>[] = [];
        contexts.forEach(c => {
            this.observations.get(c)!.forEach(obs => {
                let inputObs = new Map(obs);
                inputObs.set("context", c);
                input.push(inputObs);
            })
        });
        const dialogRef = this.dialog.open(InputDataDialogComponent, {
            data: {contexts, input, removedObservation$},
            autoFocus: false
        });

        this.subscriptions.push(removedObservation$.asObservable().subscribe(observation => {
            this.observationInput.removeObservation(observation);
        }));

        this.subscriptions.push(dialogRef.afterClosed().subscribe((observationToBeEdit: Map<string, string>) => {
            if (observationToBeEdit) {
                this.observationInput.initEditingObservation(observationToBeEdit);
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}