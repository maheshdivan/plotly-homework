// // First function to call and populate when page loads

// function init(){
//    d3.json("data/samples.json").then((data) => {
//       //console.log(data.samples[0].sample_values)
//       //sorted_values=data.samples[0].sample_values.sort((a,b) => b.data.samples[0].sample_values - a.data.samples[0].sample_values)
      
//       //console.log(sorted_values)
//       values=data.samples[0].sample_values
//       sort_array = values.sort((a,b) => b - a)
//       x_array=sort_array.slice(0,10).reverse()

//       y_array = []
//       for (i=0;i<10;i++){
//          y_array.push("UT"+data.samples[0].otu_ids[i])
//       }
     
//       text_array=data.samples[0].otu_labels.slice(0,10)
//       y_array = y_array.reverse()
//       trace1={
//          x:x_array,
//          y:y_array,
//          text:text_array,
//          orientation: 'h',
//          type: "bar"
//       }
   
//       var layout = {
//          title: "Belly Button",
//          margin: {
//            l: 200,
//            r: 400,
//            t: 50,
//            b: 50
//          }
//        };
//       data=[trace1]
//       Plotly.newPlot("plot", data,layout);
   
//    })
// }
// Populate drop down

id=[]
select = document.getElementById( 'id' );
d3.json("data/samples.json").then((data) =>{
   data.samples.forEach(function(table){
      
       if (id.indexOf(table["id"]) == -1){
          select.add( new Option( table["id"] ))
          id.push(table["id"])
       }
}) 

})

d3.selectAll("#id").on("change", getData)

function getData(){
   var dropdownMenu = d3.select("#id");
   var dataset = dropdownMenu.property("value");
   var x = []
   var y = []

   d3.json("data/samples.json").then((data) =>{
      data.samples.forEach(function(table){
         
         if (dataset == table["id"]){
            values=table["sample_values"]
            sort_array = values.sort((a,b) => b - a)
            x_array=sort_array.slice(0,10).reverse()
            x_array1=sort_array

            y_array = []
            mark_color=[]
            //console.log(table.otu_ids)
            for (i=0;i<table.otu_ids.length;i++){
               y_array.push("UT"+table.otu_ids[i])
               mark_color.push(table.otu_ids[i])
             }
             y_array = y_array.slice(0,10).reverse()
             y_array1=y_array
             mark_color=mark_color
            // y_array = y_array.reverse()
             text_array=table.otu_labels.slice(0,10)
             trace1={
               x:x_array,
               y:y_array,
               text:text_array,
               orientation: 'h',
               type: "bar"
               }

               trace2={
                  y:x_array1,
                  x:mark_color,
                  mode: 'markers',
                  marker:{
                     size:x_array1,
                     color:mark_color
                     }
             //     text:text_array
                  }
         
            var layout = {
               title: "Belly Button",
               margin: {
                 l: 50,
                 r: 50,
                 t: 50,
                 b: 50
               }
             };
            data1=[trace1]
            data2=[trace2]


            Plotly.newPlot("plot", data1,layout);
            Plotly.newPlot("plot1", data2);

         }
         
      }) 

      data.metadata.forEach(function(key,){
            
         if (dataset == key["id"]){

            values = [[`id:${key.id}`,`ethnicity:${key.ethnicity}`,`gender:${key.gender}`,`age:${key.age}`,`location:${key.location}`,`bbtype:${key.bbtype}`,`wfreq:${key.wfreq}`]]
            var data = [{
               type: 'table',
               header: {
                 values: [["<b>Demographic Info</b>"]],
                 align: ["center"],
                 line: {width: 1, color: '#506784'},
                 fill: {color: '#119DFF'},
                 font: {family: "Arial", size: 12, color: "white"}
               },
               cells: {
                 values: values,
                 align: ["center"],
                 line: {color: "#506784", width: 1},
                 fill: {color: ['#FFFFFF', 'white']},
                 font: {family: "Arial", size: 11, color: ["#506784"]}
               }
             }]
             
             Plotly.newPlot('mydiv', data);
         }
      })
   
  

   // part of data to input

   data.metadata.forEach(function(key,){

      

      if (dataset == key["id"]){

         console.log("Inside check in gauge" + key.id)
      var traceGauge = {
         type: 'pie',
         showlegend: false,
         hole: 0.4,
         rotation: 90,
         values: [ 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
         text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
         direction: 'clockwise',
         textinfo: 'text',
         textposition: 'inside',
         marker: {
            colors: ['','','','','','','','','','white'],
            labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9']
         }
      }

    // needle
      var degrees = 50, radius = .9
      var radians = degrees * Math.PI / 180
      console.log("Wash Freq"+key.wfreq)
      var x = -1 * radius * Math.cos(radians) * key.wfreq
      console.log("From gauge x"+ x)
      var y = radius * Math.sin(radians)
      final_freq = 0.1*key.wfreq+0.2
      console.log("Final Freq"+final_freq)
      console.log("From gauge y"+ y)
      var gaugeLayout = {
         shapes: [{
         type: 'path',
         path: `M 0.5 0.5 L ${final_freq} 0.55 L 0.55 0.5 Z`,
         'fillcolor': 'rgba(44, 160, 101, 0.5)',
         line: {
             color: 'black',
            width: 3
          }
         }],
         title: 'Chart',
       //  xaxis: {visible: false, range: [-1, 1]},
        // yaxis: {visible: false, range: [-1, 1]}
      }

      var dataGauge = [traceGauge]

      Plotly.plot('plot2', dataGauge, gaugeLayout)

     
   }
})
})
}
   

   


//init()

