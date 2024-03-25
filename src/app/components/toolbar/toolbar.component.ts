import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialog} from "../../dialogs/info-dialog/info-dialog.component";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

    constructor(private translate: TranslateService,
                private dialog: MatDialog) {
    }

    public switchLanguage(lang: string) {
        this.translate.use(lang);
    }

    public openInfoDialog() {
        this.dialog.open(InfoDialog, {
            autoFocus: false
        });
    }

}

