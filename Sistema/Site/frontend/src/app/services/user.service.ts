import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../institucional/login/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from 'events';

const ApiRoutes = {
  login: 'sessions',
  cadastrar: 'cadastrar'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UrlApi = "https://monitor-bandtec.herokuapp.com"
  baseConsultaLogin = "https://monitor-bandtec.herokuapp.com/sessions";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  public cadastrar(user: any){
    let url = `${this.UrlApi}/${ApiRoutes.cadastrar}`;
    return this.http.post(url, JSON.stringify(user), this.loadHeaders())
  }

  public login(user : any){
    let url = `${this.UrlApi}/${ApiRoutes.login}`;
    return this.http.post(url, JSON.stringify(user), this.loadHeaders())
  }

  public loadHeaders (token: string = ''){
    // console.log(token)
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `${token}`
    });

    return { headers };
  }

  show(msg: string){
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    })
  }

}
