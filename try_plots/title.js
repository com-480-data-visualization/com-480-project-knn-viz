var width_title = window.innerWidth;
var height_title = 80;

var title_games = d3.select("#title")
                .append("svg")
                .attr("width", width_title - width_timeline)
                .attr("height", height_title);

function update_title(year, city, country){
        console.log("here")
        console.log(width_title)
  title_games.selectAll("text").remove();

    title_games.append("text")
            .attr("x", width_title/2)
            .attr("y", 50)
            .text("Discovering the Olympic games of " + year + " ( " + city + ", " + country + ")")
            .attr("font-family", "Oswald")
            .attr("font-size", "25px")
            .attr("font-weight", 900);
}

update_title(1896, "Athina", "Greece");
