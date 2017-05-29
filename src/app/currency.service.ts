import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocationService} from './location.service';

@Injectable()
export class CurrencyService {
  key:String = '385909ce8fe523a469dc863cf2f5365d';

  constructor(public http: Http) {
  }

  public getCurrency(country:String):Promise<any> {

      return this.http.get('http://www.apilayer.net/api/live?access_key=385909ce8fe523a469dc863cf2f5365d&q='+country)
      .toPromise()
        .then(res => res.json())
        
  }
}