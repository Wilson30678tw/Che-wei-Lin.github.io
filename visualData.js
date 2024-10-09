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
    .markCircle({ size: 100 })  
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
    .width(1080)  
    .height(720)  
    .toSpec();

// Render the dot chart
vegaEmbed("#view", vlsp).then((result) => {
    const view = result.view;
    view.run();
});
     
     

     
 //*2
 const vltimecircle = vl
 .markCircle()  // Use circle mark to represent data points
 .data(data)
 .encode(
   vl.x().fieldT("Year").title("Year"),  // X-axis 
   vl.y().fieldN("Platform").title("Platform"),  // Y-axis 
   vl.size().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),  // Circle size based on sales
   vl.color().fieldN("Platform").title("Platform")  // Use color to differentiate platforms
     .scale({
       range: [
         "#4c8173", "#d95f0e", "#6278a1", "#b55982", "#759c2c", "#b89f25", "#b48b60", "#828282",
         "#7b9bbd", "#a98f56", "#7aa395", "#d18738", "#557a99", "#c85852", "#846487", "#be94aa",
         "#b3b16d", "#7ea482", "#b89f56", "#c2a28f", "#9bb29a"
       ]
     })
 )
  .width(1080)
  .height(720)
  .toSpec();


vegaEmbed("#view_tbr", vltimecircle).then((result) => {
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
    vl.y().fieldN('Platform').title('Platform'),  // Platforms on y-axis
    vl.x().fieldQ('Sales').aggregate('sum').title('Total Sales (in millions)'),  // Sales on x-axis
    vl.color().fieldN('Region').title('Region')  // Color represents different regions
      .scale({
        range: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3"]
      }),
    vl.order().fieldQ('Sales').aggregate('sum').sort('descending')
  )
  .width(1080)
  .height(720)
  .toSpec();

// Render the vertical bar chart
vegaEmbed("#view_sale", vlsalebar).then((result) => {
  const view = result.view;
  view.run();
});

const superMarioData = [
            {
                "Name": "Super Mario Bros.",
                "NA_Sales": 29.08,
                "EU_Sales": 3.58,
                "JP_Sales": 6.81,
                "Other_Sales": 0.77
            }
        ];
  const vlSPArc = vl
  .markArc({ innerRadius: 100 })  // Creates a donut chart
  .data(superMarioData)
  .transform(
    vl.fold(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'])
        .as('Region', 'Sales')
)
  .encode(
    vl.theta().fieldQ("Sales").title("Global Sales (in millions)"),
    vl.color().fieldN("Region").title("Region")
    .scale({
        range: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3']
    })
  )
  .width(1080)
  .height(720)
  .toSpec();

// Render the pie chart
vegaEmbed("#vlSPArc", vlSPArc).then((result) => {
  const view = result.view;
  view.run();
  const container = document.getElementById("vlSPArc");
  const caption = document.createElement("h2");
  caption.textContent = "Sales of Super Mario Bros. in Global";
  caption.style.textAlign = "center";
  caption.style.fontSize = "18px";
  container.appendChild(caption);
});

}


render();