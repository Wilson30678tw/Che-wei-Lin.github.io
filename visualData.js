async function render() {

    
    // load data
    const data = await d3.csv("dataset/videogames_wide.csv");

    console.log(data);


    
    data.forEach(d => {
        d.NA_Sales = isNaN(+d.NA_Sales) ? 0 : +d.NA_Sales;
        d.EU_Sales = isNaN(+d.EU_Sales) ? 0 : +d.EU_Sales;
        d.JP_Sales = isNaN(+d.JP_Sales) ? 0 : +d.JP_Sales;
        d.Other_Sales = isNaN(+d.Other_Sales) ? 0 : +d.Other_Sales;

        console.log(`Platform: ${d.Platform}, NA_Sales: ${d.NA_Sales}, EU_Sales: ${d.EU_Sales}, JP_Sales: ${d.JP_Sales}, Other_Sales: ${d.Other_Sales}`);
    });
    

  
    // create a bar chart
    const vlsp = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Platform").title("Platform"),  
      vl.x().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),  
      vl.color().fieldN("Genre").title("Genre") 
      .scale({
        range: [
            "#4e79a7", "#f28e2b", "#76b7b2", "#e15759", "#59a14f",
            "#edc949", "#af7aa1", "#bab0ac", "#ff9da7", "#9c755f", "#d4a6c8"
          ]
        })
    )
      .width(1280)  
      .height(720)  
      .toSpec();
      // Render the bar chart
    vegaEmbed("#view", vlsp).then((result) => {
        const view = result.view;
        view.run();
        });
     
     

     
 //*2
 const vltimebar = vl
  .markBar()  // Changed from markLine to markBar
  .data(data)
  .encode(
    vl.x().fieldT("Year").title("Year"),  // Change to fieldT for temporal data type
    vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),  
    vl.color().fieldN("Platform").title("Platform")
      .scale({
        range: [
            "#4c8173",  "#d95f0e",   "#6278a1",  "#b55982",  "#759c2c",  "#b89f25",  "#b48b60",  "#828282",  
            "#7b9bbd",  "#a98f56",  "#7aa395",   "#d18738",  "#557a99",   "#c85852",  "#846487",  "#be94aa",  
            "#b3b16d",  "#7ea482",  "#b89f56",  "#c2a28f",  "#9bb29a"   
        ]
      }) 
  )
  .width(1280)
  .height(720)
  .toSpec();


vegaEmbed("#view_tbr", vltimebar).then((result) => {
  const view = result.view;
  view.run();
});
// **3
const vlsalebar = vl
  .markBar()
  .data(data)
  .transform(
    vl.fold(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales']).as('Region', 'Sales')
  )
  .encode(
    vl.x().fieldN('Platform').title('Platform'),  
    vl.y().fieldQ('Sales').aggregate('sum').title('Total Sales (in millions)'), 
    vl.color().fieldN('Region').title('Region')
      .scale({
        range: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3"]
      })
  )
  .width(1280)
  .height(720)
  .toSpec();

// Render the vertical bar chart
vegaEmbed("#view_sale", vlsalebar).then((result) => {
  const view = result.view;
  view.run();
});

const publisherData = [
    {"Publisher": "Nintendo", "Global_Sales": 1786.56},
    {"Publisher": "Electronic Arts", "Global_Sales": 1110.32},
    {"Publisher": "Activision", "Global_Sales": 727.46},
    {"Publisher": "Sony Computer Entertainment", "Global_Sales": 607.50},
    {"Publisher": "Ubisoft", "Global_Sales": 473.76},
    {"Publisher": "Take-Two Interactive", "Global_Sales": 410.65},
    {"Publisher": "THQ", "Global_Sales": 269.62},
    {"Publisher": "Sega", "Global_Sales": 256.07},
    {"Publisher": "Namco Bandai Games", "Global_Sales": 245.40},
    {"Publisher": "Konami Digital Entertainment", "Global_Sales": 217.47},
    {"Publisher": "Microsoft Game Studios", "Global_Sales": 214.50},
    {"Publisher": "Other", "Global_Sales": 4673.72}  // Other publishers
];
  const vlPublisherPie = vl
  .markArc({ innerRadius: 100 })  // Creates a donut chart
  .data(publisherData)
  .encode(
    vl.theta().fieldQ("Global_Sales").title("Global Sales (in millions)"),
    vl.color().fieldN("Publisher").title("Publisher")
    .scale({
        range: [
            "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", 
            "#ffd92f", "#e5c494", "#b3b3b3", "#8dd3c7", "#ffffb3", 
            "#bebada", "#fb8072", "#80b1d3"
        ] 
    })
  )
  .width(1080)
  .height(720)
  .toSpec();

// Render the pie chart
vegaEmbed("#publisher_pie_chart", vlPublisherPie).then((result) => {
  const view = result.view;
  view.run();
});
   

  

}

render();