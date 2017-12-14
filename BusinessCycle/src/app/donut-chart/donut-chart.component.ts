import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from "d3";
import { donut_chart_plot } from "./donut-chart";

@Component({
  selector: 'app-donut-chart',
//  template: '<div class="donut{{eventcase}}"></div>', //D3 cannot get this <div>  
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  @Input() eventcase: String;
  constructor() { }
  
  ngOnInit() {
    donut_chart_plot(+this.eventcase);
  }

}
// 
// reference 
// https://bl.ocks.org/guilhermesimoes/49ba71346a956ed0a12e9bc515be5804
// https://codepen.io/zakariachowdhury/pen/EZeGJy
// https://jsfiddle.net/0byLcn6d/
// image https://codepen.io/smartyboots/pen/VpqaGR
// https://brendansudol.com/writing/responsive-d3
// Dow Jones - 1929 Crash and Bear Market http://www.macrotrends.net/2484/dow-jones-crash-1929-bear-market