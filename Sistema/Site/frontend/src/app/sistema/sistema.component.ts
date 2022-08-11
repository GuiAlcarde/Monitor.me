import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  private token = `bearer ${localStorage.getItem('token')}`;
  private user: Array<any> = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService) { }

  
  ngOnInit(): void {

    // this.userService.getUser(this.token).
    // subscribe(data => {
    //   this.user = data;
    //   console.log(this.user)
    // });

  }

}
