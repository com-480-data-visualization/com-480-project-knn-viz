var width = 1200
var height = 700
var width_window = Math.min(1200, window.innerWidth)
var height_window = window.innerHeight

var width_adjusted = window.innerWidth  - 300

var year = 1896
var season = 'Summer'
var city = "Athina"
var country = "Greece"

var country_code = d3.map()

var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width_adjusted)
  .attr("height", height);

var info_games = d3.select("#logo_games")
        .append("svg")
        .attr("width", width_adjusted-200)
        .attr("height", 200)
        .attr("transform", "translate("+ (width_adjusted/4) + ","+ 100 +")");



function upload_info_games(year, city, country, edition, season, n_countries, n_athletes) {
  info_games.selectAll("text").remove();
  info_games.selectAll("image").remove();

  if (year <= 1928) {
    info_games.append("svg:image")
      .attr('x', 50)
      .attr('y', 10)
      .attr('width', 150)
      .attr('height', 150)
      .attr("xlink:href", "logos/" + year + "-" + season + ".jpg");
  } else {
    info_games.append("svg:image")
      .attr('x', 50)
      .attr('y', 10)
      .attr('width', 150)
      .attr('height', 150)
      .attr("xlink:href", "logos/" + year + "-" + season + ".png");
  }

  if (edition == 1 | edition == 21) {
      info_games.append("text")
                .attr("x", 250)
                .attr("y", 40)
                .text(edition + "st EDITION OF " +  season.toUpperCase() + " OLYMPIC GAMES")
                .attr("font-family", "Oswald")
                .attr("font-size", "30px")
                .attr("font-weight", 900);
  } else if (edition == 2 | edition == 22) {
      info_games.append("text")
                .attr("x", 250)
                .attr("y", 40)
                .text(edition + "nd EDITION OF " +  season.toUpperCase() + " OLYMPIC GAMES")
                .attr("font-family", "Oswald")
                .attr("font-size", "30px")
                .attr("font-weight", 900);
  } else if (edition == 3 | edition == 23) {
      info_games.append("text")
                .attr("x", 250)
                .attr("y", 40)
                .text(edition + "rd EDITION OF " +  season.toUpperCase() + " OLYMPIC GAMES")
                .attr("font-family", "Oswald")
                .attr("font-size", "30px")
                .attr("font-weight", 900);
  } else {
      info_games.append("text")
                .attr("x", 250)
                .attr("y", 40)
                .text(edition + "th EDITION OF " +  season.toUpperCase() + " OLYMPIC GAMES")
                .attr("font-family", "Oswald")
                .attr("font-size", "30px")
                .attr("font-weight", 900);
  }

  info_games.append("svg:image")
            .attr("xlink:href", "country-flags-master/svg/" + country + ".svg")
            .attr("x", 250)
            .attr("y", 55)
            .attr("width", "30")
            .attr("height", "30");

  info_games.append("text")
            .attr("x", 290)
            .attr("y", 80)
            .text(city + ", " + country + " - " + year)
            .attr("font-family", "Oswald")
            .attr("font-size", "25px")
            .attr("font-weight", 900);

  info_games.append("text")
            .attr("x", 250)
            .attr("y", 120)
            .text("Total Number of Countries Participating: " + n_countries)
            .attr("font-family", "Oswald")
            .attr("font-size", "18px")
            .attr("fill", "gray")
            .attr("font-weight", 700);

  info_games.append("text")
            .attr("x", 250)
            .attr("y", 150)
            .text("Total Number of Athletes Participating: " + n_athletes.toLocaleString())
            .attr("font-family", "Oswald")
            .attr("font-size", "18px")
            .attr("fill", "gray")
            .attr("font-weight", 700);


}

upload_info_games(year, "Athina", country, 1, season, 12, 176);


// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
    .scale(width_adjusted / 2 / Math.PI)
    .translate([width_adjusted / 2, height / 2])
var path = d3.geoPath()
    .projection(projection);


// Data and color scale
var data = d3.map();
var full_data = d3.map();


var get_color = function(season){
    if (season == "Summer"){
        return d3.schemeYlOrRd[8];
    } else {
        return d3.schemePuBu[8];
    }
}

var colorScheme = get_color(season)
    colorScheme.unshift("#eee")

var colorScale = d3.scaleThreshold()
    .domain([1, 11, 51, 101, 201, 301, 401, 501])
    .range(colorScheme);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,100)");

    g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Athletes");


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
            return "<strong>Country: " + name +" <br> Participants: </strong> <span>" + part + "</span>";
          })

var tip2 = d3.tip()
    .attr('class', 'd3-tip2')
    .offset([-10, 0])
    .html(function(d) {
            let city = d.city;
            let country = d.country;
            return "<strong>Host city: </strong>" + city + ", " + country;
          })

// Legend
svg.select(".legendThreshold")
    .call(legend);

// Tooltip
svg.call(tip);
svg.call(tip2);

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.json, "data/host_cities_markers.json")
    .defer(d3.csv, "data/regions_participants3.csv",
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


    svg.selectAll("path").remove();
    //svg.selectAll("g").remove();  // to see the legend

    // Draw the map
    var delta_x = 100
    svg.append("g")
        .attr("class", "countries")
        .attr("transform", "translate(" + delta_x + ",100)")
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

          .attr("stroke-opacity", 0.1)
          .style("stroke", "gray")
          .attr("class", function(d){ return "Country" } )
          .style("fill-opacity", 1)
          .on("mouseover", tip.show)
          .on("mouseleave", tip.hide);

          // Update title
    g.selectAll(".title")
    .text(season + " Olympic Games Year " + year + " held in " + city + ", " + country);



    // remove the previous circle in host city
    svg.selectAll("image").remove()

    // get the data for host city
    var data_marker = [markers[year][season]]
    console.log(data_marker)


    svg.selectAll("myLocation")
      .data(data_marker)
      .enter()
      .append("svg:image")
        .attr("transform", "translate(" + delta_x + ",100)")
        .attr("x", function(d){ return projection([d.long, d.lat])[0]-17})
        .attr("y", function(d){ return projection([d.long, d.lat])[1]-30})
        .attr('width', 35)
        .attr('height', 45)
        .attr("xlink:href", "images/location.png")
        .on("mouseover", tip2.show)
        .on("mouseleave", tip2.hide);

    var edition = markers[year][season]['edition']
    var n_athletes = markers[year][season]['n_athletes']
    var n_countries = markers[year][season]['n_countries']

    //console.log(city)
    // Change info about games
    upload_info_games(year, city, country, edition, season, n_countries, n_athletes);
}
