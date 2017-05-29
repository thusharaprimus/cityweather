import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LocationService }  from './location.service';
import { WeatherService }  from './weather.service';
import { CurrencyService }  from './currency.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [LocationService,WeatherService,CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
