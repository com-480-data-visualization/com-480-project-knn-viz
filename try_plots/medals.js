
// set the dimensions and margins of the graph
var margin_sports = {top: 20, right: 30, bottom: 70, left: 60},
    width_sports= 800 - margin_sports.left - margin_sports.right,
    height_sports= 400 - margin_sports.top - margin_sports.bottom;

var dy = 50;
var sports = {}
var selectedSport = []
var deltaXText = 0
var selected_sport = "Athelics"

//var year = 1896
var city = "Athina"
var country = "Greece"


var title_details = d3.select("#medals")
                .append("svg")
                .attr("width", 1100)
                .attr("height", 80);

// append the svg object to the body of the page
var svg3 = d3.select("#medals")
  .append("svg")
    .attr("width", width_sports)
    .attr("height", height_sports+ margin_sports.top + margin_sports.bottom)
  .append("g")
    .attr("width", 1000)
    .attr("height", height_sports)
    .attr("transform",
          "translate(" + margin_sports.left + "," + margin_sports.top + ")");

var svg_info_sports = d3.select("#medals")
  .append("svg")
    .attr("width",width_sports)
    .attr("height", 123)
  .append("g")
    .attr("width", 873)
    .attr("height", 111)
    .attr("transform",
          "translate(" + margin_sports.left + "," + margin_sports.top + ")");

var svg_info_medalists = d3.select("#medals")
  .append("svg")
    .attr("width",width_sports)
    .attr("height", 150)
  .append("g")
    .attr("width", 873)
    .attr("height", 150)
    .attr("transform",
          "translate(" + margin_sports.left + "," + margin_sports.top + ")");



var text_x_pos = function(i){
  return parseInt(i%8)*70
}

var text_y_pos = function(i){
  return parseInt(i/8)*70
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


var sport_tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d
          })

var event_tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      console.log(Object.entries(d[1]['countries']))

      return "<strong> Event: </strong>" + d[0] + "<br> <strong> Participant Countries: </strong> <span>" + Object.keys(d[1]['countries']).length + "</span>"
    + "<br> <strong> Total Athletes: </strong> <span>" + Object.values(d[1]['countries']).reduce((a, b) => a + b, 0) + "</span>";
          })
    // we have the necessary data. format those well.

svg.call(event_tip);
svg.call(sport_tip);
//svg.call(medalist_tip);



function display_medalists(medalists){
  // we can make this more precise as well. considering the ties
  svg_info_medalists.selectAll("*").remove()
    .data(medalists)
    .enter()
    .append("circle")
      .attr("class","medalist")
      .attr("cx", function(d,i){
        return (i+1)%3 * 40})
      .attr("cy", function(d,i){
        return 40 + i * 20})
      .style("fill", function(d,i){
        if (i == 0){
          return "rgba(255, 215, 0,1)"
        }
        else if (i == 1){
          return "rgba(192, 192, 192,1)"
        }
        else{
          return "rgba(205, 127, 50,1)"}
        })
        .attr("r", 15)
        .on("mouseover", sport_tip.show)
        .on("mouseleave", sport_tip.hide);
      }


function display_sport_detail(game, sport_detail){
  svg_info_sports.selectAll("*").remove();
  svg_info_medalists.selectAll("*").remove()

  var events_list = Object.entries(sport_detail);
  // it would be better to sort the events beforehand
  svg_info_sports.selectAll("*").remove()
    .data(events_list)
    .enter()
    .append("circle")
      .attr("class", "event")
      .attr("cx" , function(d,i){
        return 80 + parseInt(i%20)*25})
      .attr("cy" , function(d,i){
        return parseInt(i/20)*25})
      .style("fill", function(d){
        //differentiate circles with color
        if (d[0].indexOf("Women's") != -1){
          return "red"
        }
        else if (d[0].indexOf("Mixed") != -1) {
          return "purple"
        }
        else{
          return "blue"}
        })
      .attr("r",10)
      .on("mouseover", event_tip.show)
      .on("mouseleave", event_tip.hide)
      .on("click", function(d){
        display_medalists(d[1]['medalists']);
      })

      }



          // participating countries -> update map as well?
          // for each events, show medalists
          // MVP countries overall

function update_sports(year, season) {
    svg3.selectAll("*").remove();
    svg_info_sports.selectAll("*").remove()
    svg_info_medalists.selectAll("*").remove()
  //Remove previous entries to avoid overlapping
  var game = year + " " + season

  d3.json("sports_game_details.json",function(data){

    var sports_list = Object.keys(data[game]);
    svg3.selectAll("sportNames").remove()
      .data(sports_list)
      .enter()
      .append("svg:image")

        .attr("x", function(d,i){
          return deltaXText + text_x_pos(i)})
        .attr("y", function(d,i){return 10 + text_y_pos(i)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr('width', 60)
        .attr('height', 60)
        .attr("xlink:href", function(d) {
          return "sports_picto/" + d + ".jpeg"
        })
        .on("mouseover", sport_tip.show)
        .on("click", function(s){
          // on click, show events
          display_sport_detail(game,data[game][s]);
          d3.json("info_sports.json", function(info) {
            update_bars(info[year][s]);
          });
        })

        // load pictogram file, display,  make svg element -> check with data


    title_details.selectAll("text").remove()
      .data(game, sports_list)
      .entr()
      .append("text")
      .attr("x", 150)
      .attr("y", 50)
      .text("Sports of " + game + ": " + sports_list.length)
      .attr("font-family", "Oswald")
      .attr("font-size", "20px")
      .attr("font-weight", 900);



      })

    }

    function get_data_bar(value, label1, label2) {
      data_bar = [ {'cumulative': 0.0, 'value': value, 'label': label1},
          {'cumulative': value, 'value': 100.0-value, 'label': label2}];
      return data_bar
    }

    function stackedBar (selection, data) {
      config = {
        f: d3.format('.1f'),
        margin: {top: 20, right: 10, bottom: 20, left: 10},
        width: 250,
        height: 500,
        barHeight: 30,
        colors: ['#2FBD29', '#A7B7A6', '#3B8ACC', '#CC4F3B']
      }
      const { f, margin, width, height, barHeight, colors } = config
      const w = width - margin.left - margin.right
      const h = height - margin.top - margin.bottom
      const halfBarHeight = barHeight / 2

      // set up scales for horizontal placement
      const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 200])

      // create svg in passed in div
      selection.attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      selection.selectAll('rect').remove();
      selection.selectAll('text').remove()

      // stack rect for each data value
      selection.selectAll('rect')
        .data(data[0])
        .enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.4)
        .attr('x', d => xScale(d.cumulative) + 30)
        .attr('y', halfBarHeight + 30)
        .attr('height', barHeight)
        .attr('width', d => xScale(d.value))
        .style('fill', (d, i) => colors[i])

      // add values on bar
      selection.selectAll('.text-value')
        .data(data[0])
        .enter().append('text')
        .attr('class', 'text-value')
        .style('fill', 'black')
        .attr('text-anchor', 'middle')
        .attr("font-family", "Oswald")
        .attr("font-size", "12px")
        .attr("font-weight", 100)
        .attr('x', xScale(data[0][0]['cumulative']) + (xScale(data[0][0]['value']) / 2) + 30)
        .attr('y', barHeight + 65)
        .text(data[0][0]['value'] + ' %')

      // add the labels
      selection.selectAll('.text-label')
        .data(data[0])
        .enter().append('text')
        .attr('class', 'text-label')
        .attr('text-anchor', 'middle')
        .attr("font-family", "Oswald")
        .attr("font-size", "15px")
        .attr('text-anchor', 'middle')
        .attr('x', 130)
        .attr('y', barHeight)
        .style('fill', 'black')
        .text("Countries participating")

      selection.selectAll('rect2')
        .data(data[1])
        .enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.4)
        .attr('x', d => xScale(d.cumulative) + 30)
        .attr('y', halfBarHeight + 130 + 20)
        .attr('height', barHeight)
        .attr('width', d => xScale(d.value))
        .style('fill', (d, i) => colors[i])

        // add values on bar
        selection.selectAll('.text-value2')
          .data(data[1])
          .enter().append('text')
          .attr('class', 'text-value')
          .style('fill', 'black')
          .attr('text-anchor', 'middle')
          .attr("font-family", "Oswald")
          .attr("font-size", "12px")
          .attr('x', xScale(data[1][0]['cumulative']) + (xScale(data[1][0]['value']) / 2) + 30)
          .attr('y', barHeight + 165 + 20)
          .text(data[1][0]['value'] + ' %')

        // add the labels
        selection.selectAll('.text-label2')
          .data(data[1])
          .enter().append('text')
          .attr('class', 'text-label')
          .attr('text-anchor', 'middle')
          .attr("font-family", "Oswald")
          .attr("font-size", "15px")
          .attr('text-anchor', 'middle')
          .attr('x', 130)
          .attr('y', barHeight + 100 + 20)
          .style('fill', 'black')
          .text("Athletes participating")

      selection.selectAll('rect3')
        .data(data[2])
        .enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.4)
        .attr('x', d => xScale(d.cumulative) + 30)
        .attr('y', halfBarHeight + 230 + 40)
        .attr('height', barHeight)
        .attr('width', d => xScale(d.value))
        .style('fill', (d, i) => colors[i+2])

        // add values on bar
        selection.selectAll('.text-value3')
          .data(data[2])
          .enter().append('text')
          .attr('class', 'text-value')
          .style('fill', 'black')
          .attr('text-anchor', 'middle')
          .attr("font-family", "Oswald")
          .attr("font-size", "12px")
          .attr('x', d => xScale(data[2][0]['cumulative']) + (xScale(data[2][0]['value']) / 2) + 30)
          .attr('y', barHeight + 265 + 40)
          .text(data[2][0]['value'] + ' %')

        // add the labels
        selection.selectAll('.text-label3')
          .data(data[3])
          .enter().append('text')
          .attr('class', 'text-label')
          .attr('text-anchor', 'middle')
          .attr("font-family", "Oswald")
          .attr("font-size", "15px")
          .attr('text-anchor', 'middle')
          .attr('x', 130)
          .attr('y', barHeight + 200 + 40)
          .style('fill', 'black')
          .text("Male vs Female Athletes")

          selection.selectAll('rect4')
            .data(data[3])
            .enter().append('rect')
            .attr('class', 'rect-stacked')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.4)
            .attr('x', d => xScale(d.cumulative) + 30)
            .attr('y', halfBarHeight + 330 + 60)
            .attr('height', barHeight)
            .attr('width', d => xScale(d.value))
            .style('fill', (d, i) => colors[i+2])

            // add values on bar
            selection.selectAll('.text-value4')
              .data(data[3])
              .enter().append('text')
              .attr('class', 'text-value')
              .style('fill', 'black')
              .attr('text-anchor', 'middle')
              .attr("font-family", "Oswald")
              .attr("font-size", "12px")
              .attr('x', xScale(data[3][0]['cumulative']) + (xScale(data[3][0]['value']) / 2) + 30)
              .attr('y', barHeight + 365 + 60)
              .text(data[3][0]['value'] + ' %')

            // add the labels
            selection.selectAll('.text-label4')
              .data(data[3])
              .enter().append('text')
              .attr('class', 'text-label')
              .attr('text-anchor', 'middle')
              .attr("font-family", "Oswald")
              .attr("font-size", "15px")
              .attr('text-anchor', 'middle')
              .attr('x', 130)
              .attr('y', barHeight + 300 + 60)
              .style('fill', 'black')
              .text("Individual vs Team Events")

      }

    const svg_bars = d3.select('#bars_sports')
      .append('svg')

    function update_bars(data) {

      let data_countries = get_data_bar(data['countries'], 'Countries participating', 'Total');
      let data_athletes = get_data_bar(data['athletes'], 'Athletes participating', 'Total');
      let data_sex = get_data_bar(data['male'], 'Men', 'Women');
      let data_indiv = get_data_bar(data['individual'], 'Individual events', 'Team events');

      let all_data = [data_countries, data_athletes, data_sex, data_indiv]
      console.log(all_data)
      console.log(all_data[0])
      console.log(all_data[1])

      stackedBar(svg_bars, all_data);
    }
// Initialize plot
update_sports(year, season)
