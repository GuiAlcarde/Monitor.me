import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
// import { request } from 'http';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');    
         
    if(!token){
        return next.handle(req);
    }else{
        req.clone({setHeaders: {'Authorization': `bearer ${token}`}})
        return next.handle(req)
    }
  }
}