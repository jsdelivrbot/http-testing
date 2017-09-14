import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor( private http: Http ) { }

  isLoggedIn():Observable<boolean>{
    return this.http.get('http://localhost:3000/isLoggedIn', { withCredentials: true })
        .map((data)=>data.json())
        .map((json)=>json.ok)
        .catch((error) => Observable.throw(error.json().error || 'Server error'));
  }

  logIn(username: string, password: string){
    return this.http.post('http://localhost:3000/logIn', {username, password}, { withCredentials: true })
          .map(res=>res.json())
          .catch((error) => Observable.throw(error.json().error || 'Server error'));
  }
  logOut(){
    return this.http.post('http://localhost:3000/logOut', { withCredentials: true })
      .map(res=>res.json())
      .catch((error) => Observable.throw(error.json().error || 'Server error'));
  }
}
