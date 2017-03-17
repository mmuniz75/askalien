import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import { PolymerElement } from '@vaadin/angular2-polymer';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ 
    AppComponent,
    PolymerElement('paper-input'),
    PolymerElement('paper-button'),
    PolymerElement('paper-textarea'),
    PolymerElement('paper-dialog'),
    PolymerElement('paper-dialog-scrollable'),
    PolymerElement('paper-toast'),
    PolymerElement('paper-icon-button'),
    PolymerElement('iron-icon'),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
