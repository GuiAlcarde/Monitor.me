import { Hardware } from './../hardware.model';
import { Router } from '@angular/router';
import { HardwareService } from '../../../services/hardware.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hardware-create',
  templateUrl: './hardware-create.component.html',
  styleUrls: ['./hardware-create.component.css']
})
export class HardwareCreateComponent implements OnInit {

  private token = `bearer ${localStorage.getItem('token')}`;

  hardware: Hardware = {
    modelo: '',
    GPU: '',
    hardDisk: '',
    memoryRam: ''
  }

  constructor(private hardwareService: HardwareService, private router: Router) { }

  ngOnInit(): void {
    
  }

  // createHardware(): void{
  //   this.hardwareService.createHardware(this.hardware, this.token).subscribe(()=>{
  //     this.hardwareService.show('Hardware Inserido com sucesso!')
  //     this.router.navigate(['sistema/hardware'])
  //   });
  // }

  cancel():void {
    this.router.navigate(['sistema/hardware'])
  }
}
