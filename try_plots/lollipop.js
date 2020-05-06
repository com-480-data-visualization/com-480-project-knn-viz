// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 70, left: 60},
    width_timeline= 1100 - margin.left - margin.right,
    height_timeline= 300 - margin.top - margin.bottom;

var dy = 50;

var cValue = function(d) { return d.Continent;},
    color = d3.scaleOrdinal(d3.schemeCategory10);

var yLevel = function(d) {
    if(d.Season == "Summer"){
      return height_timeline/2 - dy;
    } else {
      return height_timeline/2 + dy;
    }
}

// Select Game to display
var clickYear = function(d){
      year = d.Year
      season = d.Season
      country = d.Country
      city = d.City
      //console.log(Object.keys(full_data['$'+year]).length)
      load_data();
      update_medals(year);
      d3.queue()
          .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
          .defer(d3.json, "host_cities_markers.json")
          .await(ready);

}

// append the svg object to the body of the page
var svg2 = d3.select("#my_dataviz_timeline")
  .append("svg")
    .attr("width", width_timeline+ margin.left + margin.right)
    .attr("height", height_timeline+ margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var informativeText = d3.select("#informative_text")
  .append("svg")
    .attr("width", width_timeline+ margin.left + margin.right)
    .attr("height", 50 + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    informativeText.append("text")
      .attr("class", "caption")
      .attr("x", -margin.left)
      .attr("y", height_timeline/2 - 80)
      .text("TODO: HERE GOES INFO TEXT Total number of participants")

var g_timeline = svg2.append("g")
              .attr("class", "legendColor")
              .attr("transform", "translate(20,20)");

              g_timeline.append("text")
              .attr("class", "caption")
              .attr("x", -margin.left)
              .attr("y", height_timeline/2 - 80)
              .text("Summer")

              g_timeline.append("text")
              .attr("class", "caption")
              .attr("x", -margin.left)
              .attr("y", height_timeline/2 + 70)
              .text("Winter")


var legend_timeline = d3.legendColor()
              .labels(function (d) {
                console.log(d.Continent)
                return d.Continent; })
              .shapePadding(4)
              .scale(color);

svg2.select(".legendColor")
    .call(legend_timeline);


// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width_timeline])
  .padding(1);

var xAxis = svg2.append("g")
  .attr("transform", "translate(0," + height_timeline/2 + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height_timeline, 0]);

var yAxis = svg2.append("g")
  .attr("class", "myYaxis")

// Tooltip
var tip_timeline = d3.tip()
          .attr('class', 'd3-tip')
          .offset(function(d){
            if (d.Season == "Summer"){
              return [-10, 50];
            } else {
              return [+60, +50];
            }
          })
          .html(function(d) {
                  return d["City"] + ", " + d["Country"] + "<br/> Year "+ d.Year;
                })
svg2.call(tip_timeline)


// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("location_host_cities.csv", function(data) {

    // X axis
    x.domain(data.map(function(d) { return d.Year; }))
    xAxis.call(d3.axisBottom(x))

    // Add Y axis
    y.domain([-dy, d3.max(data, function(d) {
      return yLevel(d);
     }) ]);
    //yAxis.call(d3.axisLeft(y)); comment to hide yaxis

    // variable u: map data to existing circle
    var j = svg2.selectAll(".myLine")
      .data(data)
    // update lines
    j
      .enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
        .attr("x1", function(d) { return x(d.Year); })
        .attr("x2", function(d) { return x(d.Year); })
        .attr("y1", height_timeline/2 )
        .attr("y2", function(d) {
          return yLevel(d);
        })
        .attr("stroke", "grey")


    // variable u: map data to existing circle
    var u = svg2.selectAll("circle")
      .data(data)
    // update bars
    u
      .enter()
      .append("circle")
        .attr("class", "myCircleTimeline")
      .merge(u)
        .attr("cx", function(d) { return x(d.Year); })
        .attr("cy", function(d) {
          return yLevel(d);
         })
        .attr("r", 8)
        .attr("fill", function(d) { return color(cValue(d));})
      .on("mouseover", tip_timeline.show)
      .on("mouseleave", tip_timeline.hide)
      .on("click", function(d){return clickYear(d);});

    var size = 20
    var allgroups = ["Asia", "Europe", "America", "Oceania"]
      svg2.selectAll("myrect")
        .data(allgroups)
        .enter()
        .append("circle")
          .attr("cx", function(d,i){ return 200 + i*150})
          .attr("cy", - 10) // 100 is where the first dot appears. 25 is the distance between dots
          .attr("r", 7)
          .style("fill", function(d){ return color(d);})

      // Add labels beside legend dots
      svg2.selectAll("mylabels")
        .data(allgroups)
        .enter()
        .append("text")
          .attr("class", "continentLegend")
          .attr("x", function(d,i){ return 220 + i*150})
          .attr("y", -7) // 100 is where the first dot appears. 25 is the distance between dots
          .style("fill", "black")
          .text(function(d){ return d})
          .attr("text-anchor", "left")
          .style("alignment-baseline", "middle")


  })

}

// Initialize plot
update('var1')
