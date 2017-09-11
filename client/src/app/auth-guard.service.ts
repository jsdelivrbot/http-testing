import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
  canActivate(){
    console.log("Auth guard was activated!")
    return true;
  }
}
