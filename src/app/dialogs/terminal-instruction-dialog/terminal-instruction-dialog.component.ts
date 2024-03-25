import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-terminal-instruction-dialog',
    templateUrl: './terminal-instruction-dialog.component.html',
    styleUrl: './terminal-instruction-dialog.component.scss'
})
export class TerminalInstructionDialog {

    constructor(public dialogRef: MatDialogRef<TerminalInstructionDialog>,
                @Inject(MAT_DIALOG_DATA) public data: string) {
    }

}
