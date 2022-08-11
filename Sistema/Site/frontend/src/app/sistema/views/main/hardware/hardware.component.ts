import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})
export class HardwareComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navTo():void {
    this.router.navigate(['sistema/hardware/hardware-create'])
  }
}
