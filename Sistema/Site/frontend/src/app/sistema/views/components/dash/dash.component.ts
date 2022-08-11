import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { DataJson } from 'src/app/models/dataHard.models';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit {
  private token = `bearer ${localStorage.getItem('token')}`;

  userLogado = `${localStorage.getItem('name')}`;
  dataFromApi: DataJson[];
  sttsHardware: any;
  hardResult: any;

  public ArrayTempGpu: Array<number>;
  public ArrayMemoriaRam: Array<number>;
  public ArrayCpuUso: Array<number>;
  public ArrayData: Array<number>;
  
  @ViewChild('dashGPU', { static: false }) elemento: ElementRef;

  ngOnInit() {
    this.dashService.readHardware(this.token).subscribe(
      (data) => {
        this.dataFromApi = data['dadosHardware'];
        const apiTempGpu = [];
        const apiDataGpu = [];
        const apiMemRam = [];
        const apiCpuUso = [];
        this.sttsHardware = this.dataFromApi.map((x) => {
          
          const dadosRecebidos = {
            cpu: x.cpuDados,
            gpu: x.gpuDados,
            oshi: x.oshiDados,
            data: x.ctDDados
          };
          this.hardResult = dadosRecebidos;  
          console.log(this.hardResult)        
          
          apiTempGpu.push(this.hardResult['gpu']['temperaturaMedia']);
          apiCpuUso.push(parseFloat(this.hardResult['cpu']['getUsoUser']))
          apiDataGpu.push(this.hardResult['data'])
          apiMemRam.push(parseFloat(this.hardResult['oshi']['porcentRam']))

          this.ArrayTempGpu = apiTempGpu;
          this.ArrayData = apiDataGpu;
          this.ArrayMemoriaRam = apiMemRam;
          this.ArrayCpuUso = apiCpuUso;

          return dadosRecebidos;
        });

        new Chart(this.elemento.nativeElement, {
          type: 'line',
          data: {
            labels: this.ArrayData,
            datasets: [
              {
                label: 'Alerta em ºC',
                data: this.ArrayTempGpu,
                borderColor: '#7b1fa2',
                fill: true,
                backgroundColor: '#7b1fa339'
              },{
                label: '% de Uso Memoria Ram',
                data: this.ArrayMemoriaRam,
                borderColor: '#df8f8f',
                fill: true,
                backgroundColor: '#df8f8fb3'
              },{
                label: '% de Uso Cpu',
                data: this.ArrayCpuUso,
                borderColor: '#80bfff',
                fill: true,
                backgroundColor: '#80bfff'
              }
            ],
          },
          options: {
            responsive: true
          }
        });

      },
      (error) => {
        console.log(error);
      }
    );
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashService: DashboardService
  ) {}
}
