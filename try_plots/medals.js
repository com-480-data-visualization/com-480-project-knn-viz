
// set the dimensions and margins of the graph
var margin_medals = {top: 20, right: 30, bottom: 70, left: 60},
    width_medals= 1100 - margin_medals.left - margin_medals.right,
    height_medals= 3500 - margin_medals.top - margin_medals.bottom;

var dy = 50;
var sports = {}
var selectedSport = []
var deltaXText = 100
var selected_sport = "Athelics"

//var year = 1896
var city = "Athina"
var country = "Greece"


// append the svg object to the body of the page
var svg3 = d3.select("#medals")
  .append("svg")
    .attr("width", width_medals)
    .attr("height", height_medals+ margin_medals.top + margin_medals.bottom)
  .append("g")
    .attr("width", 1000)
    .attr("height", height_medals)
    .attr("transform",
          "translate(" + margin_medals.left + "," + margin_medals.top + ")");

var svg_info_medals = d3.select("#medals")
  .append("svg")
    .attr("width", width_medals/2)
    .attr("height", height_medals+ margin_medals.top + margin_medals.bottom)
  .append("g")
    .attr("width", 600)
    .attr("height", height_medals)
    .attr("transform",
          "translate(" + margin_medals.left + "," + margin_medals.top + ")");


var text_x_pos = function(i){
  return parseInt(i%6)*150
}

var text_y_pos = function(i){
  return parseInt(i/6)*80
}

// Display info medals
var info_medal = function generate_info_medals(selected_sport){
  console.log(selected_sport)
  svg_info_medals.selectAll(".infoTitle").remove();

  svg_info_medals.append("text")
    .attr("class", "infoTitle")
    .attr("x", margin.left)
    .attr("y", 10)
    .text(selected_sport)
    .attr("font-size", "30px")

  svg_info_medals.selectAll("image").remove()
    // add new
  svg_info_medals.append("svg:image")
    .attr("xlink:href", "pictures/olympics_" + year +".jpg")
    .attr("x", 100)
    .attr("y", -20)
    .attr("width", "400")
    .attr("height", "150");

  svg_info_medals.append("text")
    .attr("class", "infoTitle")
    .attr("x", margin.left)
    .attr("y", 250)
    .text("Number of participating athletes: ")
    .attr("font-size", "20px")

  svg_info_medals.append("text")
    .attr("class", "infoTitle")
    .attr("x", margin.left + 20)
    .attr("y", 300)
    .text("   Men: ")
    .attr("font-size", "15px")

  svg_info_medals.append("text")
    .attr("class", "infoTitle")
    .attr("x", margin.left + 20)
    .attr("y", 350)
    .text("   Women: ")
    .attr("font-size", "15px")

  svg_info_medals.append("text")
    .attr("class", "infoTitle")
    .attr("x", margin.left)
    .attr("y", 450)
    .text("Number of participating countries: ")
    .attr("font-size", "20px")


}

var delete_content = function delete_content(){
    svg_info_medals.selectAll(".infoTitle").remove();
    svg_info_medals.selectAll("image").remove();
}


// A function that create / update the plot for a given variable:
function update_medals(year) {
  //Remove previous entries to avoid overlapping
  svg3.selectAll("*").remove();

  // Parse the Data
  d3.json("sports_years.json", function(data){

    svg3.selectAll("sportNames")
      .data(data)
      .enter()
      .append("text")
        .attr("class", "sport")
        .attr("x", function(d,i){
          return deltaXText + getXText(i)})
        .attr("y", function(d,i){return 10 + getYText(i)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){
          if (d[String(year)][season] > 0){
            return 'black';
          }
          return 'grey';
        })
        .text(function(d){
          return d.name})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("click", function(d){
          if (d[String(year)][season] > 0){
            info_medal(d.name);
          } else {
            delete_content();
          }

        })

    svg3.selectAll("sportNames")
          .data(data)
          .enter()
          .append("text")
            .attr("class", "sportLegend")
            .attr("x", function(d,i){
              return deltaXText + getXText(i)})
            .attr("y", function(d,i){return 10 + 16 + getYText(i)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){
              if (d[String(year)][season] > 0){
                return 'black';
              }
              return 'grey';
            })
            .text(function(d){
              if (d[String(year)][season] > 0){
                return "Total Participants : " + String(d[String(year)][season]);
              }
              return " "})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")


    svg3.selectAll("sportCircles")
          .data(data)
          .enter()
          .append("circle")
            .attr("class", "myCircleMedals")
            .attr("cx", function(d,i){
              return deltaXText -10 + getXText(i)})
            .attr("cy", function(d,i){return 7 + getYText(i)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){
              if (d[String(year)][season] > 0){
                return 'green';
              }
              return 'red';
            })
            .attr("r",4)


            // add medal symbols - GOLD
      svg3.selectAll("sportCircles")
          .data(data)
          .enter()
          .append("circle")
              .attr("class", "myCircleMedals")
              .attr("cx", function(d,i){
                      return deltaXText -10 + 10+ getXText(i)})
              .attr("cy", function(d,i){return 10 + 35 + getYText(i)}) // 100 is where the first dot appears. 25 is the distance between dots
              .style("fill", function(d){
                      if (d[String(year)][season] > 0){
                        return "rgba(255, 215, 0,1)";
                      }
                      return "rgba(255,255,255,0)";
                    })
              .attr("r",4)

        svg3.selectAll("sportCircles")
            .data(data)
            .enter()
            .append("circle")
                .attr("class", "myCircleMedals")
                .attr("cx", function(d,i){
                        return deltaXText -10 + 50+ getXText(i)})
                .attr("cy", function(d,i){return 10 + 35 + getYText(i)}) // 100 is where the first dot appears. 25 is the distance between dots
                .style("fill", function(d){
                        if (d[String(year)][season] > 0){
                          return "rgba(192, 192, 192,1)";
                        }
                        return "rgba(255,255,255,0)";
                      })
                .attr("r",4)

        svg3.selectAll("sportCircles")
            .data(data)
            .enter()
            .append("circle")
                .attr("class", "myCircleMedals")
                .attr("cx", function(d,i){
                        return deltaXText -10 + 90+ getXText(i)})
                .attr("cy", function(d,i){return 10 + 35 + getYText(i)}) // 100 is where the first dot appears. 25 is the distance between dots
                .style("fill", function(d){
                        if (d[String(year)][season] > 0){
                          return "rgba(205, 127, 50,1)";
                        }
                        return "rgba(255,255,255,0)";
                      })
                .attr("r",4)


        // INFORMATION PART




      /*svg3.selectAll("podiums")
          .data(data)
          .enter()
          .append("svg:image")
          .attr('x', function(d,i){
            return deltaXText -10 + getXText(i)})
          .attr('y', function(d,i){return 25 + getYText(i)})
          .attr('width', 90)
          .attr('height', 50)
          .attr("xlink:href", function(d){
                  if (d[String(year)][season] > 0){
                    return "/podium/podium.png";
                  }});*/


  })
}

var svg_events = d3.select("#medals")
  .append("svg")
    .attr("width", width_medals/2)
    .attr("height", height_medals+ margin_medals.top + margin_medals.bottom)
  .append("g")
    .attr("width", 600)
    .attr("height", height_medals)
    .attr("transform",
          "translate(" + margin_medals.left + "," + margin_medals.top + ")");



function display_sport_detail(game, sport_detail){
  var events_list = sport_detail;//Object.keys(sport_detail);
  console.log(events_list)

  svg3.selectAll("eventNames").remove()
    .data(events_list)
    .enter()
    .append("text")
      .attr("class", "event")
      .attr("x", function(d,i){
        return deltaXText + text_x_pos(i)})
      .attr("y", function(d,i){return 510 + text_y_pos(i)}) // 100 is where the first dot appears. 25 is the distance between dots
      .text(function(d){
        return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")



    // participating countries -> update map as well?
    // events -> individual/team, men's/women's/mixed -> into small svg circles
    // for each events, show medalists
    // MVP countries overall
}

function update_sports(year, season) {
    svg3.selectAll("*").remove();
  //Remove previous entries to avoid overlapping
  var game = year + " " + season

  d3.json("sports_game_details.json",function(data){
    var sports_list = Object.keys(data[game]);

    svg3.selectAll("sportNames").remove()
      .data(sports_list)
      .enter()
      .append("text")
        .attr("class", "sport")
        .attr("x", function(d,i){
          return deltaXText + text_x_pos(i)})
        .attr("y", function(d,i){return 10 + text_y_pos(i)}) // 100 is where the first dot appears. 25 is the distance between dots
        .text(function(d){
          return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("click", function(s){
          // on click, show events
          display_sport_detail(game,data[game][s]);

        // load pictogram file, display,  make svg element
        })
      })
    }


// Initialize plot
update_sports(year, season)
