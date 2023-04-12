import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GetRequestComponent, GetRequestTypedComponent, GetRequestErrorHandlingComponent, GetRequestHeadersComponent } from './components';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        GetRequestComponent,
        GetRequestTypedComponent,
        GetRequestErrorHandlingComponent,
        GetRequestHeadersComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }