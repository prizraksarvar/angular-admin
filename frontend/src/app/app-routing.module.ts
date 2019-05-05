import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {MenuAdminComponent} from "./pages/menu/menu.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'menu', component: MenuAdminComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}