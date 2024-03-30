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
import {findParentInput, getInputLabel, getUnitLabel} from "../../data/plugin.utils";
import {Subject, Subscription} from "rxjs";
import {InputDataDialogComponent} from "../../dialogs/input-data-dialog/input-data-dialog.component";
import {ObservationInputComponent} from "../observation-input/observation-input.component";
import {InputData} from "../../data/input.data";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
    PluginConfigurationByContextDialogComponent
} from "../../dialogs/plugin-configuration-by-context-dialog/plugin-configuration-by-context-dialog.component";


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
                private snackBar: MatSnackBar,
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
        let configBodyByContext = new Map<string, string>();
        let defaultsBodyByContext = new Map<string, string>();


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
            p.manifestAttributes.config.forEach((config) => {
                configBody += `          ${config.name}: ${this.getConfigValue(config)}\n`;
            });
            p.manifestAttributes.defaults.forEach((config) => {
                defaultsBody += `        ${config.name}: ${config.value}\n`;
            });

            if (p.manifestAttributes.configByContext && p.manifestAttributes.configByContext.size > 0) {
                Array.from(p.manifestAttributes.configByContext.keys()).forEach(c => {
                    let body = configBodyByContext.has(c) ? configBodyByContext.get(c)! : "      config:\n";

                    if (p.manifestAttributes.configByContext!.get(c)!.length > 0) {
                        body += `        ${p.pipelineId}:\n`;
                    }
                    p.manifestAttributes.configByContext!.get(c)!.forEach((config) => {
                        body += `          ${config.name}: ${this.getConfigValue(config)}\n`;
                    });
                    configBodyByContext.set(c, body);
                })
            }
            if (p.manifestAttributes.defaultsByContext && p.manifestAttributes.defaultsByContext.size > 0) {
                Array.from(p.manifestAttributes.defaultsByContext.keys()).forEach(c => {
                    let body = defaultsBodyByContext.has(c) ? defaultsBodyByContext.get(c)! : "      defaults:\n";
                    p.manifestAttributes.defaultsByContext!.get(c)!.forEach((config) => {
                        body += `        ${config.name}: ${config.value}\n`;
                    });
                    defaultsBodyByContext.set(c, body);
                })
            }

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

            let cBody = configBodyByContext.has(context) ? configBodyByContext.get(context)! : configBody;
            let dBody = defaultsBodyByContext.has(context) ? defaultsBodyByContext.get(context)! : defaultsBody;
            observationsBody += contextHeader + pipelineBody + cBody + dBody + inputBody;
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

    private hasMissingConfiguration(): boolean {
        return this.selectedPlugins.findIndex(p =>
            p.manifestAttributes.config.findIndex(c => !c.value && !c.optional) >= 0
            || p.manifestAttributes.globalConfig.findIndex(gc => !gc.value && !gc.optional) >= 0
            || p.manifestAttributes.defaults.findIndex(d => !d.value && !d.optional) >= 0
        ) >= 0;
    }

    private prepareManifest(): number {
        if (this.selectedPlugins.length == 0) {
            let msg = this.translate.instant("SNACKBAR.INFO_CONFIGURE_PLUGINS_N_OBS");
            this.snackBar.open(msg, '', {duration: 5000});
            return -1;
        }

        if (this.hasMissingConfiguration()) {
            let msg = this.translate.instant("SNACKBAR.MISSING_CONFIGURATION");
            this.snackBar.open(msg, '', {duration: 5000});
            return -1;
        }

        if (this.project.name.length == 0) {
            this.project.name = 'manifest-wizard';
        }
        this.updateManifest(this.selectedPlugins, this.observations);
        return 1;
    }

    public async copyManifestToClipboard() {
        if (this.prepareManifest() < 0) {
            return;
        }

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
        if (this.prepareManifest() < 0) {
            return;
        }

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
        let pluginOrderChanged$ = new Subject<PluginData[]>();
        let plugins = [...this.selectedPlugins].map(p => {
            let input: InputData[] = [];
            p.manifestAttributes.input.forEach(attr => {
                if (attr.name.startsWith('<') && attr.name.endsWith('>')) {
                    let parent = findParentInput(attr.name, p);
                    if (parent && parent.type == "list" && parent.value) {
                        parent.value.split(',').forEach(child => {
                            input.push({
                                name: child.trim(),
                                type: "",
                                unit: getUnitLabel(attr.unit, p),
                                optional: attr.optional
                            });
                        });
                    } else {
                        let name = (parent && parent.value) ? parent.value : attr.name;
                        input.push({
                            name: name,
                            type: "",
                            unit: getUnitLabel(attr.unit, p),
                            optional: attr.optional
                        });
                    }
                } else {
                    input.push({
                        name: getInputLabel(attr.name, p),
                        type: "",
                        unit: getUnitLabel(attr.unit, p),
                        optional: attr.optional
                    });
                }
            });
            let manifestAttributes = {globalConfig: [], config: [], input, defaults: []}
            let outputAttributes = p.outputAttributes.map(attr => {
                return {name: getInputLabel(attr.name, p), unit: getUnitLabel(attr.unit, p)}
            });

            return {name: p.name, method: p.method, pipelineId: p.pipelineId, manifestAttributes, outputAttributes}
        });


        this.dialog.open(PipelineDialogComponent, {
            data: {plugins, orderChanged$: pluginOrderChanged$},
            autoFocus: false
        });

        this.subscriptions.push(pluginOrderChanged$.asObservable().subscribe((updatedPlugins: PluginData[]) => {
            this.selectedPlugins = updatedPlugins;
            this.updateManifest(this.selectedPlugins, this.observations);
        }));

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

    public isAbleToConfigurePluginsByContext(): boolean {
        return Array.from(this.observations.keys()).length > 1
            && this.selectedPlugins.findIndex(p => p.manifestAttributes.config.length > 1 || p.manifestAttributes.defaults.length > 1) >= 0;
    }

    public openPluginConfiguration() {
        let dialogRef = this.dialog.open(PluginConfigurationByContextDialogComponent, {
            data: {plugins: this.selectedPlugins, contexts: Array.from(this.observations.keys())},
            autoFocus: false
        });

        this.subscriptions.push(dialogRef.afterClosed().subscribe((updatedPluginConfiguration: PluginData[]) => {
            if (updatedPluginConfiguration && updatedPluginConfiguration.length == this.selectedPlugins.length) {
                this.selectedPlugins = updatedPluginConfiguration;
                this.updateManifest(this.selectedPlugins, this.observations);
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}