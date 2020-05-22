
// set the dimensions and margins of the graph
var margin_sports = {top: 20, right: 30, bottom: 70, left: 30},
    width_sports= Math.min(1800,window.innerWidth) - 300 - margin_sports.left - margin_sports.right,
    height_sports= 1400 - margin_sports.top - margin_sports.bottom;

console.log('windowWidth', window.innerWidth)
var dy = 50;
var sports = {}
var selectedSport = []
var deltaXText = 0
var selected_sport = "Athelics"

//var year = 1896
var city = "Athina"
var country = "Greece"
var number_sports = 9

var heighMedals = function(){
  if((width_sports - 100)/2 < 100){
    return 4000;
  } else if ((width_sports - 100)/2 < 300) {
    return 2000;
  } else {
    return height_sports;
  }}

// svg pictograms
var svg3 = d3.select("#medals")
  .append("svg")
    .attr("width", (width_sports - 100)/2)
    .attr("height", function(){return heighMedals();})
    .attr("display","block")
    .attr("margin","auto")
  .append("g")
    .attr("width", (width_sports - 100)/2)
    .attr("height", function(){return heighMedals();})
    .attr("transform",
          "translate(" + margin_sports.left + "," + margin_sports.top + ")");


var text_x_pos = function(i){
  max_per_row = Math.floor(((width_sports - 100)/220))
  console.log((width_sports - 100)/220)
  //console.log(max_per_row)
  return parseInt(i%max_per_row)*110
}

var text_y_pos = function(i){
  max_per_row = Math.floor(((width_sports - 100)/220))
  //console.log(max_per_row)
  return parseInt(i/max_per_row)*110
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
  d3.json("data/sports_years.json", function(data){

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



        // INFORMATION PART

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
      //console.log(Object.entries(d[1]['countries']))

      return "<strong> Event: </strong>" + d[0] + "<br> <strong> Participant Countries: </strong> <span>" + Object.keys(d[1]['countries']).length + "</span>"
    + "<br> <strong> Total Athletes: </strong> <span>" + Object.values(d[1]['countries']).reduce((a, b) => a + b, 0) + "</span>";
          })
    // we have the necessary data. format those well.

svg.call(event_tip);
svg.call(sport_tip);


function display_sport_detail(game, sport_detail){
  g_subsports.selectAll("*").remove();
  //svg_info_medalists.selectAll("*").remove();

  g_subsports.append("text")
            .attr("x", width_svg_bars/2)
            .attr("y", 0)
            .text("Disciplines")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "20px")
            .attr("font-weight", 400)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

  var events_list = Object.entries(sport_detail);
  console.log(events_list);
  // it would be better to sort the events beforehand
  g_subsports.append("circle")
    .attr("cx", width_svg_bars/2 - 100)
    .attr("cy", (events_list.length/10 + 1)*30 +60)
    .attr("fill", "rgba(238,51,78,1)")
    .attr("r", 10);

  g_subsports.append("text")
            .attr("x", (width_svg_bars/2) - 100)
            .attr("y", (events_list.length/10 + 1)*30 +40)
            .text("Femenin Events")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "14px")
            .attr("font-weight", 200);

  g_subsports.append("circle")
    .attr("cx", width_svg_bars/2)
    .attr("cy", (events_list.length/10 + 1)*30 +60)
    .attr("fill", "purple")
    .attr("r", 10);

  g_subsports.append("text")
            .attr("x", (width_svg_bars/2))
            .attr("y", (events_list.length/10 + 1)*30 +40)
            .text("Mixed Events")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "14px")
            .attr("font-weight", 200);

  g_subsports.append("circle")
    .attr("cx", width_svg_bars/2 + 100)
    .attr("cy", (events_list.length/10 + 1)*30 +60)
    .attr("fill", "rgba(0,129,200,1)")
    .attr("r", 10);

  g_subsports.append("text")
            .attr("x", (width_svg_bars/2) + 100)
            .attr("y", (events_list.length/10 + 1)*30 +40)
            .text("Masculin Events")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "14px")
            .attr("font-weight", 200);

  g_subsports.selectAll("myCircleEvents")
    .data(events_list)
    .enter()
    .append("circle")
      .attr("class", "event")
      .attr("cx" , function(d,i){ console.log(d); console.log(i);
        if (i%2 == 0){
          return width_svg_bars/2 + parseInt((i)%10)*20 + 20;
        } else {
          return width_svg_bars/2 - parseInt((i)%10)*20;
        }})
        //return 80 + *parseInt(i%9)*25})
      .attr("cy" , function(d,i){
        return 30 + parseInt(i/10)*25})
      .style("fill", function(d){
        //differentiate circles with color
        if (d[0].indexOf("Women's") != -1){
          return "rgba(238,51,78,1)";
        }
        else if (d[0].indexOf("Mixed") != -1) {
          return "purple"
        }
        else{
          return "rgba(0,129,200,1)";}
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
const margin_text = 25//width_adjusted/20;

function update_sports(year, season) {
    svg3.selectAll("*").remove();
    g_subsports.selectAll("*").remove()
    svg_bars.selectAll("*").remove()
  //Remove previous entries to avoid overlapping
  var game = year + " " + season

  var sizeText = function(){
    if (width_svg_bars < 500){
      return "15px";
    } else {
      return "20px";
    }};

  svg_bars.append("text")
          .attr("x", 10)
          .attr("y", 150)
          .append('tspan')
          .attr('x', 0 + margin_text)
          .attr('dy', 5)
            .text("Click on the different pictograms to discover" )
            .attr("font-family", "Oswald")
            .attr("font-size", function(){return sizeText()})
            .attr("font-weight", 100)
          .append('tspan')
          .attr('x', 0 + margin_text)
          .attr('dy', 25)
            .text("more information about each sport." )
            .attr("font-family", "Oswald")
            .attr("font-size", function(){return sizeText()})
            .attr("font-weight", 100);




  d3.json("data/sports_game_details.json",function(data){
    console.log("GAME", game == "1916 Summer")
    if (game == "1916 Summer" | game == "1940 Summer" | game == "1944 Summer" | game == "2020 Summer"){
      svg_bars.selectAll("*").remove();

      svg_bars.append("text")
                .attr("class", "sport_information")
                .attr("x", -width_adjusted/4)
                .attr("y", 50)
                .append('tspan')
                  .attr('x', 0 + margin_text)
                  .attr('dy', 5)
                    .text("CANCELLED EDITION!")
                    .attr("font-family", "Oswald")
                    .attr("font-size", "40px")
                    .attr("font-weight", 200)

    } else {



    var sports_list = Object.keys(data[game]);
    var number_sports = sports_list.length

    var sizeTextBig = function(){
      if (width_svg_bars < 500){
        return "20px";
      } else {
        return "25px";
      }};

    var marginSummer = function(){
      if (width_svg_bars < 500){
        return -8;
      } else {
        return 15;
      }
    }

    var positionSeason = function(){
      if (width_svg_bars < 500){
        return 90;
      } else {
        return 85;
      }
    }

    svg3.selectAll("sportNames").remove()
      .data(sports_list)
      .enter()
      .append("svg:image")
        .attr("x", function(d,i){
          return deltaXText + text_x_pos(i)})
        .attr("y", function(d,i){return 10 + text_y_pos(i)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr('width', 90)
        .attr('height', 90)
        .attr("xlink:href", function(d) {
          return "sports_picto/" + d + ".jpeg"
        })
        .on("mouseover", sport_tip.show)
        .on("mouseleave", sport_tip.hide)
        .on("click", function(s){
          // on click, show events
          display_sport_detail(game,data[game][s]);
          d3.json("data/info_sports.json", function(info) {
                  update_bars(info[year][s], s);
                  });
          d3.json("data/medals_country.json", function(top) {
                  update_top_countries(top[year][s])
                    })
          });

    svg_bars.append("text")
              .attr("class", "sport_information")
              .attr("x", width_adjusted/4)
              .attr("y", 50)
              .append('tspan')
                .attr('x', 0 + margin_text)
                .attr('dy', 5)
                  .text("During the ")
                  .attr("font-family", "Oswald")
                  .attr("font-size", function(){return sizeTextBig()})
                  .attr("font-weight", 200)
              .append('tspan')
                .attr('x', positionSeason() + margin_text + marginSummer())
                .attr('dy', 0)
                  .text(season)
                  .attr("font-family", "Oswald")
                  .attr("font-size", function(){return sizeTextBig()})
                  .attr("fill", function(){
                    console.log('here', season)
                    if (season == "Summer"){

                      return "rgba(238,51,78,1)";
                    } else {
                      return "rgba(0,129,200,1)";
                    }
                  })
                  .attr("font-weight", 200)
              .append('tspan')
                .attr('x', function(){
                  if (season == "Summer"){
                    return 160 + margin_text + marginSummer();
                  } else {
                    return 145 + margin_text + + marginSummer();
                  }
                })
                .attr('dy', 0)
                  .text(" Olympic games of " + year + ",")
                  .attr("font-family", "Oswald")
                  .attr("font-size", function(){return sizeTextBig()})
                  .attr("font-weight", 200)
                  .attr("fill","#000")
              .append('tspan')
                .attr('x', 0 + margin_text)
                .attr('dy', 35)
                  .text("athletes could compete in " + number_sports + " different sports")
                  .attr("font-family", "Oswald")
                  .attr("font-size", function(){return sizeTextBig()})
                  .attr("font-weight", 200);
      }

      })

    }

function get_data_bar(value, label1, label2) {
      data_bar = [ {'cumulative': 0.0, 'value': value, 'label': label1},
          {'cumulative': value, 'value': Math.round((100.0-value) * 10) / 10, 'label': label2}];
      return data_bar
    }

function stackedBar (selection, data) {
  config = {
    f: d3.format('.1f'),
    margin: {top: 20, right: 10, bottom: 20, left: 10},
    barHeight: 30,
    //colors: ['#2FBD29', '#A7B7A6', '#3B8ACC', '#CC4F3B']
    colors: ['rgba(252,177,49,1)', 'rgba(226,229,227,0.5)', 'rgba(0,129,200,1)', 'rgba(238,51,78,1)']
  }
  const { f, margin, width, height, barHeight, colors } = config
  const w = width - margin.left - margin.right
  const h = height - margin.top - margin.bottom
  console.log(h, barHeight)
  const halfBarHeight = barHeight / 2

  // set up scales for horizontal placement
  var widthBars = Math.min(200, width_svg_bars/3)

  var xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, widthBars])

  svg_bars.selectAll('text').remove();

  selection.selectAll('rect').remove();
  selection.selectAll('text').remove();

  // stack rect for each data value
  selection.selectAll('rect')
    .data(data[0])
    .enter().append('rect')
    .attr('class', 'rect-stacked')
    .attr('stroke', 'black')
    .attr('stroke-width', 0.4)
    .attr('x', d => xScale(d.cumulative) + 30)
    .attr('y', halfBarHeight + 100)
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
    .attr('y', 2*barHeight + 100)
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
    .attr('x', 30 + widthBars/2)
    .attr('y', barHeight - 25 + 100)
    .style('fill', 'black')
    .text("Countries participating")

  selection.selectAll('rect2')
    .data(data[1])
    .enter().append('rect')
    .attr('class', 'rect-stacked')
    .attr('stroke', 'black')
    .attr('stroke-width', 0.4)
    .attr('x', d => xScale(d.cumulative) + 30 + widthBars*1.5)
    .attr('y', halfBarHeight + 100)
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
      .attr('x', xScale(data[1][0]['cumulative']) + (xScale(data[1][0]['value']) / 2) + 30 + widthBars*1.5)
      .attr('y', 2*barHeight + 100)
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
      .attr('x',  30 + widthBars*1.5 + widthBars/2)
      .attr('y', barHeight - 25 + 100)
      .style('fill', 'black')
      .text("Athletes participating")

  selection.selectAll('rect3')
    .data(data[2])
    .enter().append('rect')
    .attr('class', 'rect-stacked')
    .attr('stroke', 'black')
    .attr('stroke-width', 0.4)
    .attr('x', d => xScale(d.cumulative) + 30)
    .attr('y', halfBarHeight + 100 + 100)
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
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2) + 30)
      .attr('y', 2*barHeight + 100 + 100)
      .text(d  => d.value + ' %')
      .style('fill', (d, i) => colors[i+2])

    // add the labels
    selection.selectAll('.text-label3')
      .data(data[2])
      .enter().append('text')
      .attr('class', 'text-label')
      .attr('text-anchor', 'middle')
      .attr("font-family", "Oswald")
      .attr("font-size", "15px")
      .attr('text-anchor', 'middle')
      .attr('x', 30 + widthBars/2)
      .attr('y', barHeight - 25 + 100 + 100)
      .style('fill', 'black')
      .text("Male vs Female Athletes")

      selection.selectAll('rect4')
        .data(data[3])
        .enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.4)
        .attr('x', d => xScale(d.cumulative) + 30 + widthBars*1.5)
        .attr('y', halfBarHeight + 100 + 100)
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
          .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2) + 30 + widthBars*1.5)
          .attr('y', 2*barHeight + 100 + 100)
          .text(d => d.value + ' %')
          .style('fill', (d, i) => colors[i+2])

        // add the labels
        selection.selectAll('.text-label4')
          .data(data[3])
          .enter().append('text')
          .attr('class', 'text-label')
          .attr('text-anchor', 'middle')
          .attr("font-family", "Oswald")
          .attr("font-size", "15px")
          .attr('text-anchor', 'middle')
          .attr('x', 30 + widthBars*1.5 + widthBars/2)
          .attr('y', barHeight - 25 + 100 + 100)
          .style('fill', 'black')
          .text("Individual vs Team Events")

  }

var country_tip = d3.tip()
    .attr('class', 'd3-tip3')
    .offset(function() {
      return [this.getBBox().height*2, 0]
    })
    .html(function(d) {
      return "<strong>Country: </strong>" + d["Country"] + "<br><strong>Medals: </strong>" + d["Medals"];
    });

svg.call(country_tip);


function update_top_countries(top_data) {
  console.log(top_data["Gold"]);
  const img_size = 40;
  svg_bars.selectAll("image").remove();

  svg_bars.append("text")
            .attr("x", (width_svg_bars/2))
            .attr("y", 330)
            .text("TOP Countries")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "20px")
            .attr("font-weight", 400);

  svg_bars.append("text")
            .attr("x", (width_svg_bars/2) - 100)
            .attr("y", 380)
            .text("Gold")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "18px")
            .attr("font-weight", 400);

  svg_bars.selectAll("countryFlags")
          .data(top_data["Gold"])
          .enter()
          .append("svg:image")
          .attr("x", (width_svg_bars/2) - 100 - img_size/2)
          .attr("y", (d,i) => i*(img_size+10) + 390)
          .style("text-anchor", "middle")
          .attr("width", img_size)
          .attr("height", img_size)
          .attr("xlink:href", function(d,i) { return "country-flags-master/svg/" + d["Country"] + ".svg" })
          .on("mouseover", country_tip.show)
          .on("mouseleave", country_tip.hide);

    svg_bars.append("text")
            .attr("x", (width_svg_bars/2))
            .attr("y", 380)
            .text("Silver")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "18px")
            .attr("font-weight", 400);

  svg_bars.selectAll("countryFlags")
          .data(top_data["Silver"])
          .enter()
          .append("svg:image")
          .attr("x", (width_svg_bars/2) - img_size/2)
          .attr("y", (d,i) => i*(img_size+10) + 390)
          .style("text-anchor", "middle")
          .attr("width", img_size)
          .attr("height", img_size)
          .attr("xlink:href", d => "country-flags-master/svg/" + d["Country"] + ".svg")
          .on("mouseover", country_tip.show)
          .on("mouseleave", country_tip.hide);

    svg_bars.append("text")
            .attr("x", (width_svg_bars/2) + 100)
            .attr("y", 380)
            .text("Bronze")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "18px")
            .attr("font-weight", 400);

    svg_bars.selectAll("countryFlags")
            .data(top_data["Bronze"])
            .enter()
            .append("svg:image")
            .attr("x", (width_svg_bars/2) + 100 - img_size/2)
            .attr("y", (d,i) => i*(img_size+10) + 390)
            .style("text-anchor", "middle")
            .attr("width", img_size)
            .attr("height", img_size)
            .attr("xlink:href", d => "country-flags-master/svg/" + d["Country"] + ".svg")
            .on("mouseover", country_tip.show)
            .on("mouseleave", country_tip.hide);
}

var width_svg_bars = Math.min(550, (width_sports/2 + 100 ))
var translateX_bars = Math.max((width_sports -  width_svg_bars), (width_sports/2 ))

const svg_bars = d3.select('#bars_sports')
  .append("svg")
  .attr("width", width_svg_bars)
  .attr("height", 400+ margin_sports.top + margin_sports.bottom)
  .attr("transform", function(){
    return "translate(" + translateX_bars + ", -" + heighMedals()+ ")";
  })
  .attr("display","block")
  .attr("margin","auto")

var svg_subsports = d3.select('#bars_sports')
                      .append("svg")
                      .attr("width",width_svg_bars)
                      .attr("height", 250)
                      .attr("transform", function(){
                        return "translate(" + translateX_bars + ", -" + heighMedals()+ ")";
                      })

var g_subsports = svg_subsports.append("g")
                                .attr("width", width_svg_bars)
                                .attr("height", 250)
                                .attr("transform",
                                      "translate(" + 0 + ",  " + margin_sports.top + ")");



function update_bars(data, sport) {

  let data_countries = get_data_bar(data['countries'], 'Countries participating', 'Total');
  let data_athletes = get_data_bar(data['athletes'], 'Athletes participating', 'Total');
  let data_sex = get_data_bar(data['male'], 'Men', 'Women');
  let data_indiv = get_data_bar(data['individual'], 'Individual events', 'Team events');

  let all_data = [data_countries, data_athletes, data_sex, data_indiv]

  stackedBar(svg_bars, all_data);

  svg_bars.append("text")
          .attr("x", width_svg_bars/2)
          .attr("y", 40)
          .text(sport)
          .style("text-anchor", "middle")
          .attr("font-family", "Oswald")
          .attr("font-size", "22px")
          .attr("font-weight", 400)
          .attr("alignment-baseline","middle")
          .attr("text-anchor", "middle");
}
// Initialize plot
update_sports(year, season)
