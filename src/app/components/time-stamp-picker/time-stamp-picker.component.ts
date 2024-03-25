import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
    selector: 'app-time-stamp-picker',
    templateUrl: './time-stamp-picker.component.html',
    styleUrl: './time-stamp-picker.component.scss'
})
export class TimeStampPickerComponent {

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
    @Input() label: string = "";
    @Output() change = new EventEmitter<string>();
    public isInputValid = true;

    private readonly TIMESTAMP_REGEX = "(19|20)\\d{2}-(0[1-9]|1[1,2])-(0[1-9]|(1|2)[0-9]|3(0|1)) ((0|1)[0-9]|2[1-3]):([0-5][0-9])";

    constructor() {
    }

    @Input()
    public set initValue(timestamp: string | undefined) {
        if (timestamp && timestamp.length > 0) {
            (<HTMLInputElement>document.getElementById("input")).value = timestamp;
        }
    }

    public getFormattedTimeStamp(date: string, time: string): string {
        let parts = date.split('/');
        if (parts.length == 3) {
            let month = parts[0].length == 1 ? 0 + parts[0] : parts[0];
            let day = parts[1].length == 1 ? 0 + parts[1] : parts[1]
            let year = parts[2];
            return `${year}-${month}-${day} ${time}`;
        } else if (parts.length > 1) {
            return 'YYYY-MM-DD hh:mm';
        }
        return " ";
    }

    public updateTimestampByPicker(date: string) {
        this.isInputValid = true;
        // TODO: add TimePicker
        let formatted = this.getFormattedTimeStamp(date, "00:00");
        if (new RegExp(this.TIMESTAMP_REGEX).test(formatted)) {
            this.change.emit(formatted);
        }
    }

    public updateTimestampByInput(timestamp: any) {
        this.isInputValid = new RegExp(this.TIMESTAMP_REGEX).test(timestamp);
        if (this.isInputValid) {
            this.change.emit(timestamp);
        }
    }
}
