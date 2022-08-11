import { UserService } from './../../../services/user.service';
import { Hardware } from '../components/hardware/hardware.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  private UserId = `${localStorage.getItem('id')}`;

  // baseCadastro = `https://monitor-bandtec.herokuapp.com/sistema/cadastrar/${this.UserId}/novoHardware`
  baseConsulta = `https://monitor-bandtec.herokuapp.com/sistema/${this.UserId}/events`

  urlApiSistema = "https://monitor-bandtec.herokuapp.com/sistema"

  constructor(private snackBar: MatSnackBar, private http: HttpClient,private userService: UserService) { }

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

  // createHardware(hardware: Hardware, token: string = ''): Observable<Hardware> {
  //   return this.http.post<Hardware>(this.baseCadastro, hardware, this.loadHeaders(token))
  // }

  readHardware(token: string = ''): Observable<Hardware[]>{
    return this.http.get<Hardware[]>(this.baseConsulta, this.loadHeaders(token))
  }

  readById(id: string, token: string = ''): Observable<Hardware>{
    const url = `${this.baseConsulta}/${id}` 
    return this.http.get<Hardware>(url, this.loadHeaders(token));
  }

  update(hardware: Hardware, token: string = ''): Observable<Hardware>{
    const url = `${this.baseConsulta}/${hardware.id}` 
    console.log('>>', url)
    return this.http.put<Hardware>(url, hardware, this.loadHeaders(token));
  } 
}
