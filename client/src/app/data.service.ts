import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'


@Injectable()
export class DataService {

  constructor(private http: Http) { }
// get graph data from db
  public getStats(){
    return this.http.get('http://localhost:3000/file').map(res => res.json());
  }
// post new users on registration
  public newUser(parameter){
  // parameter of type model
    return this.http.post('http://localhost:3000/signup', {parameter})
            .map(res =>res.json())
            .catch((error)=>Observable.throw(error.json().error || 'Server error'));
  }
}
