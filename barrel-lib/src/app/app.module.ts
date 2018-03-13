import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ToolModule } from '../tools';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToolModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
