import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LocationService {
  key:String = 'AIzaSyDq-7Z0ksX1o2lrnNVQ8OH8XGlnDqedfJw';
  
  constructor(public http: Http) {}

  public locate(address): Promise<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address)+'&key='+this.key)
      .toPromise()
      .then(res => res.json())
  }
}
