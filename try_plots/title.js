var title_games = d3.select("#title")
                .append("svg")
                .attr("width", 1100)
                .attr("height", 80);

function update_title(year, city, country){
        console.log("here")
  title_games.selectAll("text").remove();

    title_games.append("text")
            .attr("x", 250)
            .attr("y", 50)
            .text("Discovering the Olympic games of " + year + " ( " + city + ", " + country + ")")
            .attr("font-family", "Oswald")
            .attr("font-size", "25px")
            .attr("font-weight", 900);
}

update_title(1896, "Athina", "Greece");
