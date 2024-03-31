import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {PluginCategory, PluginData} from "../../data/plugin.data";
import {TranslateService} from "@ngx-translate/core";
import {PLUGINS} from "../../data/plugins.data";

@Component({
  templateUrl: './plugin-overview-dialog.component.html',
  styleUrl: './plugin-overview-dialog.component.scss'
})
export class PluginOverviewDialogComponent implements OnInit, AfterViewInit {

  public categoryFilter: PluginCategory | undefined;
  public headers: string[] = ["PLUGIN", "CATEGORY", "DESCRIPTION"];
  public dataSource: MatTableDataSource<PluginData>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private translate: TranslateService) {
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(PLUGINS);
    this.dataSource.sortingDataAccessor = (plugin, property): string => {
      return plugin.name;
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  filterByCategory(category: PluginCategory) {
    this.categoryFilter = category;
    this.dataSource.data = PLUGINS.filter(plugin => plugin.pCategory.includes(category));
  }

  removeFilter() {
    this.categoryFilter = undefined;
    this.dataSource.data = PLUGINS;
  }

  getTranslateKeyForHeader(header: string): string {
    return `PLUGIN_OVERVIEW_DIALOG.${header}`;
  }

  getTranslateKeyForPluginDesc(plugin: PluginData): string {
    return `PLUGIN.${plugin.method.toUpperCase()}.DESCRIPTION`;
  }

  getCssClassForCategoryChip(category: PluginCategory): string {
    switch (category) {
      case PluginCategory.ARITHMETIC:
        return "chip-arithmetic";
      case PluginCategory.CARBON:
        return "chip-carbon";
      case PluginCategory.CLOUD:
        return "chip-cloud";
      case PluginCategory.CPU:
        return "chip-cpu";
      case PluginCategory.ENERGY:
        return "chip-energy";
      case PluginCategory.HELPER:
        return "chip-helper";
      case PluginCategory.RESTRUCTURE:
        return "chip-restructure";
    }
  }
}
