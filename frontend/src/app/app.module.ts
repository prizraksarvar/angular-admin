import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorizationComponent } from './autorization/autorization.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MenuAdminComponent } from './menu-table/menu-table.component';
import { CookieService } from 'ngx-cookie-service';
import { MessagelogComponent } from './messagelog/messagelog.component';
import { CoreInputViewComponent } from "./core-field/views/core-input-view.component";
import { CoreFieldViewerComponent } from "./core-field/core-field-viewer.component";
import { CoreTextViewComponent } from "./core-field/views/core-text-view.component";
import { CoreFieldViewerDirective } from "./core-field/core-field-viewer.directive";
import { MockService } from "./services/mock.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SrvcorpModule} from "../srvcorp/srvcorp.module";
import {TestCardDirective} from "./test-card/test-card.directive";
import {TestListComponent} from "./test-list/test-list.component";
import {TestCardComponent} from "./test-card/test-card.component";
import {AnimtestComponent} from "./animtest/animtest.component";
import {TestMenuComponent} from "./test-menu/test-menu.component";

@NgModule({
  declarations: [
    AppComponent,
    AutorizationComponent,
    DashboardComponent,
    MenuComponent,
    MenuAdminComponent,
    MessagelogComponent,
    CoreInputViewComponent,
    CoreFieldViewerComponent,
    CoreFieldViewerDirective,
    CoreTextViewComponent,
    TestCardDirective,
    TestCardComponent,
    TestListComponent,
    TestMenuComponent,
    AnimtestComponent
  ],
  entryComponents: [CoreInputViewComponent, CoreTextViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SrvcorpModule
  ],
  providers: [
    CookieService,
    { provide: 'AutorizationService', useClass: MockService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
