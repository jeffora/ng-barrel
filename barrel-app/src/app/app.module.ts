import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppModule as LibAppModule } from 'barrel-lib';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LibAppModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
