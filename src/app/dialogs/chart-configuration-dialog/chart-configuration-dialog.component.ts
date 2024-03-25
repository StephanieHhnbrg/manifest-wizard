import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChartAggregation, ChartData, ChartType} from "../../data/chart.data";
import {TranslateService} from "@ngx-translate/core";
import {OutputData} from "../../data/plugin.data";

@Component({
    selector: 'app-chart-configuration-dialog',
    templateUrl: './chart-configuration-dialog.component.html',
    styleUrl: './chart-configuration-dialog.component.css'
})
export class ChartConfigurationDialogComponent implements OnInit {

    public charts: ChartData[] = [];
    public fields: OutputData[] = [];

    public CHART_TYPES: string[] = Object.values(ChartType);
    public CHART_AGGREGATIONS: string[] = Object.values(ChartAggregation);

    constructor(private translate: TranslateService,
                public dialogRef: MatDialogRef<ChartConfigurationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { charts: ChartData[], fields: OutputData[] }) {
    }

    ngOnInit() {
        this.charts = this.data.charts;
        this.fields = this.data.fields;
    }

    editVisibility(chart: ChartData) {
        chart.hidden = !chart.hidden;
    }

    public createPieChart(fieldName: string, aggregation: ChartAggregation) {
        console.log(fieldName);
        let label = `${this.translate.instant(aggregation)}: ${fieldName}`;
        let field = this.fields.find(f => f.name == fieldName);
        if (field && field.unit) {
            label += ` (${field.unit})`
        }
        console.log(label);
        let chart: ChartData = {
            fields: [fieldName],
            type: ChartType.PIE_CHART,
            label,
            aggregation,
            data: [],
            hidden: false
        };
        this.dialogRef.close(chart);
    }

    public createLineChart(fields: string[], yAxis: string, aggregatedBySum: boolean) {
        let aggregation = aggregatedBySum ? ChartAggregation.SUM : undefined;
        let chart: ChartData = {
            fields: fields,
            type: ChartType.LINE_CHART,
            label: yAxis,
            aggregation,
            data: [],
            hidden: false
        };
        this.dialogRef.close(chart);
    }
}
