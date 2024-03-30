import {Component, Inject, ViewChild} from '@angular/core';
import {PluginData} from "../../data/plugin.data";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InputData} from "../../data/input.data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SciPlugin} from "../../plugins/sci.plugin";
import {CsvExportPlugin} from "../../plugins/csvExport.plugin";

@Component({
  templateUrl: './plugin-configuration-by-context-dialog.component.html',
  styleUrl: './plugin-configuration-by-context-dialog.component.css'
})
export class PluginConfigurationByContextDialogComponent {

  public configHeaders: string[] = ["context"];
  public configDataSource = new MatTableDataSource<Map<string, string>>([]);
  @ViewChild(MatPaginator) configPaginator: MatPaginator;

  public defaultsHeaders: string[] = ["context"];
  public defaultsDataSource = new MatTableDataSource<Map<string, string>>([]);
  @ViewChild(MatPaginator) defaultsPaginator: MatPaginator;


  public plugins: PluginData[] = [];
  public contexts: string[];

  constructor(public dialogRef: MatDialogRef<PluginConfigurationByContextDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { plugins: PluginData[], contexts: string[] }) {
    this.plugins = data.plugins;
    this.contexts = data.contexts;

    this.plugins
        .filter(p => p.name != CsvExportPlugin.name && p.name != SciPlugin.name)
        // for some reason these plugins have context configs fields defined, which should be actually globally
        .forEach((p, pIndex) => {
          if (!p.manifestAttributes.configByContext) {
            p.manifestAttributes.configByContext = new Map<string, InputData[]>();
          }
          if (!p.manifestAttributes.defaultsByContext) {
            p.manifestAttributes.defaultsByContext = new Map<string, InputData[]>();
          }
          this.contexts.forEach((c, cIndex) => {
            let configMap = new Map<string, string>();
            let defaultsMap = new Map<string, string>();
            if (pIndex == 0) {
              configMap.set("context", c);
              defaultsMap.set("context", c);
            } else {
              configMap = this.configDataSource.data[cIndex];
              defaultsMap = this.defaultsDataSource.data[cIndex];
            }

            if (!p.manifestAttributes.configByContext!.has(c)) {
              p.manifestAttributes.configByContext!.set(c, p.manifestAttributes.config);
            }
            p.manifestAttributes.configByContext!.get(c)!.forEach(config => {
              configMap.set(config.name, config.value || "");
            });

            if (!p.manifestAttributes.defaultsByContext!.has(c)) {
              p.manifestAttributes.defaultsByContext!.set(c, p.manifestAttributes.defaults);
            }
            p.manifestAttributes.defaultsByContext!.get(c)!.forEach(d => {
              defaultsMap.set(d.name, d.value || "");
            });

            if (pIndex == 0) {
              this.configDataSource.data.push(configMap);
              this.defaultsDataSource.data.push(defaultsMap);
            }
          });

          let configs = p.manifestAttributes.config.map(c => c.name);
          this.configHeaders = this.configHeaders.concat(configs);

          let defaults = p.manifestAttributes.defaults.map(d => d.name);
          this.defaultsHeaders = this.defaultsHeaders.concat(defaults);
        });

    this.configHeaders = this.configHeaders.filter((value, index, self) => value && self.indexOf(value) === index);
    this.defaultsHeaders = this.defaultsHeaders.filter((value, index, self) => value && self.indexOf(value) === index);

    this.configDataSource.sortingDataAccessor = (map, property): string | number => {
      let value = map.get(property)!;
      return isNaN(Number(value)) ? value : +value;
    };
    this.defaultsDataSource.sortingDataAccessor = (map, property): string | number => {
      let value = map.get(property)!;
      return isNaN(Number(value)) ? value : +value;
    };
  }

  public getTableContent(key: string, valueMap: Map<string, string>): string {
    if (valueMap.has(key)) {
      return valueMap.get(key)!;
    }
    return '';
  }

  public changeTableContent(key: string, valueMap: Map<string, string>, value: string) {
    valueMap.set(key, value);
  }


  public isTableEmpty(dataSource: MatTableDataSource<Map<string, string>>): boolean {
    return !dataSource.data.find(m => m.size > 1);
  }

  public save() {
    this.plugins
        .filter(p => p.name != CsvExportPlugin.name && p.name != SciPlugin.name)
        .forEach((p, pIndex) => {
          this.contexts.forEach(context => {
            let updatedConfigData = this.configDataSource.data.find(entry => entry.get("context")! == context)!;
            let toBeChangedConfigData = p.manifestAttributes.configByContext!.get(context)!
            toBeChangedConfigData = toBeChangedConfigData.map(config => {
              let update = updatedConfigData.get(config.name)!;
              return {...config, value: update}
            });
            p.manifestAttributes.configByContext!.set(context, toBeChangedConfigData);

            let updatedDefaultData = this.defaultsDataSource.data.find(entry => entry.get("context")! == context)!;
            let toBeChangedDefaultData = p.manifestAttributes.defaultsByContext!.get(context)!
            toBeChangedDefaultData = toBeChangedDefaultData.map(config => {
              let update = updatedDefaultData.get(config.name)!;
              return {...config, value: update}
            });
            p.manifestAttributes.defaultsByContext!.set(context, toBeChangedDefaultData);
          });

          if (Array.from(p.manifestAttributes.configByContext!.values()).filter(v => v.length == 0).length == this.contexts.length) {
            p.manifestAttributes.configByContext = undefined;
          }
          if (Array.from(p.manifestAttributes.defaultsByContext!.values()).filter(v => v.length == 0).length == this.contexts.length) {
            p.manifestAttributes.defaultsByContext = undefined;
          }
        });
    this.dialogRef.close(this.plugins);
  }

}
