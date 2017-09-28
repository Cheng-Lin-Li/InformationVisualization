function scatterplot(landmark, dataset){
  this.w = 1000;
  this.h = 700;
  this.dataset = dataset
  
  this.plot = function(){
    const w = this.w
    const h = this.h

    var svg = d3.select('#'+landmark)
                .append('svg')
                .attr('width', w)
                .attr('height', h);

        svg.selectAll('circle')
              .data(this.dataset)
              .enter()
              .append('circle')
              .attr("cx", function(data, i) {
                      return i*50+10;
                 })
                 .attr("cy", function(data) {
                      return h-data["Rural Populations %"]*8;
                 })
                 .attr("r", 10)
                 .style('fill', function(data) {
                    var _data = data["Rural Populations %"]
                    return "rgb("+ Math.round(_data*4%255) + "," + Math.round(_data*2%255) + "," + Math.round(_data*4%255)+")";
                 })

        svg.selectAll('text')
              .data(this.dataset)
              .enter()
              .append('text')
              .text(function(data, i) {
                  return data["Country Code"] + ":" + Math.round(data["Rural Populations %"]*10)/10;
                 })
              .attr('x', function(data, i) {
                  return i*50-i*2;
              })
              .attr('y', function(data) {
                  return h-data["Rural Populations %"]*8-10;
              });

        return svg;
    };
  
  }