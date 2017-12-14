import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
// import * as D3 from "d3";
import * as d3 from "d3";
// import { d3Tip } from "../world-map/d3-tip.js";
// declare var D3:any;
// import 'd3';
// import * as d3tip from 'd3-tip';
// D3.tip = d3tip;

//import * as D3S from 'd3-scale-chromatic';
import { ERROR_DEBUG_CONTEXT } from '@angular/core/src/errors';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { theory_chart_plot } from "./theory-chart";

@Component({
  selector: 'app-theory-chart',
  templateUrl: './theory-chart.component.html',
  styleUrls: ['./theory-chart.component.css']
})

export class TheoryChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    theory_chart_plot();
  }
}
// https://codepen.io/sonofjack/pen/BQGpLV
// https://bocoup.com/blog/improving-d3-path-animation
// https://bl.ocks.org/mbostock/3883195
// https://bl.ocks.org/d3noob/119a138ef9bd1d8f0a8d57ea72355252
// http://duspviz.mit.edu/d3-workshop/transitions-animation/
// resize http://www.dongcoder.com/detail-643450.html
// text animation https://bl.ocks.org/TommyCoin80/525ae682300d91ef6db42a693f86fac7
// simple fill area line chart https://bl.ocks.org/Cthulahoop/21ecf1bf5d2568b854934a74050b31e6
// https://bl.ocks.org/mbostock/1256572
// business cycle fidelity https://eresearch.fidelity.com/eresearch/markets_sectors/sectors/si_business_cycle.jhtml?tab=sibusiness
// tip http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
// ARC http://bl.ocks.org/mbostock/5100636
//
// reference: https://www.fidelity.com/viewpoints/market-and-economic-insights/business-cycle-update-august-2017
// reference: https://www.fidelity.com/viewpoints/investing-ideas/sector-investing-business-cycle