var width = 1100
var height = 600
var year = 1896
var season = 'Summer'
var city = "Athens"
var country = "Greece"

var country_code = d3.map()

var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
var path = d3.geoPath()
    .projection(projection);

// Data and color scale
var data = d3.map();
var full_data = d3.map();
var colorScheme = d3.schemeReds[8];
colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
    .domain([1, 11, 51, 101, 201, 301, 401, 501])
    .range(colorScheme);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,20)");

    g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Athletes");

    g.append("text")
    .attr("class", "title")
    .attr("x", width/2)
    .attr("y", -6)
    .text(season + " Olympic Games Year " + year + " held in " + city + ", " + country);

    // not working




var labels = ['0', '1-10', '11-50', '50-100', '101-200', '201-300', '301-400', '401-500', '> 500'];
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);

// tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
            let name = d.properties.name;
            let info = data[name];
            var part = 0
            if(info != undefined) { part = info.participants; }
            return "<strong>Country:" + name +" <br> Participants: </strong> <span>" + part + "</span>";
          })

// Legend
svg.select(".legendThreshold")
    .call(legend);

// Tooltip
svg.call(tip);

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.json, "host_cities_markers.json")
    .defer(d3.csv, "regions_participants3.csv",
        function(d) {
            //console.log(d)
            if ('$' + d.Year in full_data){
                //console.log(d)
                var yearKey = '$' + d.Year;
                season = d.Season;

                if (season in full_data[yearKey]){
                } else {
                    full_data[yearKey][season] =  {'other': d.id};
                };

                full_data[yearKey][season][d.region] = {
                    participants: d.Name,
                    sports: d.Sport,
                                    }
            } else {
                full_data.set(d.Year, {});

                var yearKey = '$' + d.Year;
                season = d.Season;

                if (season in full_data[yearKey]){
                } else {
                    full_data[yearKey][season] =  {'other': d.id};
                };

                full_data[yearKey][season][d.region] = {
                    participants: d.Name,
                    sports: d.Sport,
                }

            };
            data = full_data['$' + year][season]
        })
    .await(ready);

function load_data(){
    data = full_data['$' + year][season];
}


function ready(error, topo, markers) {
    if (error) throw error;

  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("color", "black")
    .style("background-color", "white")
    .style("border-width", "1px")
    .style("padding", "5px");

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .attr("transform", "translate(" + width*0.1 + ",0)")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // check if country inside data
                if (data[d.properties.name] != undefined){

                    d.total = data[d.properties.name]['participants'] || 0;
                } else {
                    d.total = 0;
                }
                //d.total = data[d.properties.name] || 0;
                // Set the color
                return colorScale(d.total);
            })
            .attr("d", path)

          .style("stroke", "transparent")
          .attr("class", function(d){ return "Country" } )
          .style("opacity", 1)
          .on("mouseover", tip.show)
          .on("mouseleave", tip.hide );

          // Update title
    g.selectAll(".title")
    .text(season + " Olympic Games Year " + year + " held in " + city + ", " + country);

    // delete previous image
    g.selectAll("svg:image").remove()
    // add new
    g.append("svg:image")
    .attr("xlink:href", "country-flags-master/svg/" + country +".svg")
    .attr("x", width-100)
    .attr("y", -20)
    .attr("width", "20")
    .attr("height", "20");


    // remove the previous circle in host city
    svg.selectAll("circle").remove()

    // get the data for host city
    var data_marker = [markers[year][season]]

    // Add circle in host city
    svg.selectAll("myCircles")
      .data(data_marker)
      .enter()
      .append("circle")
        .attr("transform", "translate(" + width*0.1 + ",0)")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 4)
        .style("fill", "#0000A0")
        .attr("stroke", "#0000A0")
        .attr("stroke-width", 1)
        .attr("fill-opacity", .7);

}
