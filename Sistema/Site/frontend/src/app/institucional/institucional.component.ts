import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-institucional',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.css']
})
export class InstitucionalComponent implements OnInit {

  constructor(private titleService: Title) { 
    titleService.setTitle('MonitorMe: Solução para GPUs')
  }

  ngOnInit(): void {
  }

}
