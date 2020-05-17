function select(y){
    year = y.getYear() + 1900
    if (Object.keys(full_data['$'+year]).length > 2){
        season = 'Summer'
    } else {
        season = Object.keys(full_data['$'+year])[0]
    }
    //console.log(Object.keys(full_data['$'+year]).length)
    load_data();
    d3.queue()
        .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        .defer(d3.json, "host_cities_markers.json")
        .await(ready);
}

// Time
var dataTime = d3.range(0, 124, 4).map(function(d) {
        //console.log(full_data)
        //console.log(full_data['$' + d+1896])
        return new Date(1896 + d, 10, 3);
  });

//var dataTime = full_data.keys().forEach(function(d){
//    return new Date(1896, 10, 3);
//})



var sliderTime = d3
        .sliderBottom()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        .step(2*1000 * 60 * 60 * 24 * 365)
        .width(700)
        .tickFormat(d3.timeFormat('%Y'))
        .tickValues(dataTime)
        .default(new Date(1896, 10, 3))
        .on('onchange', val => {
                    select(val);
                  });

var gTime = d3
        .select('div#slider-time')
        .append('svg')
        .attr('width', 750)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
