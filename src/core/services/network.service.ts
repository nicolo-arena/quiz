import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';

  constructor(private httpClient: HttpClient) {}
  
  get(path: string): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.get(this.apiUrl + path);
  }

  post(path: string, body: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + path, body);
  }

}
