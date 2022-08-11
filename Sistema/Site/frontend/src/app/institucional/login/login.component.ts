import { Router } from '@angular/router';
import { Usuario } from './usuario.model';
import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = {
      email: '',
      password: ''
    }
  }

  async signin(form) {

    try {
      console.log(`${JSON.stringify(form.value)}`)
      const response = await this.userService.login(this.user).toPromise();

      if (response['token']) {
        const token = response['token'];
        const id = response['userAtivo']['id'];
        const cellphone = response['userAtivo']['cellphone']
        const name = response['userAtivo']['name']
        const email = response['userAtivo']['email']
        const idTelegram = response['userAtivo']['idTelegram']

        console.log('><>>>',response)

        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('contato', cellphone);
        localStorage.setItem('email', email);
        localStorage.setItem('idTelegram', idTelegram);
        

        this.userService.show(`Bem vindo, Logado com sucesso!`)

        this.router.navigate(['/sistema/dashboard'])

        this.userService.show('Que bom que voltou, bem vindo... ' + name)

        return
      }
    } catch (err) {
      console.log('Error:', err)
    }

    return this.userService.show(`Login Inválido!`);
  }
}