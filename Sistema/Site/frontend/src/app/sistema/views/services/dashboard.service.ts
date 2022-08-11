import { UserService } from './../../../services/user.service';
import { Hardware } from '../components/hardware/hardware.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataJson } from 'src/app/models/dataHard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private UserId = `${localStorage.getItem('id')}`;
  baseConsulta = `https://monitor-bandtec.herokuapp.com/sistema/${this.UserId}/events`
  urlApiSistema = "https://monitor-bandtec.herokuapp.com/sistema"

  constructor(private snackBar: MatSnackBar,private http: HttpClient,private userService: UserService) { }

  show(msg: string){
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    })
  }
  public loadHeaders (token: string = ''){
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `${token}`
    });

    return { headers };
  }

  readHardware(token: string = ''): Observable<DataJson[]>{
    return this.http.get<DataJson[]>(this.baseConsulta, this.loadHeaders(token))
  }
}
