/*
D3.js - Choropleth

*/
function choropleth(landmark, full_dataset, x, y, id, map_file){   

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
        .domain([1, 19])
        .rangeRound([50, 200]);//opposite to SVG!

    // Color or Legend
    var color = d3.scaleThreshold()
    .domain(d3.range(0, 19))
    .range(d3.schemePuRd[9]);


  // plot function
  this.plot = function(){

    var svg = d3.select('#'+landmark).append("svg")
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom);

    var g = svg.append("g")
        .attr("class", "key")
        .attr('transform', 'translate(0,' + (h) + ')');

    g.selectAll("rect")
    .data(color.range().map(function(d) {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = yScale.domain()[0];
        if (d[1] == null) d[1] = yScale.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", function(d) { return yScale(d[0]); })
      .attr("y", 0)      
      .attr("width", function(d) { return yScale(d[1]*2.3) - yScale(d[0]); })
      .attr("fill", function(d) { return color(d[0]); });
  
    g.call(d3.axisBottom(yScale)
        .tickSize(13)
        .tickFormat(function(y, i) { return (i+1)%2 ? y:''; })
        .tickValues(color.domain()))          
        .select(".domain")
        .remove();

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
        // Draw the world map        
        svg.append("path")
            .datum(topojson.feature(map, map.objects.countries))
            .attr("class", "land")
            .attr("d", path);          
        // Fill the color                   
        svg.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(topojson.feature(map, map.objects.countries).features)
            .enter().append("path")
            .attr("fill", function(data) { 
                return color(data.rate =cid_dict[data.id]!=null?Math.round(cid_dict[data.id][1]/c*1000)/1000:-100); 
            })
            .attr("d", path)
            // Add label for each country
            .append("title")
            .text(function(data) { return data.rate>0?cid_dict[data.id][0]+'\n'+'$'+data.rate + ' Trillion':'' });        
        // draw the border of each country.
        svg.append("path")
            .datum(topojson.mesh(map, map.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "border")
            .attr("d", path);               
    });
    return svg;
  };
}
