import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";

@Component({
    selector: 'app-input-data-dialog',
    templateUrl: './input-data-dialog.component.html',
    styleUrl: './input-data-dialog.component.css'
})
export class InputDataDialogComponent implements OnInit, AfterViewInit {
    public headers: string[] = ["context"];
    public columns: string[] = [];
    public contexts: string[] = [];
    public dataSource: MatTableDataSource<Map<string, string>>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private allData: Map<string, string>[] = [];

    constructor(public dialogRef: MatDialogRef<InputDataDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { contexts: string[], input: Map<string, string>[], removedObservation$: Subject<Map<string, string>> | undefined }) {
    }

    ngOnInit() {
        this.data.input.forEach(d => {
            let keys: string[] = Array.from(d.keys());
            this.headers = this.headers.concat(keys);
        });
        this.headers = this.headers.filter((value, index, self) => value && self.indexOf(value) === index);
        if (this.data.removedObservation$) {
            this.columns = this.headers.concat("action");
        } else {
            this.columns = this.headers;
        }
        this.allData = [...this.data.input]
        this.dataSource = new MatTableDataSource([...this.data.input]);
        this.dataSource.sortingDataAccessor = (map, property) => {
            return map.get(property)!;
        };
        this.contexts = this.data.contexts;
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }


    public getTableContent(key: string, valueMap: Map<string, string>): string {
        if (valueMap.has(key)) {
            return valueMap.get(key)!;
        }
        return "-";
    }

    public filterByContexts(contexts: string[]) {
        if (contexts.length == this.contexts.length || contexts.length == 0) {
            this.dataSource = new MatTableDataSource(this.allData);
        } else {
            this.dataSource = new MatTableDataSource(this.allData.filter(d => contexts.includes(d.get("context") || "")));
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator!.firstPage();
    }

    public editObservation(observation: Map<string, string>) {
        this.dialogRef.close(observation);
    }

    public removeObservation(observation: Map<string, string>) {
        this.allData = this.allData.filter(d => d != observation)
        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        if (this.data.removedObservation$) {
            this.data.removedObservation$.next(observation);
        }
    }

    public downloadDataAsCSV() {
        let csvContent = this.headers.toString() + "\r\n";
        this.dataSource.data.forEach(observation => {
            let line = "";
            this.headers.forEach(h => {
                let content = observation.get(h) || '';
                line += content + ","
            })
            line = line.substring(0, line.length - 1) + "\r\n";
            csvContent += line;
        })

        const blob = new Blob([csvContent], {type: 'csv'});
        const url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = `manifest-wizard-observations.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
