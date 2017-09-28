function stem_n_leaf(landmark, dataset, table_class){
  // reference: https://bl.ocks.org/biovisualize/456231b87e1c2fca8bfb
    this.table_class = table_class;
    this.table = d3.select('#'+landmark).append('table').attr('class', this.table_class );
    this.dataset = dataset;
    this.data_rate = dataset.map(function(data){
        return Math.round(data["Rural Populations %"]*10)/10
    });
    console.log(this.data_rate);

    // group data by the stem
    this.groupBy = function(xs, accessor) { //accessor = function(data){return Math.floor(data/10)}
      return xs.reduce(function(rv, x) {
        (rv[accessor(x)] = rv[accessor(x)] || []).push(x); // accessor(x)=Stem value, x = original value
        return rv;
      }, {});
    };

    var dataGroups = this.groupBy(this.data_rate, function(data){ return Math.floor(data/10); });
    
    // fill in missing Stem number
    var max = 0;
    var min = 0;
    for (var key in dataGroups) {
      if(key < min) {min = key} else if (key > max) { max = key} else { continue;}
    }
    for (min; min < max; min++) {
      if (!dataGroups.hasOwnProperty(min)) {
        dataGroups[min] = [' '];
      }
    }

    // Plot function
    this.plot = function(){
      this.table.append('tr')
        .selectAll('th').data(['Stem', 'Leaf']).enter().append('th')
        .text(function(data){ return data; });
      
      this.table.selectAll('tr.row')
        .data(d3.keys(dataGroups).map(function(data, i){ return [data, dataGroups[data]]; }))
        .enter().append('tr')
        .selectAll('td')
        .data(function(data){ return data; })
        .enter().append('td')
        .text(function(data, i){
          return !i ? data : data.map(function(dB, i){
            return dB != ' '?parseInt(Math.round(dB).toString().slice(-1)):' ';
          }).sort().join(' ');
        });
    };
  }