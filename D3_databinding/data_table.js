function data_table(landmark, dataset, table_class){
  // The data should include first column as x values and second column as y values
    
    this.dataset = dataset
    this.columns = dataset.columns
  
    this.table_class = table_class
    this.table = d3.select('#'+landmark).append('table').attr('class', this.table_class )
    this.table_head = this.table.append('tr')

    this.print = function(){
      // Table heading
      const columns = this.columns
      const dataset = this.dataset

      var heading =  this.table_head.selectAll('th')
        .data(columns).enter().append('th')
        .text(function (col_name){return col_name;});
      // Table row
      var table_row = this.table.selectAll('tr.row') // add new row below table heading
        .data(dataset).enter().append('tr');
      // Table data
      var table_cell = table_row.selectAll('td')
        .data(function (data) {
          return columns.map(function(column, i) {
            return {value: data[column]}; //return {value of column: data of the column, ...etc.}
          });
        })
        .enter().append('td')
        .text(function (data) {return data.value;});
    return this.table;
  }
}