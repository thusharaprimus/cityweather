import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocationService} from './location.service';

@Injectable()
export class WeatherService {
  key:String = 'f614cac603af42f2b17155633172305';

  constructor(public http: Http) {
  }

  public load(location:String):Promise<any> {

      return this.http.get('http://api.apixu.com/v1/forecast.json?key=f614cac603af42f2b17155633172305&q='+location)
      .toPromise()
        .then(res => res.json())
        
  }
}