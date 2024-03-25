import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatBadgeModule} from "@angular/material/badge";
import {provideRouter, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ROUTES} from "./app.routes";
import {CommonModule} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import {MatExpansionModule} from "@angular/material/expansion";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ManifestCreatorComponent} from "./components/manifest-creator/manifest-creator.component";
import {TerminalInstructionDialog} from "./dialogs/terminal-instruction-dialog/terminal-instruction-dialog.component";
import {InfoDialog} from "./dialogs/info-dialog/info-dialog.component";
import {VisualizationDashboardComponent} from "./components/visualization-dashboard/visualization-dashboard.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {PipelineDialogComponent} from "./dialogs/pipeline-dialog/pipeline-dialog.component";
import {InputDataDialogComponent} from "./dialogs/input-data-dialog/input-data-dialog.component";
import {TimeStampPickerComponent} from "./components/time-stamp-picker/time-stamp-picker.component";
import {PluginConfigurationComponent} from "./components/plugin-configuration/plugin-configuration.component";
import {ObservationInputComponent} from "./components/observation-input/observation-input.component";
import {StartScreenComponent} from "./components/start-screen/start-screen.component";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {
    ChartConfigurationDialogComponent
} from "./dialogs/chart-configuration-dialog/chart-configuration-dialog.component";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        // NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        // Angular Material Modules
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatBadgeModule,
        MatDividerModule,
        MatStepperModule,
        MatRadioModule,
        MatMenuModule,
        MatChipsModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatProgressBarModule,
        NgxChartsModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTabsModule,
    ],
    declarations: [
        AppComponent,
        ToolbarComponent,
        ManifestCreatorComponent,
        PluginConfigurationComponent,
        ObservationInputComponent,
        TimeStampPickerComponent,
        StartScreenComponent,
        VisualizationDashboardComponent,
        InfoDialog,
        PipelineDialogComponent,
        InputDataDialogComponent,
        TerminalInstructionDialog,
        ChartConfigurationDialogComponent,
    ],
    providers: [provideRouter(ROUTES), provideNativeDateAdapter()],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}


