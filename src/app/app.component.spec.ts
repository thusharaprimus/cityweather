import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';


import { TestBed, async } from '@angular/core/testing';
import { HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { provide } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { WeatherService } from '../weather.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Search,
    WeatherService
  ]);
  
  it('should handleSubmit', inject([ Search ], (search) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();
    search.weatherSvc.weatherLocation = 'boston';
    search.handleSubmit();
    expect(console.log).toHaveBeenCalled();
  }));
});
it('should update Search term', inject([ WeatherService ], (weather) => {
      let weatherSearchTerm;
      function callback(callbackTerm) {
        weatherSearchTerm = callbackTerm;
      }
      weather.weatherSearch$.subscribe(
            weatherLocation => {
               callback(weatherLocation);
            });
     weather.weatherLocation = 'testing123';
     weather.updateSearchStream();
        
     expect(weatherSearchTerm).toEqual('testing123');
  }));
  
  it('should return a correct url', inject([DataService], (data) => {
    const seattleName = data.serviceUrls.byName('seattle');
    const seattleWithCountry = data.serviceUrls.withCountry('seattle', 'US');
    const seattleZipWithCountry = data.serviceUrls.byZip( 98101, 'US');
    
    expect(seattleName).toEqual(data.apiURL + 'weather?q=seattle' + data.authID + data.units);
    expect(seattleWithCountry).toEqual(data.apiURL + 'weather?q=seattle,US' + data.authID + data.units);
    expect(seattleZipWithCountry).toEqual(data.apiURL + 'weather?zip=98101,US' + data.authID + data.units);
  }));
  
  it('should fail on 404 or other status errors', inject([ DataService, XHRBackend ], (data, mockBackend) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              status: 404
            }
          )));
      });
    
    expect( () => { data.getWeather().subscribe(); } ).toThrow();
  }));
  
  it('service should retrieve data when called', inject([ DataService, XHRBackend ], (data, mockBackend) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: {
                main: {
                  temp: 123,
                  temp_max: 130,
                  temp_min: 110
                }
              },
              status: 200
            }
          )));
      });
    
    data.getWeather('seattle').subscribe((weather: Weather) => {
      expect(weather.main.temp).toBe(123);
      expect(weather.main.temp_max).toBe(130);
      expect(weather.main.temp_min).toBe(110);
    });
  }));
});
