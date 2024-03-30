import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PluginData} from "../../data/plugin.data";
import {Subject} from "rxjs";

@Component({
    selector: 'app-pipeline-dialog',
    templateUrl: './pipeline-dialog.component.html',
    styleUrl: './pipeline-dialog.component.scss'
})
export class PipelineDialogComponent {

    public plugins: PluginData[] = [];
    public isChangingOrder = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { plugins: PluginData[], orderChanged$: Subject<PluginData[]> }) {
        this.plugins = data.plugins;
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

    public changeOrder() {
        this.isChangingOrder = !this.isChangingOrder;
    }

    public switchWithPrevious(index: number) {
        if (index == 0 || this.plugins.length <= 1) {
            return;
        }
        let prev = {...this.plugins[index - 1]};
        let current = {...this.plugins[index]};
        this.plugins[index] = prev;
        this.plugins[index - 1] = current;
        this.data.orderChanged$.next(this.plugins);
    }

    public switchWithNext(index: number) {
        if (index >= this.plugins.length - 1) {
            return;
        }
        let next = {...this.plugins[index + 1]};
        let current = {...this.plugins[index]};
        this.plugins[index] = next;
        this.plugins[index + 1] = current;
        this.data.orderChanged$.next(this.plugins);
    }

}
