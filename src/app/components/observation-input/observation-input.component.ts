import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PluginData} from "../../data/plugin.data";
import {InputData} from "../../data/input.data";
import {findParentInput, getUnitLabel} from "../../data/plugin.utils";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-observation-input',
    templateUrl: './observation-input.component.html',
    styleUrl: './observation-input.component.scss'
})
export class ObservationInputComponent {

    public contexts: string[] = [];
    public inputFields: InputData[] = [];
    public observations: Map<string, string>[] = [];
    private observationContextMap = new Map<string, Map<string, string>[]>();
    public isSubmitButtonDisabled = true;
    private noPluginsDefined = true;

    private pluginsToBeConfigured: { plugin: string, param: string }[] = [];
    public editingObservation: Map<string, string> | undefined = undefined;

    @Output() observationsEdited = new EventEmitter<Map<string, Map<string, string>[]>>();


    constructor(private snackBar: MatSnackBar,
                private translate: TranslateService) {
    }

    @Input()
    public set isOpen(showSnackbarMessages: boolean) {
        if (showSnackbarMessages && this.isSubmitButtonDisabled) {
            if (this.noPluginsDefined) {
                let msg = this.translate.instant("SNACKBAR.INFO_AT_LEAST_1PLUGIN");
                this.snackBar.open(msg, '', {duration: 5000});
            }
            this.pluginsToBeConfigured.forEach(({plugin, param}) => {
                let msg = this.translate.instant("SNACKBAR.CONFIGURE_PLUGIN_FIRST", {plugin, param})
                this.snackBar.open(msg, '', {duration: 5000});
            });
        }
    }

    @Input()
    public set selectedPlugins(plugins: PluginData[]) {
        this.isSubmitButtonDisabled = plugins.length == 0;
        this.noPluginsDefined = plugins.length == 0;

        this.inputFields = [
            {name: "timestamp", type: "timestamp"},
            {name: "duration", type: "number", unit: "secs"}
        ];

        this.pluginsToBeConfigured = [];
        plugins.forEach((plugin, index) => {
            plugin.manifestAttributes.input.forEach(input => {
                if (!this.isDefinedByPrevPluginOutput(input.name, index, plugins)) {
                    if (!(input.name.startsWith('<') && input.name.endsWith('>'))) {
                        this.inputFields.push({
                            name: input.name,
                            type: input.type,
                            unit: getUnitLabel(input.unit, plugin),
                            optional: input.optional
                        })
                    } else {
                        let parent = findParentInput(input.name, plugin);
                        if (parent && parent.value) {
                            if (parent.type != 'list') {
                                this.inputFields.push({
                                    name: parent.value,
                                    type: input.type,
                                    unit: getUnitLabel(input.unit, plugin),
                                    optional: input.optional
                                });
                            } else {
                                parent.value!.split(',').forEach(s => {
                                    if (!this.isDefinedByPrevPluginOutput(s.trim(), index, plugins)) {
                                        this.inputFields.push({
                                            name: s.trim(),
                                            type: input.type,
                                            unit: getUnitLabel(input.unit, plugin),
                                            optional: input.optional
                                        });
                                    }
                                });
                            }
                        } else if (!parent || !parent.optional) {
                            this.isSubmitButtonDisabled = true;
                            if (parent) {
                                this.pluginsToBeConfigured.push({plugin: plugin.name, param: parent.name})
                            }
                        }
                    }
                }
            });
        });
        this.inputFields = this.inputFields.filter((value, index, array) => array.findIndex(v => v.name == value.name && v.type == v.type) === index);

        if (this.editingObservation) {
            this.initEditingObservation(this.editingObservation);
        }
    }

    private isDefinedByPrevPluginOutput(inputParam: string, index: number, plugins: PluginData[]): boolean {
        if (index == 0) {
            return false;
        }
        for (let i = 0; i < index; i++) {
            let r = plugins[i].outputAttributes.find(output => output.name == inputParam);
            if (r) {
                return true;
            }
        }
        return false;
    }

    addInputData(context: string) {
        if (!this.contexts.includes(context)) {
            this.contexts.push(context);
        }
        let observation = new Map<string, string>();
        observation.set("context", context)
        this.inputFields.forEach(input => {
            observation.set(input.name, input.value || '');
        });
        this.observations.push(observation);
        this.addObservationToContextMap(observation, context);
        this.observationsEdited.emit(this.observationContextMap);
    }

    private addObservationToContextMap(observation: Map<string, string>, context: string) {
        let observation2 = new Map(observation);
        observation2.delete("context");
        if (this.observationContextMap.has(context)) {
            let update = this.observationContextMap.get(context)!.concat(observation2);
            this.observationContextMap.set(context, update);
        } else {
            this.observationContextMap.set(context, [observation2]);
        }
    }

    public onInputDataFileUploaded(event: any) {
        const file: File = event.target.files[0];
        if (!file || file.type != "text/csv") {
            let msg = this.translate.instant("SNACKBAR.UPLOAD_CSV_FILE");
            this.snackBar.open(msg, '', {duration: 5000});
            return;
        }

        file.text().then(data => {
            const list = data.split("\n");

            if (list.length > 1) {
                let headers = list[0].replace("\r", '').split(',');
                let contextIndex = headers.findIndex(h => h == "context" || h == "Context");
                if (contextIndex < 0) {
                    let msg = this.translate.instant("SNACKBAR.CSV_CONTEXT_COL_MISSING");
                    this.snackBar.open(msg, '', {duration: 5000});
                    return;
                }

                let missingFields = this.inputFields.filter(i => headers.findIndex(h => h == i.name && !i.optional) < 0)
                if (missingFields.length > 0) {
                    let fields = missingFields.map(mF => mF.name);
                    let msg = this.translate.instant("SNACKBAR.CSV_REQUIRED_HEADERS_MISSING", {fields: fields.toString()});
                    this.snackBar.open(msg, '', {duration: 5000});
                }

                list.slice(1, list.length).forEach((row, rowIndex) => {
                    let observation = new Map<string, string>();
                    let cells = [];
                    let context = "";
                    if (row.includes('"')) {
                        // comma numbers are displayed as "x,xx", therefore the row can not simply be split by ,
                        let r = row;
                        while (r.length > 0) {
                            if (r.startsWith('"')) {
                                let end = r.substring(1).indexOf('"');
                                cells.push(r.substring(1, end + 1));
                                r = end < r.length - 3 ? r.substring(end + 3) : "";
                            } else {
                                let index = r.indexOf(',');
                                let end = index >= 0 ? index : r.length - 1;
                                cells.push(r.substring(0, end));
                                r = end < r.length - 1 ? r.substring(end + 1) : "";
                            }
                        }
                    } else {
                        cells = row.replace('\r', '').split(',');
                    }

                    cells.forEach((cell, colIndex) => {
                        let inputField = this.inputFields.find(i => i.name == headers[colIndex])
                        if (inputField && inputField.type != "string") {
                            let isValid = this.validateTypeOfUploadedData(cell, inputField.type);
                            if (!isValid) {
                                let msg = this.translate.instant("SNACKBAR.CSV_INVALID_TYPE", {
                                    row: rowIndex + 2,
                                    col: colIndex + 1,
                                    type: inputField.type
                                });
                                this.snackBar.open(msg, '', {duration: 5000});
                            }
                            // TODO: only one snackbar message is shown.
                        }

                        observation.set(headers[colIndex], cell);
                        if (colIndex == contextIndex) {
                            context = cell;
                            if (!this.contexts.includes(cell)) {
                                this.contexts.push(cell);
                            }
                        }
                    });

                    if (context.trim().length == 0) {
                        let msg = this.translate.instant("SNACKBAR.CSV_CONTEXT_UNDEFINED", {row: rowIndex + 2});
                        this.snackBar.open(msg, '', {duration: 5000});
                    } else {
                        this.observations.push(observation)
                        this.addObservationToContextMap(observation, context);
                        this.observationsEdited.emit(this.observationContextMap);
                    }
                });
            }
        });
    }

    private validateTypeOfUploadedData(data: string, type: string) {
        if (type == "boolean") {
            return data.toLowerCase() == "true" || data.toLowerCase() == "false";
        } else if (type == "number") {
            return !isNaN(Number(data));
        } else if (type == "timestamp") {
            let TIMESTAMP_REGEX = "(19|20)\\d{2}-(0[1-9]|1[1,2])-(0[1-9]|(1|2)[0-9]|3(0|1)) ((0|1)[0-9]|2[0-3]):([0-5][0-9])";
            return new RegExp(TIMESTAMP_REGEX).test(data);
        }
        return true;
    }

    public editObservation(context: string) {
        if (this.editingObservation) {
            this.removeObservation(this.editingObservation);
            this.addInputData(context);
            this.editingObservation = undefined;
        }
    }

    public initEditingObservation(observation: Map<string, string>) {
        this.editingObservation = this.observations.find(o => o.get("context") == observation.get("context") && o.get("timestamp") == observation.get("timestamp"));
        (<HTMLInputElement>document.getElementById("context-input")).value = observation.get("context")!;
        this.inputFields.forEach(field => {
            field.value = observation.get(field.name);
        });
    }

    public cancelEdit() {
        this.editingObservation = undefined;
        this.inputFields.forEach(field => {
            field.value = "";
        });
    }

    public removeObservation(observation: Map<string, string>) {
        this.observations = this.observations.filter(o => o.get("context") != observation.get("context") || o.get("timestamp") != observation.get("timestamp"));
        let context = observation.get("context")!

        if (this.observationContextMap.has(context)) {
            let update = this.observationContextMap.get(context)!.filter(o => o.get("timestamp") != observation.get("timestamp"));
            if (update.length == 0) {
                this.observationContextMap.delete(context);
            } else {
                this.observationContextMap.set(context, update);

            }
        }
        this.observationsEdited.emit(this.observationContextMap);
    }

    public isString($event: any): boolean {
        return typeof $event === "string";
    }

    public areInputsMissing(): boolean {
        return this.inputFields.findIndex(i => !i.value && !i.optional) >= 0;
    }

}
