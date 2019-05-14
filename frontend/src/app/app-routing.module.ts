import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MenuAdminComponent} from "./menu-table/menu-table.component";
import {AnimtestComponent} from "./animtest/animtest.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'menu', component: MenuAdminComponent },
    { path: 'animtest', component: AnimtestComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
