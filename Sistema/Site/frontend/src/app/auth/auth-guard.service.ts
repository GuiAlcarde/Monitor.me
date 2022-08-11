import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(){
    
    // const token = localStorage.getItem('token') || null;

    if(localStorage.getItem('token') != null){
      return true;
    }

    this.router.navigate(['/home/login'])

    return false;

  }

}
