
// set the dimensions and margins of the graph
var margin_medals = {top: 20, right: 30, bottom: 70, left: 60},
    width_medals= 1100 - margin_medals.left - margin_medals.right,
    height_medals= 2500 - margin_medals.top - margin_medals.bottom;

var dy = 50;
var sports = {}
var selectedSport = []
var deltaXText = 100

//var year = 1896
var city = "Athens"
var country = "Greece"


// append the svg object to the body of the page
var svg3 = d3.select("#medals")
  .append("svg")
    .attr("width", width_medals+ margin_medals.left + margin_medals.right)
    .attr("height", height_medals+ margin_medals.top + margin_medals.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_medals.left + "," + margin_medals.top + ")");

var getXText = function(i){
  return parseInt(i%3)*200;
}

var getYText = function(i){
  return parseInt(i/3)*80;
}


// A function that create / update the plot for a given variable:
function update_medals(year) {
  console.log(year)
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


        svg3.selectAll("image").remove()
          // add new
        svg3.append("svg:image")
          .attr("xlink:href", "pictures/olympics_" + year +".jpg")
          .attr("x", width_medals - 350)
          .attr("y", -20)
          .attr("width", "400")
          .attr("height", "150");


  })
}


// Initialize plot
update_medals(year)
