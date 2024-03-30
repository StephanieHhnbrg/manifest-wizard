import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-time-stamp-picker',
    templateUrl: './time-stamp-picker.component.html',
    styleUrl: './time-stamp-picker.component.scss'
})
export class TimeStampPickerComponent {

    @Input() label: string = "";
    @Output() change = new EventEmitter<string>();

    public pickerFormControl: FormControl = new FormControl();
    public isInputValid = true;

    public timestamp = "";
    public time = "hh:mm";

    private readonly TIMESTAMP_REGEX = "(19|20)\\d{2}-(0[1-9]|1[1,2])-(0[1-9]|(1|2)[0-9]|3(0|1)) ((0|1)[0-9]|2[0-3]):([0-5][0-9])";
    private readonly DATE_REGEX = "(19|20)\\d{2}-(0[1-9]|1[1,2])-(0[1-9]|(1|2)[0-9]|3(0|1))";

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
        }
        return `YYYY-MM-DD ${time}`;
    }

    public updateTime(date: string, time: string) { // HH:MM (AM|PM)
        let ampm = time.split(" ")[1];
        let hour = +time.split(":")[0];
        let minute = time.split(":")[1].split(" ")[0];
        if (ampm == "PM" && hour < 12) {
            hour += 12;
        }
        if (ampm == "AM" && hour == 12) {
            hour = 0;
        }

        let prefix = hour < 10 ? "0" : "";
        this.time = `${prefix}${hour}:${minute}`;
        this.timestamp = this.getFormattedTimeStamp(date, this.time);
        if (new RegExp(this.TIMESTAMP_REGEX).test(this.timestamp)) {
            this.change.emit(this.timestamp);
        }
    }

    public updateDateByPicker(date: string) {
        this.isInputValid = true;
        this.timestamp = this.getFormattedTimeStamp(date, this.time);
        if (new RegExp(this.TIMESTAMP_REGEX).test(this.timestamp)) {
            this.change.emit(this.timestamp);
        }
    }

    public updateTimestampByInput(timestamp: string) {
        let isDateValid = new RegExp(this.DATE_REGEX).test(timestamp.split(" ")[0]);
        if (isDateValid) {
            let date = timestamp.split(" ")[0];
            let parts = date.split("-");
            this.pickerFormControl.setValue(new Date(+parts[0], +parts[1] - 1, +parts[2]));
        }

        this.isInputValid = new RegExp(this.TIMESTAMP_REGEX).test(timestamp);
        if (this.isInputValid) {
            this.change.emit(timestamp);
        }
    }
}
