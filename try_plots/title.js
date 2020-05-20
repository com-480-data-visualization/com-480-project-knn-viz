var width_title = Math.min(1800, window.innerWidth) - 210//width_timeline = 200 + width_legend_timeline=100;
console.log(width_title)
var height_title = 80;

var title_games = d3.select("#title")
                .append("svg")
                .attr("width", width_title)
                .attr("height", height_title)
                .attr("transform","translate(" + 0 +",0)");

function update_title(year, city, country){
  title_games.selectAll("text").remove();

    title_games.append("text")
            .attr("x", (width_title)/2)
            .attr("y", 50)
            .text("Discovering the Olympic games of " + year + " (" + city + ", " + country + ")")
            .attr("font-family", "Oswald")
            .attr("font-size", "25px")
            .attr("font-weight", 900)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");
}

update_title(1896, "Athina", "Greece");
