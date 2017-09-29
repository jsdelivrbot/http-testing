import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  constructor(private http: Http) { }
  public getStats(){
    return this.http.get('http://localhost:3000/file').map(res => res.json());
  }
  public newUser(parameter){
    return this.http.post('http://localhost:3000/signup', {parameter})
            .map( res=>res.json() )
            .catch((error)=> Observable.throw(error.json().error || 'Server error'));
  }
  public postData(array, username){
    return this.http.post('http://localhost:3000/postData', {array, username})
                      .map(res=>res.json())
                      .catch((error)=> Observable.throw(error.json().error || 'Server error'));
  }
}
