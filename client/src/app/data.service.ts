import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'


@Injectable()
export class DataService {

  constructor(private http: Http) { }
  public getStats(){
    return this.http.get('http://localhost:3000/file').map(res => res.json());
  }
}
