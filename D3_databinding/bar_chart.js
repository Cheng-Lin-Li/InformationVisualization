function bar_chart(landmark, dataset){
  this.w = 800;
  this.h = 400;
  this.dataset = dataset;
  this.data_len = dataset.length

  // plot function
  this.plot = function(){
    const padding = 1;
    const w = this.w;
    const h = this.h;
    const c = 4 // scale variable
    const data_len = this.data_len;

    var svg = d3.select('#'+landmark).attr("style", "margin-left: 200px").append("svg")
                  .attr("width", w).attr("height", h);

    var selection = svg.selectAll("rect")
         .data(this.dataset).enter()
    selection.append("rect")
         .attr("x", function(data, i) {
                return i*(w/data_len); 
            })
         .attr("y", function(data) {
                return h-data["Rural Populations %"]*c-20; 
            })
         .attr("width", (w/data_len)-padding)
         .attr("height", function(data) {
                return data["Rural Populations %"]*c;
            })
         .attr("fill", function(data) {
                var _data = data["Rural Populations %"]
                return "rgb("+ Math.round(_data*4%255) + "," + Math.round(_data*2%255) + "," + Math.round(_data*4%255)+")";
            });
      // Data label
      selection.append("text")
         .text(function(data, i) {
              // rural population
              return Math.round(data["Rural Populations %"]*10)/10;
         })
         .attr("text-anchor", "middle")
         .attr("x", function(data, i) {
              return i*(w/data_len)+((w/data_len)-padding)/2;
         })
         .attr("y", function(data) {
              return h-(data["Rural Populations %"]*c)-30; 
         });
      selection.append("text")
         .text(function(data, i) {
              // Country code
              return data["Country Code"];
         })
         .attr("text-anchor", "middle")
         .attr("x", function(data, i) {
              return i*(w/data_len)+((w/data_len)-padding)/2;
         })
         .attr("y", function(data) {
              return h; 
         });         
      return svg;
  };
}