import {Component, OnDestroy, OnInit} from '@angular/core';
import {OutputData, PluginData} from "../../data/plugin.data";
import {ScaleType} from "@swimlane/ngx-charts";
import {PLUGINS} from "../../data/plugins.data";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {InputDataDialogComponent} from "../../dialogs/input-data-dialog/input-data-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
    ChartConfigurationDialogComponent
} from "../../dialogs/chart-configuration-dialog/chart-configuration-dialog.component";
import {ChartAggregation, ChartData, ChartSeries, ChartType, SeriesData} from "../../data/chart.data";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-visualization-dashboard',
    templateUrl: './visualization-dashboard.component.html',
    styleUrl: './visualization-dashboard.component.scss'
})
export class VisualizationDashboardComponent implements OnInit, OnDestroy {

    public filename: string;
    public projectName: string;
    public usedPlugins: PluginData[] = [];
    public contexts: string[] = [];
    public fields: OutputData[] = [];
    public charts: ChartData[] = [];
    private observationContextMap = new Map<string, Map<string, string>[]>();
    private subscriptions: Subscription[] = [];
    colorScheme = {
        name: 'myScheme',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#78BC61', '#F25F5C', '#FFE066',
            '#345995', '#391463', '#74226C',
            '#DC9956', '#7CC6FE', '#CA1551']
    };

    view: [number, number];

    constructor(
        private snackBar: MatSnackBar,
        private translate: TranslateService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.view = [window.screen.width * 0.9, window.screen.height * 0.3];
    }

    public onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (!file || file.type != "application/x-yaml") {
            let msg = this.translate.instant("SNACKBAR.UPLOAD_YAML_FILE");
            this.snackBar.open(msg, '', {duration: 5000});
            return;
        }

        this.filename = file.name;
        this.parseFile(file);
    }

    private parseFile(file: File) {
        file.text().then(data => {
            this.reset();
            this.projectName = data.split("\n")[0].split(": ")[1];
            let parts = data.split("if-version");
            this.extractPlugins(parts[0]);
            console.log(this.usedPlugins);
            this.extractContextsAndOutput(parts[1]);
            this.fields.filter(f => f.name != "timestamp" && f.name != "duration").forEach(f => {
                this.charts.push(this.createLineChart(f));
            })
        });
    }

    private reset() {
        this.usedPlugins = [];
        this.contexts = [];
        this.fields = [];
        this.charts = [];
        this.observationContextMap = new Map<string, Map<string, string>[]>();
    }

    private extractPlugins(data: string) {
        let plugins = [...PLUGINS];
        let lines = data.split("\n").filter(line => line.includes("method:"));
        lines.forEach(line => {
            let plugin = plugins.find(p => line.endsWith(p.method));
            if (plugin) {
                this.usedPlugins.push(plugin);
            }
        });
    }

    private extractContextsAndOutput(data: string) {
        let lines = data.split("\n");
        let currentContext = "";
        let processingOutput = false;
        let observation = new Map<string, string>();

        lines.forEach((line, index) => {
            if (line.startsWith("    ") && !line.startsWith("     ")) {
                if (observation.size > 0) {
                    this.observationContextMap.get(currentContext)!.push(observation);
                    observation = new Map<string, string>();
                }
                currentContext = line.replace(":", "").trim();
                this.observationContextMap.set(currentContext, []);
                this.contexts.push(currentContext);
                processingOutput = false;
            } else if (line.includes("outputs:")) {
                processingOutput = true;
            } else if (processingOutput) {
                if (line.startsWith("        - ") && observation.size > 0) {
                    this.observationContextMap.get(currentContext)!.push(observation);
                    observation = new Map<string, string>();
                }

                let key = line.split(":")[0].replace(" - ", "").trim();
                if (key.length > 0) {
                    if (!this.fields.find(f => f.name == key)) {
                        console.log("+" + key + "+");
                        let unit: string | undefined = undefined;
                        for (let p of this.usedPlugins) {
                            let output = p.outputAttributes.find(o => o.name == key);
                            if (output) {
                                unit = output.unit;
                                break;
                            }

                            let inputFields = p.manifestAttributes.input
                                .concat(p.manifestAttributes.config)
                                .concat(p.manifestAttributes.defaults)
                                .concat(p.manifestAttributes.globalConfig);
                            let input = inputFields.find(i => i.name == key);
                            if (input) {
                                unit = input.unit;
                                break;
                            }
                        }
                        this.fields.push({name: key, unit});
                    }

                    let separator = line.indexOf(":");
                    observation.set(key, line.substring(separator + 1));
                }
            }
        });
        this.observationContextMap.get(currentContext)!.push(observation);
    }

    private createLineChart(field: OutputData): ChartData {
        let result: ChartSeries[] = [];
        this.contexts.forEach(c => {
            let series: SeriesData[] = [];
            this.observationContextMap.get(c)!.forEach(obs => {
                let timestamp = obs.get("timestamp")!;
                let value = +obs.get(field.name)!;
                series.push({name: timestamp, value});
            });
            result.push({name: c, series});
        });
        let label: string = field.unit ? `${field.name} (${field.unit})` : field.name;
        return {label: label, fields: [field.name], data: result, hidden: false, type: ChartType.LINE_CHART};
    }

    private addLineChartData(chart: ChartData): ChartData {
        if (chart.fields.length == 0) {
            return chart;
        }

        let result: ChartSeries[] = [];
        this.contexts.forEach(c => {
            chart.fields.forEach(f => {
                let series: SeriesData[] = [];
                this.observationContextMap.get(c)!.forEach(obs => {
                    let timestamp = obs.get("timestamp")!;
                    let value = +obs.get(f)!;
                    series.push({name: timestamp, value});
                });
                result.push({name: `${c}: ${f}`, series});
            });
        });
        return {...chart, data: result};
    }

    private addAggregatedLineChartData(chart: ChartData): ChartData {
        if (chart.fields.length == 0) {
            return chart;
        }

        let result: ChartSeries[] = [];
        this.contexts.forEach(c => {
            let series: SeriesData[] = [];
            this.observationContextMap.get(c)!.forEach(obs => {
                let timestamp = obs.get("timestamp")!;
                let total = 0;
                chart.fields.forEach(f => {
                    total += +obs.get(f)!;
                });
                series.push({name: timestamp, value: total});
            });
            result.push({name: c, series});
        });
        return {...chart, data: result};
    }

    private addPieChartData(chart: ChartData): ChartData {
        if (chart.fields.length == 0) {
            return chart;
        }

        let data: { name: string, value: number }[] = [];
        this.contexts.forEach(c => {
            let result = 0;
            this.observationContextMap.get(c)!.forEach(obs => {
                switch (chart.aggregation) {
                    case ChartAggregation.SUM:
                    case ChartAggregation.AVG:
                        result += +obs.get(chart.fields[0])!;
                        break;
                    case ChartAggregation.MIN:
                        result = Math.min(result, +obs.get(chart.fields[0])!);
                        break;
                    case ChartAggregation.MAX:
                        result = Math.max(result, +obs.get(chart.fields[0])!);
                        break;
                }
            });
            if (chart.aggregation == ChartAggregation.AVG) {
                result = result / this.observationContextMap.get(c)!.length;
            }
            data.push({name: c, value: result});
        });
        return {...chart, data};

    }

    public showInputData() {
        let input: Map<string, string>[] = [];
        this.contexts.forEach(c => {
            this.observationContextMap.get(c)!.forEach(obs => {
                let inputObs = new Map(obs);
                inputObs.set("context", c);
                input.push(inputObs);
            })
        });
        this.dialog.open(InputDataDialogComponent, {
            data: {contexts: this.contexts, input, undefined},
            autoFocus: false
        });
    }

    public openChartConfiguration() {
        let dialogRef = this.dialog.open(ChartConfigurationDialogComponent, {
            data: {charts: this.charts, fields: this.fields.filter(f => f.name != "timestamp" && f.name != "duration")}
        })

        this.subscriptions.push(dialogRef.afterClosed().subscribe((newChart: ChartData) => {
            if (newChart) {
                switch (newChart.type) {
                    case ChartType.PIE_CHART:
                        this.charts.push(this.addPieChartData(newChart));
                        break;
                    case ChartType.LINE_CHART:
                        if (newChart.aggregation == ChartAggregation.SUM) {
                            this.charts.push(this.addAggregatedLineChartData(newChart));
                        } else {
                            this.charts.push(this.addLineChartData(newChart));
                        }
                        break;
                }
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}

