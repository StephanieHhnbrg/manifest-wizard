import {Routes} from "@angular/router";
import {ManifestCreatorComponent} from "./components/manifest-creator/manifest-creator.component";
import {VisualizationDashboardComponent} from "./components/visualization-dashboard/visualization-dashboard.component";

export const ROUTES: Routes = [
    {path: 'create', component: ManifestCreatorComponent},
    {path: 'visualize', component: VisualizationDashboardComponent},
    {path: '', redirectTo: '/create', pathMatch: 'full'}
];