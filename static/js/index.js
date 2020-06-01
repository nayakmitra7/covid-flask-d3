
    function draw(data) {

      data.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.cured = +d.cured;
        d.Death = +d.Death;
        d.confirmed = +d.confirmed;
      });
      x.domain(d3.extent(data, function(d) { return d.Date; }));
      y.domain([d3.min(data, function(d) {
          return Math.min(d.cured, d.Death, d.confirmed) }),
          d3.max(data, function(d) {
          return Math.max(d.cured, d.Death, d.confirmed) })]);

      svg.append("path")
        .style("stroke", "green")
        .style("fill", "none")
        .attr("class", "line")
        .attr("d", curedLine(data));
      svg.append("path")
        .style("stroke", "blue")
        .style("fill", "none")
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", confirmedLine(data));
      svg.append("path")
        .style("stroke", "red")
        .attr("d", deathLine(data));
      // Add the X Axis

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + graphHeight + ")")
          .call(xAxis)
          .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(40)")
    .style("text-anchor", "start");

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
       svg.append("text")
		.attr("transform", "translate(" + (graphWidth) + "," + y(data[29].confirmed) + ")")
		.attr("text-anchor", "start")
		.style("fill", "blue")
		.text("Confirmed");

        svg.append("text")
		.attr("transform", "translate(" + (graphWidth) + "," + y(data[29].cured) + ")")
		.attr("text-anchor", "start")
		.style("fill", "green")
		.text("Cured");


	svg.append("text")
		.attr("transform", "translate(" + (graphWidth) + "," + y(data[29].Death) + ")")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("Death");

	svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 50 - margin.left)
      .attr("x",0 - (graphHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Case Count");
};


