import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {WeatherService} from './weather.service';
import {LocationService} from './location.service';
import {CurrencyService} from './currency.service';

@Component({
  selector: 'app-root',
  providers: [WeatherService,LocationService,CurrencyService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
    
   public city = "Colombo";
   public geocoded:any = {};
   private weather : string  = "";
   private currency : string ="";

   
  
   constructor(public weatherService:WeatherService, private locationserv:LocationService , public currencyService:CurrencyService) {}

   public sub(): void{
     this.locationserv.locate(this.city).then(res => {
       console.log(res.results[0]);
       this.geocoded = res.results[0];
      this.weatherService.load(this.geocoded.address_components[0].short_name).then(data => {
        console.log(data);
        this.weather = data;
      this.currencyService.getCurrency(this.geocoded.address_components[3].long_name).then(curren =>{
        console.log(curren);
      })
        
      });
     })
     
   }
  
}
