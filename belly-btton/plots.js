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
             console.log("Label"+y_array)
             console.log("hover_text"+text_array)
             trace1={
               x:x_array,
               y:y_array,
             //  hovertemplate: '<i>Ids/i>: $%{text_array:.2f}',
               showlegend: false,
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
                     },
                   text:text_array,
                   config: { responsive: true }
                  }
         
            var layout = {
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

         var chart = am4core.create("plot2", am4charts.GaugeChart);
         var axis = chart.xAxes.push(new am4charts.ValueAxis());
         axis.min = 0;
         axis.max = 9;
         axis.strictMinMax = true;
         chart.innerRadius = -20;
         var range = axis.axisRanges.create();
         range.value = 0;
         range.endValue = 5;
         range.axisFill.fillOpacity = 1;
         range.axisFill.fill = am4core.color("#88AB75");
         range.axisFill.zIndex = -1;
         var range = axis.axisRanges.create();
         range.value = 5;
         range.endValue = 7;
         range.axisFill.fillOpacity = 1;
         range.axisFill.fill = am4core.color("#8BBBBB");
         range.axisFill.zIndex = -1;
         var range = axis.axisRanges.create();
         range.value = 7;
         range.endValue = 9;
         range.axisFill.fillOpacity = 1;
         range.axisFill.fill = am4core.color("#AAABBB");
         range.axisFill.zIndex = -1;
         var hand = chart.hands.push(new am4charts.ClockHand());
         hand.value = key.wfreq
     
   }
})
})
}

