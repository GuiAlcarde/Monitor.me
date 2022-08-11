import { Hardware } from './../hardware.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HardwareService } from '../../../services/hardware.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hardware-update',
  templateUrl: './hardware-update.component.html',
  styleUrls: ['./hardware-update.component.css']
})
export class HardwareUpdateComponent implements OnInit {

  hardware: Hardware;
  
  private token = `bearer ${localStorage.getItem('token')}`;

  constructor(private hardwareService: HardwareService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    
    const id = this.route.snapshot.paramMap.get('id')
    this.hardwareService.readById(id, this.token).subscribe(hardware => {
      this.hardware = hardware;
    })
  }

  updateHardware(): void {
    this.hardwareService.update(this.hardware, this.token).subscribe(() => {
      this.hardwareService.show('Produto Atualizado!')
      this.router.navigate(['sistema/hardware'])
    })
  }

  cancel(): void {
    this.router.navigate(['sistema/hardware'])
  }

}
