// set the dimensions and margins of the graph
var margin = {top: 50, right: 30, bottom: 20, left: 30},
    width_timeline= 250 - margin.left - margin.right,
    height_timeline= 900 - margin.top - margin.bottom;
    //height_timeline= window.innerHeight - margin.top - margin.bottom;
//console.log(window.innerHeight)

var dx = 50;

var cValue = function(d) { return d.Continent;},
    color = d3.scaleOrdinal(d3.schemeCategory10);

var xLevel = function(d) {
    if(d.Season == "Summer"){
      return width_timeline/2 - dx;
    } else {
      return width_timeline/2 + dx;
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
          "translate(" + 30 + "," + 1.5*margin.top + ")");


var g_timeline = svg2.append("g")
              .attr("class", "legendColor")
              .attr("transform", "translate(-10,-20)");

              g_timeline.append("text")
              .attr("class", "caption")
              .attr("x", -20 + width_timeline/2 - dx)
              .attr("y", 0)
              .text("Summer")

              g_timeline.append("text")
              .attr("class", "caption")
              .attr("x", -20 + width_timeline/2 + dx)
              .attr("y", 0)
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
var x = d3.scaleLinear()
  .range([ 0, width_timeline]);

var xAxis = svg2.append("g")


// Initialize the Y axis
var y = d3.scaleBand()
  .range([ 0, height_timeline])
  .padding(1);

var yAxis = svg2.append("g")
  .attr("transform", "translate(" + (width_timeline/2 ) + "," + 0 + ")")


// Tooltip
var tip_timeline = d3.tip()
          .attr('class', 'd3-tip')
          .offset(function(d){
            if (d.Season == "Summer"){
              return [-10, 30];
            } else {
              return [-10, 30];
            }
          })
          .html(function(d) {
                  return d["City"] + ", " + d["Country"] + "<br/> Year "+ d.Year;
                })
svg2.call(tip_timeline)


var domain_function = function range(size, startAt = 1896) {
return [...Array(size).keys()].map(i => i*4 + startAt);
}

//rotate(-45)

// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("location_host_cities.csv", function(data) {

    // Y axis
    y.domain(domain_function(32))
    yAxis.call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", "translate(0,-10)")

    // Add X axis
    x.domain([-dx, d3.max(data, function(d) {
      return xLevel(d);
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
        .attr("x1", width_timeline/2)
        .attr("x2", function(d) { return xLevel(d); })
        .attr("y1", function(d) { return y(d.Year); })
        .attr("y2", function(d) { return y(d.Year); })
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
        .attr("cy", function(d) { return y(d.Year); })
        .attr("cx", function(d) {
          return xLevel(d);
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
          .attr("cy", function(d,i){ return 150 + i*height_timeline/6})
          .attr("cx", 0) // 100 is where the first dot appears. 25 is the distance between dots
          .attr("r", 7)
          .style("fill", function(d){ return color(d);})

      // Add labels beside legend dots
      svg2.selectAll("mylabels")
        .data(allgroups)
        .enter()
        .append("text")
          .attr("class", "continentLegend")
          .attr("y", function(d,i){ return 170 + i*height_timeline/6})
          .attr("x", 0) // 100 is where the first dot appears. 25 is the distance between dots
          .style("fill", "black")
          .text(function(d){ return d})
          .attr("text-anchor", "middle")
          .style("alignment-baseline", "middle")


  })

}

// Initialize plot
update('var1')
