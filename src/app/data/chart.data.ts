export interface ChartData {
    label: string;
    fields: string[];
    type: ChartType;
    aggregation?: ChartAggregation;

    data: any[];
    hidden: boolean;
}

export interface ChartSeries {
    name: string;
    series: SeriesData[];
}

export interface SeriesData {
    name: string; // Timestamp
    value: number;
}

export enum ChartType {
    LINE_CHART = "CHARTS.LINE_CHART",
    PIE_CHART = "CHARTS.PIE_CHART",

}

export enum ChartAggregation {
    SUM = "CHARTS.SUM",
    AVG = "CHARTS.AVG",
    MIN = "CHARTS.MIN",
    MAX = "CHARTS.MAX",

}