/*
D3.js - Bar Chart
    With axes, axes labels, tick marks, tick mark labels, legend, and title. 
    Implement smooth transitions based on user input to filter 
        -show all data, show the top 5, show the bottom 5
    And reorder 
        -sort alphabetically (default), sort by value in ascending order, sort by value in descending order
*/
function bar_chart(landmark, full_dataset, x, y){

    const margin = { top: 20, left: 75, bottom: 50, right: 50 };
    const w = 1000- margin.left - margin.right;
    const h = 550- margin.top - margin.bottom;
    const c = 1000000000000 // scale to trillion
    const padding = 50;
    const paddingInner = 0.05; //padding in [0, 1]
    this.x = x; //Country
    this.y = y; //GDP

    var dataset = full_dataset;
    var data_len = dataset.length;
    
    // Ordinal scale x
    var xScale = d3.scaleBand()
    .domain(dataset.map(function (d) { 
            return d[x];
        })
    )
    .range([padding, w - padding]) 
    .round(true) //enable rounding 
    .paddingInner(paddingInner); 
    
    var band_width = xScale.bandwidth();

    // Scale for y axis (opposite direction than SVG)
    var minY = d3.min(dataset, function (d) { return d[y]/c; });
    var maxY = d3.max(dataset, function (d) { return d[y]/c; });
    var yScale = d3.scaleLinear()
        .domain([minY, maxY])
        .range([h - padding, padding]);  //opposite to SVG!

    var country_selection = 'all'; // default country selection
    var country_order = 'alphabet'; // default sorting order
  // plot function
  this.plot = function(){

    var svg = d3.select('#'+landmark).append("svg")
                  .attr('width', w + margin.left + margin.right)
                  .attr('height', h + margin.top + margin.bottom);

    var selection = svg.selectAll('rect')
         .data(dataset).enter();

    selection.append('rect')
        .attr('class', 'bar')
        .attr('x', function(data) {
               return xScale(data[x]); 
        })
        .attr('y', function(data) {
               return yScale(data[y]/c)-3; 
        })
        .attr('width', band_width)
        .attr('height', function(data) {
               return h-yScale(data[y]/c)-padding+3;
        })
        .attr('fill', function(data) {
               var _data = data[y]
               return 'rgb('+ Math.round(_data*5%255) + ',' + Math.round(_data*2%255) + ',' + Math.round(_data*3%255)+')';
        });
    // Data label
    selection.append('text')
        .text(function(data, i) {
            // y value
            return Math.round(data[y]/c*1000)/1000;
        })
        .attr("class", "country_label")
        .attr('text-anchor', 'middle')
        .attr('x', function(data) {
            return xScale(data[x])+band_width/2;
        })
        .attr('y', function(data) {
            return yScale(data[y]/c)-10; 
        });       

    //X Axis
    var xAxis = d3.axisBottom() //a function object 
        .scale(xScale) 
        .ticks(10);
    svg.append('g') 
        .attr('class', 'xaxis') 
        .attr('transform', 'translate(0,' + (h-padding) + ')')        
        .call(xAxis);
    // Draw xAxis label
    var text = svg.append('text')
        .attr('x', w - 11 * padding)
        .attr('y', h - padding / 2.0 + 20);
    text.append('tspan').text('Country'); // tspan to juxtapose text 

    // Create and draw y Axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(20);
    svg.append('g')
        .attr('class', 'yaxis')
        .attr('transform', 'translate(' + (padding) + ',0)')
        .call(yAxis);

    // Draw yAxis label vertically
    var text2 = svg.append('text')
        .attr('x', h / 2.0)
        .attr('y', padding / 2)
        .attr('transform', 'rotate(-90, ' + h / 2 + ', ' + h / 2 + ')');
        text2.append('tspan').text(' GDP USD$ (Trillion)');

    //Show select countries
	d3.select('#country_selection')
    .on('change', function () {
        var sect = document.getElementById("country_selection");
        country_selection = sect.options[sect.selectedIndex].value;
            
        dataset = dataset_filter(full_dataset, x, y, country_selection, country_order);

        changeXAxis(svg, x, xScale, xAxis, dataset, w, padding, paddingInner);
        changeBars(svg, x, xScale, y, yScale, h, dataset, c, padding);
    });

    //Show select countries
    d3.select('#country_order')
        .on("change", function () {
            var sect = document.getElementById("country_order");
            country_order = sect.options[sect.selectedIndex].value;
            
            dataset = dataset_order(dataset, x, y, country_order);

            changeXAxis(svg, x, xScale, xAxis, dataset, w, padding, paddingInner);
            transitionBars(svg, x, xScale, band_width);
        });
    
    return svg;
  };
}

function changeXAxis(svg, x, xScale, xAxis, dataset, w, padding, paddingInner) {
    //transition x axis
    xScale.domain(dataset.map(function(data){return data[x]; }))
    .range([padding, w - padding]) 
    .round(true) //enable rounding 
    .paddingInner(paddingInner);  //only need to change x scale!
    xAxis.scale(xScale);

    svg.selectAll('.xaxis')
        .transition()
        .call(xAxis);
}


function transitionBars(svg, x, xScale, band_width) {
    //transition bars for cases where only the scale changes (no add/remove)
    var transition = svg.transition()
        .duration(750);

    var delay = function (data, i) {
        return i * 50;
    };

    transition.selectAll('.bar')
        .delay(delay)
        .attr('x', function (data) {
            return xScale(data[x]); 
        });

    transition.selectAll('.country_label')
        .delay(delay)
        .attr('x', function (data) {
            return xScale(data[x])+band_width/2;;
        });
}

function changeBars(svg, x, xScale, y, yScale, height, dataset, c, padding) {
    //add / remove bars for cases

    // DATA JOIN of bar
    var bars = svg.selectAll('.bar')
        .data(dataset, function (data) { return data[x]; });

    var delay = function (data, i) {
        return i * 50;
    };

    // UPDATE of bar
    bars.transition()
        .duration(750)
        .delay(delay)
        .attr('x', function (data) { return xScale(data[x]); })
        .attr('width', xScale.bandwidth());

    // ENTER of bar
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function (data) { return xScale(data[x]); })
        .attr('y', function (data) { return yScale(data[y]/c)-3; })
        .attr('width', xScale.bandwidth())
        .attr('height', function (data) { return height - yScale(data[y]/c)-padding+3; })
        .attr('fill', function(data) {
            var _data = data[y]
            return 'rgb('+ Math.round(_data*5%255) + ',' + Math.round(_data*2%255) + ',' + Math.round(_data*3%255)+')';
        });

    // EXIT of bar
    bars.exit()
        .transition()
        .duration(500)
        .remove();

    // DATA JOIN of data label
    var gdp = svg.selectAll(".country_label")
        .data(dataset, function (data) { return data[x]; });

    // UPDATE.    
    gdp.transition()
        .duration(750)
        .delay(delay)
        .attr('x', function (data) { return xScale(data[x])+ xScale.bandwidth()/2; });

    // ENTER.
    gdp.enter().append('text')
        .text(function (data) { return Math.round(data[y]/c*1000)/1000; })
        .attr('class', 'country_label')
        .attr('x', function (data) { return xScale(data[x])+ xScale.bandwidth()/2; })
        .attr('y', function (data) { return yScale(data[y]/c)-10; });
            
    // EXIT.    
    gdp.exit()
        .transition()
        .duration(500)
        .remove();        

}

function dataset_filter(full_dataset, x, y, selection, order) {
    //select specific country (x) from specific criteria (y)
    if (selection == "all") {
        return dataset_order(full_dataset, x, y, order);
    }
    else if (selection == "t5"){ //top 5
        _data = full_dataset.sort(function(p1, p2) { return p2[y] - p1[y]; }).slice(0,5);
        return dataset_order(_data, x, y, order);
    }
    else { //bottom 5
        _data = full_dataset.sort(function(p1, p2) { return p1[y] - p2[y]; }).slice(0,5);
        return dataset_order(_data, x, y, order);
    }
}

function dataset_order(dataset, x, y, order) {
    //Reorder dataset by specific criteria 
    if (order == "alphabet") {
        var _data = dataset.sort(function(p1, p2) { return p1[x].localeCompare(p2[x]); });
        return _data;
    }
    else if (order == "value_asc"){ //value_asc
        var _data = dataset.sort(function(p1, p2) { return p1[y] - p2[y]; });
        return _data;
    }
    else { //value_desc
        _data = dataset.sort(function(p1, p2) { return p2[y] - p1[y]; });
        return _data;
    }
}