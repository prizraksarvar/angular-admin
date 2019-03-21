import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { HttpClientModule }    from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AutorizationComponent} from './autorization/autorization.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MenuAdminComponent } from './admin_components/menu/menu.component';
import { CookieService } from 'ngx-cookie-service';
import { MessagelogComponent } from './messagelog/messagelog.component';
import {CoreInputViewComponent} from "./admin_components/core/field-views/core-input-view.component";
import {CoreFieldViewerComponent} from "./admin_components/core/core-field-viewer.component";
import {CoreTextViewComponent} from "./admin_components/core/field-views/core-text-view.component";
import {CoreFieldViewerDirective} from "./admin_components/core/core-field-viewer.directive";

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
        CoreTextViewComponent
    ],
    entryComponents: [CoreInputViewComponent, CoreTextViewComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
