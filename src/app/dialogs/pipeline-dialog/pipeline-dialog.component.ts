import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PluginData} from "../../data/plugin.data";

@Component({
    selector: 'app-pipeline-dialog',
    templateUrl: './pipeline-dialog.component.html',
    styleUrl: './pipeline-dialog.component.scss'
})
export class PipelineDialogComponent {

    public plugins: PluginData[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: PluginData[]) {
        this.plugins = data;
    }

    public isDefinedByPrevPluginOutput(inputParam: string, index: number): boolean {
        if (index == 0) {
            return false;
        }
        for (let i = 0; i < index; i++) {
            let r = this.plugins[i].outputAttributes.find(output => output.name == inputParam);
            if (r) {
                return true;
            }
        }
        return false;
    }

}
