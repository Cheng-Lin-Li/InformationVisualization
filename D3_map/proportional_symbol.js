/*
D3.js - >Proportional Symbol Map

*/
function proportional_symbol(landmark, full_dataset, x, y, id, map_file){

    const margin = { top: 20, left: 75, bottom: 50, right: 50 };
    const w = 1000- margin.left - margin.right;
    const h = 550- margin.top - margin.bottom;
    const c = 1000000000000 // scale to trillion
    const padding = 50;
    const paddingInner = 0.05; //padding in [0, 1]
    this.id = id // Country ISO ID
    this.x = x; //Country
    this.y = y; //GDP

    var dataset = full_dataset;
    var data_len = dataset.length;
    
    var cid_dict = dataset.reduce(function(obj, item) {
        obj[item[id]] = item[id] || 0;
        obj[item[id]] = [item[x],item[y]];
        return obj;
    }, {});

    // Scale for y axis (opposite direction than SVG)
    var minY = d3.min(dataset, function (d) { return d[y]/c; });
    var maxY = d3.max(dataset, function (d) { return d[y]/c; });
    var yScale = d3.scaleLinear()
        .domain([1, 20])
        .rangeRound([50, 350]);//opposite to SVG!

    // Scale for radius by y value
    var radius = d3.scaleSqrt()
    .domain([0, maxY])
    .range([0, 50]);


  // plot function
  this.plot = function(){

    var svg = d3.select('#'+landmark).append("svg")
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom);

    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (w - 790) + "," + (h + 60) + ")")
        .selectAll("g")
        .data([minY, (minY+maxY)/2, maxY])
        .enter().append("g");

    legend.append("circle")
        .attr("cy", function(d) { return -radius(d); })
        .attr("r", radius);
    
    legend.append("text")
        .attr("y", function(d) { return -2 * radius(d); })
        .attr("dy", "1.3em")
        .text(d3.format(".1s"));

    var g = svg.append("g")
        .attr("class", "key")
        .attr('transform', 'translate(0,' + (h-padding+10) + ')');

    g.append("text")
        .attr("class", "caption")
        .attr("x", yScale.range()[0])
        .attr("y", -10)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("GDP $USD Trillion");

    // Draw the world map  
    var projection = d3.geoMercator().scale(115).translate([w/2, h/1.5]);
    var path = d3.geoPath(projection);
    
    
    d3.json(map_file, function(error, map) {
        if (error) return console.error(error);                  
        svg.append("path")
            .datum(topojson.feature(map, map.objects.countries))
            .attr("class", "land")
            .attr("d", path);        
        svg.append("path")
            .datum(topojson.mesh(map, map.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "border")
            .attr("d", path);
        //Draw the proportional symbol
        svg.append("g")
            .attr("class", "bubble")
            .selectAll("circle")
            .data(topojson.feature(map, map.objects.countries).features)
            .enter().append("circle")
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("r", function(data) { 
                return cid_dict[data.id]!=null?radius(Math.round(cid_dict[data.id][1]/c*1000)/1000):0; 
            })
            .append("title")
            .text(function(data) { 
                return cid_dict[data.id]!=null?cid_dict[data.id][0]+'\n'+'$'+Math.round(cid_dict[data.id][1]/c*1000)/1000+' Trillion':'' 
            });       
        });
        return svg;
  };
}
