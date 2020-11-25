function makeGauge(divID, sentimentScore) {
    var gaugeSVG = d3.select("#dangerGauge").append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");

    var gauge = document.getElementById(divID);
    var divHeight = gauge.scrollHeight;
    var divWidth = gauge.scrollWidth;
    gauge.innerHTML = "";


    gaugeSVG = d3.select("#" + divID).append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")

    if (divID == "enlargedChart") {
        var divHeight = 602;
        var divWidth = 944;
    }
    else {
        var divHeight = gauge.offsetHeight;
        var divWidth = gauge.offsetWidth;
    }

    appendArc(gaugeSVG, divWidth, divHeight, 240, 288, "#b7ff90", 'veryLow' + divID);
    appendArc(gaugeSVG, divWidth, divHeight, 288, 336, "#f3ff90", 'low' + divID);
    appendArc(gaugeSVG, divWidth, divHeight, 336, 384, "#ffea90", 'medium' + divID);
    appendArc(gaugeSVG, divWidth, divHeight, 24, 72, "#ffc990", 'high' + divID);
    appendArc(gaugeSVG, divWidth, divHeight, 72, 120, "#ff9090", 'veryHigh' + divID);

    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.077 * divHeight, 0.11 * divHeight, '#veryLow' + divID, 'VERY LOW')
    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.125 * divHeight, 0.11 * divHeight, '#low' + divID, 'LOW')
    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.1 * divHeight, 0.11 * divHeight, '#medium' + divID, 'MEDIUM')
    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.16 * divHeight, 0.11 * divHeight, '#high' + divID, 'HIGH')
    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.065 * divHeight, 0.11 * divHeight, '#veryHigh' + divID, 'VERY HIGH')

    gaugeSVG.append('g')
        .attr('transform', 'translate(' + divWidth / 2 + ',' + 3 * divHeight / 5 + ")")
        .append("polygon")
        .attr('stroke-width', 3)
        .attr('fill', '#820812')
        .attr('class', 'needle')
        .attr('points', "0,0 -" + "0," + 0.02 * divHeight +
            " " + -divWidth / 4 + ",0 " + "0," + -divHeight * 0.02)
        .transition()
        .ease(d3.easeElastic)
        .duration(5000)
        .attr("transform", "rotate(" + (sentimentScore / 100 * 240 - 30) + ")");

    /* gaugeSVG.append('g')
            .attr('transform', 'translate(' + divWidth / 2 + ',' + 3*divHeight / 5 + ")")
            .append("polygon")
            .attr('class', 'needle')
            .attr('points', "0,0 -" + 0.04 * divHeight + "," + 0.02 * divHeight +
                " " + -divWidth / 4 + ",0 " + -divHeight * 0.04 + "," + -divHeight * 0.02)
            .transition()
            .ease(d3.easeElastic)
            .duration(5000)
            .attr("transform", "rotate(180)"); */



    gaugeSVG.append('g')
        .attr('transform', 'translate(' + divWidth / 2.05 + ',' + divWidth / 1.8 + ")")
        .append('text')
        .text(sentimentScore.toFixed(1))
        .attr('id', 'sentimentIndicator')
        .style('font-style', 'italic')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .style('font-size', 0.109 * divHeight);



    gaugeSVG.append("circle")
        .style("fill", "black")
        .attr("r", 0.02 * divHeight)
        .attr("cx", divWidth / 2)
        .attr("cy", 3 * divHeight / 5)

    document.getElementById('')

    function appendArc(g, divWidth, divHeight, startAngle, endAngle, color, arcID) {
        var arc = d3.arc()
            .innerRadius(divWidth / 5)
            .outerRadius(divWidth / 3)
            .startAngle(startAngle * (Math.PI / 180))
            .endAngle(endAngle * (Math.PI / 180));
        g.append("path")
            .attr("d", arc)
            .attr('id', arcID)
            .attr("transform", "translate(" + divWidth / 2 + ',' + 3 * divHeight / 5 + ")")
            .attr("fill", color);
    }

    function appendArcLabel(g, divWidth, divHeight, x, dy, arclabel, label) {
        g.append("text")
            .attr('x', x)
            .attr('dy', dy)
            .attr("class", "arcLabel")
            .append("textPath")
            .attr("xlink:href", arclabel)
            .style("font-size", 0.05474 * divHeight)
            .style("font-color", 'black')
            .text(label);
    }

}

function makeSentimentTimeGraph(data, divID) {
    var xPadding = 30;
    var yPadding = 20;
    var headRadius = 3;

    var graphDiv = document.getElementById(divID);

    if (divID == "enlargedChart") {
        var divHeight = 602;
        var divWidth = 944;
        document.getElementById(divID).innerHTML = "";
    }
    else {
        var divHeight = graphDiv.clientHeight;
        var divWidth = graphDiv.clientWidth;
    }

    var sentimentVector = [];
    var timeVector = [];
    for (var i = 0; i < data.length; i++) {
        timeVector.push(data[i].time);
        sentimentVector.push(data[i].sentiment)
    }
    /* var sentimentVector = [20, 34, 15, 52, 48, 73, 25, 78, 83, 42, 58, 85, 68, 15, 35, 41, 75, 95, 50];
    var timeVector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; */

    var INNER_HEIGHT = divHeight - 2 * yPadding;
    var INNER_WIDTH = divWidth - 2 * xPadding;


    var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([divHeight - yPadding, yPadding])
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSizeOuter(0);
    var yAxisGrid = d3.axisLeft(yScale)
        .tickSize(-INNER_WIDTH)
        .tickFormat('')
        .tickSizeOuter(0);

    var xScale = d3.scaleTime()
        .domain([d3.min(timeVector) - 1, d3.max(timeVector) + 1])
        .range([xPadding, divWidth - xPadding]);


    /* var xScale = d3.scaleLinear()
        .domain([d3.min(timeVector) - 1, d3.max(timeVector) + 1])
        .range([xPadding, divWidth - xPadding]) */

    var negData = []
    var posData = []
    var negYears = []
    var neutYears = []

    for (var i = 0; i < sentimentVector.length; i++) {
        if (sentimentVector[i] <= 50) {
            negData.push({ time: timeVector[i], sentiment: sentimentVector[i] })
            if (sentimentVector[i] <= 40) {
                negYears.push(timeVector[i]);
            }
        }
        else if (sentimentVector[i] >= 50) {
            posData.push({ time: timeVector[i], sentiment: sentimentVector[i] })
        }
        if (sentimentVector[i] >= 40 && sentimentVector[i] < 60) {
            neutYears.push(timeVector[i]);
        }
    }

    var svg = d3.select("#" + divID).append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");

    svg.append('g')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxis);
    svg.append('g')
        .attr('class', 'y axis-grid')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxisGrid);

    svg.append("rect")
        .attr("x", xPadding + 1)
        .attr("y", yScale(60))
        .attr("width", divWidth - 2 * xPadding - 2)
        .attr("height", yScale(40) - yScale(60))
        .attr('fill', '#e6ffe6')

    var stemWidth = 1 / 300 * divHeight;
    var circleSize = 1 / 120 * divHeight;

    var negStems = svg.selectAll(".negStem")
        .data(negData)
        .enter().append("rect")
        .attr("class", "negStem")
        .attr('fill', function (d) {
            if (neutYears.includes(d.time)) {
                return 'green';
            }
            else {
                return 'blue'
            }
        })
        .attr("x", function (d) {
            return xScale(d.time) - (stemWidth / 2)
        })
        .attr("y", function (d) { return yScale(40) })
        .attr("width", stemWidth)
        .attr("height", function (d) {
            if (neutYears.includes(d.time)) {
                return 0;
            }
            else {
                return yScale(d.sentiment) - yScale(40);
            }
        });

    if (divID == 'enlargedChart') {
        var heads = svg.selectAll(".negSentimentCircleEnlarged")
            .data(negData)
            .enter().append("circle")
            .attr("class", 'negSentimentCircleEnlarged')
            .attr("r", circleSize)
            .attr('fill', function (d) {
                if (neutYears.includes(d.time)) {
                    return 'green';
                }
                else {
                    return 'blue'
                }
            })
            .attr("cx", function (d) { return xScale(d.time) })
            .attr("cy", function (d) { return yScale(d.sentiment) })
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);
    }
    else {
        var heads = svg.selectAll(".negSentimentCircle")
            .data(negData)
            .enter().append("circle")
            .attr("class", 'negSentimentCircle')
            .attr("r", circleSize)
            .attr('fill', function (d) {
                if (neutYears.includes(d.time)) {
                    return 'green';
                }
                else {
                    return 'blue'
                }
            })
            .attr("cx", function (d) { return xScale(d.time) })
            .attr("cy", function (d) { return yScale(d.sentiment) })
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut)
    }


    /* var heads = svg.selectAll(".negSentimentCircle")
        .data(negData)
        .enter().append("rect")
        .attr("class", "negSentimentCircle")
        .attr("height", 5)
        .attr("width", 5)
        .attr('fill', function (d) {
            if (neutYears.includes(d.time)) {
                return 'green';
            }
            else {
                return 'blue'
            }
        })
        .attr("x", function (d) { return xScale(d.time) - 2.5 })
        .attr("y", function (d) { return yScale(d.sentiment) })
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut); */





    var posStems = svg.selectAll(".posStem")
        .data(posData)
        .enter().append("rect")
        .attr("class", "posStem")
        .attr('fill', function (d) {
            if (neutYears.includes(d.time)) {
                return 'green';
            }
            else {
                return 'red'
            }
        })
        .attr("x", function (d) { return xScale(d.time) - (stemWidth / 2) })
        .attr("y", function (d) { return yScale(d.sentiment) })
        .attr("width", stemWidth)
        .attr("height", function (d) {
            if (neutYears.includes(d.time)) {
                return 0;
            }
            else {
                return yScale(60) - yScale(d.sentiment);
            }
        });

    var heads = svg.selectAll(".posSentimentCircle")
        .data(posData)
        .enter().append("circle")
        .attr("class", function (d) {
            if (divID == 'enlargedChart') {
                return "posSentimentCircleEnlarged";
            }
            else {
                return "posSentimentCircle";
            }
        })
        .attr("r", circleSize)
        .attr('fill', function (d) {
            if (neutYears.includes(d.time)) {
                return 'green';
            }
            else {
                return 'red';
            }
        })
        .attr("cx", function (d) { return xScale(d.time) })
        .attr("cy", function (d) { return yScale(d.sentiment) })
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut);


    svg.append('line')
        .attr('x1', xScale(0))
        .attr('y1', yScale(40))
        .attr('x2', xScale(d3.max(timeVector) + 1))
        .attr('y2', yScale(40))
        .attr('stroke-width', 0.25)
        .attr('stroke', 'black');

    svg.append('line')
        .attr('x1', xScale(0))
        .attr('y1', yScale(60))
        .attr('x2', xScale(d3.max(timeVector) + 1))
        .attr('y2', yScale(60))
        .attr('stroke-width', 0.25)
        .attr('stroke', 'black');
}

function makeKeywordBarPlot(data, divID, nCutoff) {
    var xPadding = 50;
    var yPadding = 30;
    var colorVec = ['#83afd5', '#fbbe81', '#80c89c', '#be7cbf']
    var graphDiv = document.getElementById(divID);
    data.sort(function (a, b) { return b.frequency - a.frequency });
    dataSlice = data.slice(0, nCutoff)
    dataSlice.sort(function (a, b) { return a.frequency - b.frequency });
    console.log(data)

    if (divID == "enlargedChart") {
        var divHeight = 602;
        var divWidth = 944;
        document.getElementById(divID).innerHTML = "";
    }
    else {
        var divHeight = graphDiv.clientHeight;
        var divWidth = graphDiv.clientWidth;
    }
    var INNER_HEIGHT = divHeight - 2 * yPadding;
    var INNER_WIDTH = divWidth - 2 * xPadding;

    var yScale = d3.scaleBand()
        .domain(dataSlice.map(function (d) { return d.keyword }))
        .rangeRound([divHeight - yPadding, yPadding])
        .paddingInner(0.1);
    var yAxis = d3.axisLeft()
        .scale(yScale);


    var xScale = d3.scaleLinear()
        .domain([0, dataSlice[nCutoff - 1].frequency])
        .range([xPadding, divWidth - xPadding])
    var xAxis = d3.axisBottom()
        .scale(xScale)/* 
        
                                                        .tickSize(0) */;

    var xAxisGrid = d3.axisBottom(xScale)
        .tickSize(-INNER_HEIGHT)
        .tickFormat('')
        .tickSizeOuter(0);

    var svg = d3.select("#" + divID).append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");

    svg.append('g')
        .attr('class', 'x axis-grid')
        .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
        .call(xAxisGrid);


    svg.append('g')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxis);

    svg.append('g')
        .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
        .call(xAxis);



    svg.selectAll(".keywordBar")
        .data(dataSlice)
        .enter().append('rect')
        .attr("class", function (d) {
            if (divID == 'enlargedChart') {
                return "keywordBarEnlarged";
            }
            else {
                return "keywordBar";
            }
        })
        .style('fill', function (d, i) { return colorVec[i % colorVec.length] })
        .attr("x", function (d) { return xScale(0) })
        .attr("y", function (d) { return yScale(d.keyword) })
        .attr("width", function (d) { return xScale(d.frequency) - xScale(0) })
        .attr("height", yScale.bandwidth)
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut);
}

function makeStockGraph(data, divID) {

    stockData = [];
    for (var i = 0; i < data.length; i++) {
        /* console.log(data[i].date)
        console.log(data[i].price) */
        stockData.push({ time: Date.parse(data[i].date), stock: parseFloat(data[i].price) });
    }
    var timeVector = [];
    var stockVector = [];
    for (var i = 0; i < stockData.length; i++) {
        timeVector.push(stockData[i].time);
        stockVector.push(stockData[i].stock);
    }

    var xPadding = 50;
    var yPadding = 30;
    var graphDiv = document.getElementById(divID);
    graphDiv.innerHTML = '';


    if (divID == 'enlargedChart') {
        var divHeight = 602;
        var divWidth = 944;
    }
    else {
        var divHeight = graphDiv.offsetHeight;
        var divWidth = graphDiv.offsetWidth;
    }

    var INNER_HEIGHT = divHeight - 2 * yPadding;
    var INNER_WIDTH = divWidth - 2 * xPadding;

    var xMax = d3.max(stockData, function (d) { return d['time']; }) * 1.05,
        xMin = d3.min(stockData, function (d) { return d['time']; }),
        xMin = xMin > 0 ? 0 : xMin,
        yMax = d3.max(stockData, function (d) { return d['stock']; }) * 1.05,
        yMin = d3.min(stockData, function (d) { return d['stock']; }),
        yMin = yMin > 0 ? 0 : yMin;

    var yScale = d3.scaleLinear()
        /* .domain([d3.min(stockVector) - 100, d3.max(stockVector) + 100]) */
        .domain([0, d3.max(stockVector) + 100])
        .range([divHeight - yPadding, yPadding])
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSizeOuter(0);
    var yAxisGrid = d3.axisLeft(yScale)
        .tickSize(-INNER_WIDTH)
        .tickFormat('')
        .tickSizeOuter(0);



    /* var xScale = d3.scaleLinear()
        .domain([d3.min(timeVector) - 1, d3.max(timeVector) + 1])
        .range([xPadding, divWidth - xPadding]); */
    var xScale = d3.scaleTime()
        .domain([d3.min(timeVector) - 1, d3.max(timeVector) + 1])
        .range([xPadding, divWidth - xPadding]);
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSizeOuter(0);
    var xAxisGrid = d3.axisBottom(xScale)
        .tickSize(-INNER_HEIGHT)
        .tickFormat('')
        .tickSizeOuter(0);


    var zoomBeh = d3.zoom()
        .scaleExtent([1, 500])
        .on("zoom", zoom);

    var svg = d3.select("#" + divID).append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");



    var gY = svg.append('g')
        .attr('class', 'yAxis')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxis);
    var gYGrid = svg.append('g')
        .attr('class', 'y axis-grid')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxisGrid);

    var gX = svg.append('g')
        .attr('class', 'xAxis')
        .attr('id', 'stockXAxis')
        .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
        .call(xAxis);
    var gXGrid = svg.append('g')
        .attr('class', 'x axis-grid')
        .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
        .call(xAxisGrid);




    var clip = svg.append("defs").append("svg:clipPath")
        .attr('id', 'stockClip')
        .append('svg:rect')
        .attr('width', INNER_WIDTH)
        .attr('height', INNER_HEIGHT)
        .attr('x', xPadding)
        .attr('y', yPadding);

    var clip = svg.append("defs").append("svg:clipPath")
        .attr('id', 'stockClipEnlarged')
        .append('svg:rect')
        .attr('width', 944 - 2 * xPadding)
        .attr('height', 602 - 2 * yPadding)
        .attr('x', xPadding)
        .attr('y', yPadding);




    var lines = svg.append('g')
        .attr('class', 'linechartarea')
        .attr('clip-path', function () {
            if (divID == 'enlargedChart') {
                return 'url(#stockClipEnlarged)';
            }
            else {
                return 'url(#stockClip)';
            }
        })
        .selectAll(".stockLine")
        .data(stockData)
        .enter().append('line')
        .attr("class", "stockLine")
        .attr('x1', function (d) { return xScale(d.time) })
        .attr('y1', function (d) { return yScale(d.stock) })
        .attr('x2', function (d, i) {
            if (i == 0) {
                return xScale(d.time)
            }
            return xScale(stockData[i - 1].time);
        })
        .attr('y2', function (d, i) {
            if (i == 0) { return yScale(d.stock) }
            return yScale(stockData[i - 1].stock);
        })
        .attr('stroke', '#990000')
        .attr('stroke-width', 1);

    svg.append("rect")
        .attr("class", "stocksScroller")
        .attr("width", divWidth)
        .attr("height", divHeight)
        .style("fill", "none")
        .style("pointer-events", "all")
        .call(zoomBeh);

    var points = svg.selectAll(".stockPoint")
        .data(stockData)
        .enter().append("circle")
        .attr("class", function (d) {
            if (divID == 'enlargedChart') {
                return "stockPointEnlarged";
            }
            else {
                return "stockPoint";
            }
        })
        .style('fill-opacity', '0')
        .attr("r", 5)
        .attr('fill', 'red')
        .attr("cx", function (d) { return xScale(d.time) })
        .attr("cy", function (d) { return yScale(d.stock) })
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut);


    function zoom() {
        var new_xScale = d3.event.transform.rescaleX(xScale);
        var new_yScale = d3.event.transform.rescaleY(yScale);
        gX.call(xAxis.scale(new_xScale))
        gY.call(yAxis.scale(new_yScale))
        gXGrid.call(xAxisGrid.scale(new_xScale))
        gYGrid.call(yAxisGrid.scale(new_yScale))

        /* var stockDataSlice = [];
        var leftBound = Date.parse(new_xScale.invert(xPadding));
        var rightBound = Date.parse(new_xScale.invert(INNER_WIDTH - xPadding));
        console.log(leftBound, rightBound)
        for (var i = 0; i < stockData.length; i++) {
            if (stockData[i].time > leftBound && stockData[i].time < rightBound) {
                stockDataSlice.push(stockData[i]);
            }
        } */

        lines.data(stockData)
            .attr('x1', function (d) { return new_xScale(d.time) })
            .attr('y1', function (d) { return new_yScale(d.stock) })
            .attr('x2', function (d, i) {
                if (i == 0) { return new_xScale(d.time) }
                return new_xScale(stockData[i - 1].time);
            })
            .attr('y2', function (d, i) {
                if (i == 0) { return new_yScale(d.stock) }
                return new_yScale(stockData[i - 1].stock);
            })
        points.data(stockData)
            .attr('fill', 'red')
            .attr("cx", function (d) { return new_xScale(d.time) })
            .attr("cy", function (d) { return new_yScale(d.stock) })

        gXGrid.call(xAxisGrid.scale(new_xScale))
        gYGrid.call(yAxisGrid.scale(new_yScale))
        /* svg.select(".xAxis").call(xAxis);
        svg.select(".yAxis").call(yAxis);

        svg.selectAll(".stockLine")
            .attr("transform", transform); */
    }

}

function makePieChart(data, divID, nCutoff) {
    var pie = d3.pie()
        .value(function (d) { return d.frequency; })
    var colorVec = ["#F94144", "#F3722C", "#F8961E",
        "#F9C74F", "#90BE6D", "#43AA8B", "#3a34ed"];
    var color = d3.scaleOrdinal()
        .domain(data.map(function (d) { return d.keyword }))
        .range(colorVec.slice(0, data.length))



    var importanceTotal = data.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b.frequency);
    }, 0);

    data.sort(function (a, b) { return b.frequency - a.frequency });

    dataSlice = data.slice(0, nCutoff);

    var propData = [];
    for (var i = 0; i < dataSlice.length; i++) {
        propData.push({ keyword: dataSlice[i].keyword, frequency: dataSlice[i].frequency / importanceTotal });
    }

    var pieChart = document.getElementById(divID);
    pieChart.innerHTML = "";

    var svg = d3.select("#" + divID).append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");

    if (divID == "enlargedChart") {
        var divHeight = 602;
        var divWidth = 944;
    }
    else {
        var divHeight = pieChart.offsetHeight;
        var divWidth = pieChart.offsetWidth;
    }
    var innerRadius = divHeight / 5;
    var outerRadius = divHeight / 3;
    /* Draw the actual pie chart */


    svg.append('g')
        .attr("transform", "translate(" + divHeight / 2 + ',' + divHeight / 2 + ")")
        .selectAll('.svgArc')
        .data(pie(propData))
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
        )
        .attr('class', function (d) {
            if (divID == 'enlargedChart') {
                return 'svgArcEnlarged';
            }
            else {
                return 'svgArc';
            }
        })

        .attr('fill', function (d) {
            return (color(d.data.keyword))
        })
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut);


    var legend = svg.append('g')
        .attr('transform', 'translate(' + 2 * divWidth / 3 +
            ',' + divHeight / 6 + ')');

    legend.selectAll("legendDots")
        .data(propData)
        .enter()
        .append('circle')
        .attr('r', 3)
        .attr('cx', 0)
        .attr('cy', function (d, i) { return i * 0.05 * divHeight })
        .style('fill', function (d, i) { return color(d.keyword) });

    legend.selectAll('labels')
        .data(propData)
        .enter()
        .append('text')
        .attr('x', 10)
        .attr('y', function (d, i) { return i * 0.05 * divHeight; })
        .style('font-size', 1 / 30 * divHeight + 'px')
        .style("fill", function (d, i) { return color(d.keyword) })
        .text(function (d) { return d.keyword })
        .style('alignment-baseline', 'middle');

    svg.append('text')
        .attr('transform', 'translate(' + divHeight / 2 + ',' + divHeight / 2 + ")")
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .style('font-size', 1 / 10 * divHeight + 'px')
        .attr('id', 'keywordPercent' + divID)
        .text('중요도');

}



var tooltip = d3.select('body')
    .append("div")
    .attr('id', 'tooltip')
    .attr('data-html', 'true')
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style('background-color', '#f0f0f0')
    .style('padding', '5px 5px 5px 5px')
    .style('font-size', function () {
        return '20px'
    })
    .style('border-radius', '4px')
    .text("");

var tooltipEnlarged = d3.select('#entirePopupBox')
    .append("div")
    .attr('id', 'tooltipEnlarged')
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style('background-color', '#f0f0f0')
    .style('padding', '5px 5px 5px 5px')
    .style('font-size', function () {
        return '20px'
    })
    .style('border-radius', '4px')
    .text("");


function onMouseOver(d, i) {
    var elementClass = this.getAttribute('class');
    console.log(elementClass)
    if (elementClass == 'stockPoint') {
        d3.select(this).style('fill', 'gray');
        tooltip.style('visibility', 'visible');
        tooltip.text('기사수: ' + d.stock);
        tooltip.style('background-color', '#f0f0f0');
    }
    else if (elementClass == 'stockPointEnlarged') {
        d3.select(this).style('fill', 'gray');
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text('기사수: ' + d.stock);
        tooltipEnlarged.style('background-color', '#f0f0f0');
    }
    else if (elementClass == 'posSentimentCircle' || elementClass == 'negSentimentCircle') {
        var date = new Date(d.time)
        d3.select(this).style('opacity', '50%');
        tooltip.style('visibility', 'visible');
        tooltip.style('background-color', '#f0f0f0');
        tooltip.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
            + '월' + date.getDate() + '일') + '<br />감성지수: ' + d.sentiment)
    }
    else if (elementClass == 'posSentimentCircleEnlarged' || elementClass == 'negSentimentCircleEnlarged') {
        var date = new Date(d.time)
        d3.select(this).style('opacity', '50%');
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.style('background-color', '#f0f0f0');
        tooltipEnlarged.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
            + '월' + date.getDate() + '일') + '<br />감성지수: ' + d.sentiment)
    }
    else if (elementClass == 'keywordBar') {
        d3.select(this).style('opacity', '70%');
        tooltip.style('visibility', 'visible');
        tooltip.text(d.keyword + ': ' + d.frequency);
    }
    else if (elementClass == 'keywordBarEnlarged') {
        d3.select(this).style('opacity', '70%');
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text(d.keyword + ': ' + d.frequency);
    }
    else if (elementClass == 'svgArc') {
        d3.select(this).style('opacity', '70%');
        var angle = (d.endAngle + d.startAngle) / 2;
        var xMove = /* innerRadius / */ 8 * Math.sin(angle);
        var yMove = -/* -innerRadius /  */8 * Math.cos(angle);
        d3.select(this)
            .transition()
            .duration(250)
            .attr('transform', 'translate(' + xMove + ',' + yMove + ')')
        tooltip.style('visibility', 'visible');
        tooltip.text(d.data.keyword);
        tooltip.style('border-color', this.getAttribute('fill'));
        /* document.getElementById('keywordPercent' + divID).innerHTML = (d.data.importance / importanceTotal * 100).toFixed(2) + "%" */
        console.log(d.data.frequency)
        document.getElementById('keywordPercentkeywordPie').innerHTML = (d.data.frequency * 100).toFixed(2) + '%'
    }
    else if (elementClass == 'svgArcEnlarged') {
        d3.select(this).style('opacity', '70%');
        var angle = (d.endAngle + d.startAngle) / 2;
        var xMove = /* innerRadius / */ 8 * Math.sin(angle);
        var yMove = -/* -innerRadius /  */8 * Math.cos(angle);
        d3.select(this)
            .transition()
            .duration(250)
            .attr('transform', 'translate(' + xMove + ',' + yMove + ')')
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text(d.data.keyword);
        tooltip.style('border-color', this.getAttribute('fill'));
        /* document.getElementById('keywordPercent' + divID).innerHTML = (d.data.importance / importanceTotal * 100).toFixed(2) + "%" */
        document.getElementById('keywordPercentenlargedChart').innerHTML = (d.data.frequency * 100).toFixed(2) + '%'
    }
    else if (elementClass == 'wordCloudWord') {
        d3.select(this).style('opacity', '100%');
        d3.select(this)
            .style('font-size', this.style.fontSize * 1.1)
    }
    else {
        d3.select(this).style('fill', 'gray');
        tooltip.style('background-color', '#f0f0f0');
        tooltip.style('visibility', 'visible');

    }
}

function onMouseMove(d, i) {
    var elementClass = this.getAttribute('class');
    if (elementClass == 'stockPoint') {
        return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
    }
    else if (elementClass == 'stockPointEnlarged') {
        var divX = document.getElementById('entirePopupBox').getBoundingClientRect().left;
        var divY = document.getElementById('entirePopupBox').getBoundingClientRect().top;
        return tooltipEnlarged.style("top", (event.pageY - 10 - divY) + "px").style("left", (event.pageX + 10 - divX) + "px");
    }
    else if (elementClass == 'posSentimentCircle' || elementClass == 'negSentimentCircle') {
        return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
    }
    else if (elementClass == 'posSentimentCircleEnlarged' || elementClass == 'negSentimentCircleEnlarged') {
        var divX = document.getElementById('entirePopupBox').getBoundingClientRect().left;
        var divY = document.getElementById('entirePopupBox').getBoundingClientRect().top;


        return tooltipEnlarged.style("top", (event.pageY - 10 - divY) + "px").style("left", (event.pageX + 10 - divX) + "px");;
    }
    else if (elementClass == 'keywordBar') {
        return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
    }
    else if (elementClass == 'keywordBarEnlarged') {
        var divX = document.getElementById('entirePopupBox').getBoundingClientRect().left;
        var divY = document.getElementById('entirePopupBox').getBoundingClientRect().top;
        return tooltipEnlarged.style("top", (event.pageY - 10 - divY) + "px").style("left", (event.pageX + 10 - divX) + "px");;
    }
    else if (elementClass == 'svgArcEnlarged') {
        var divX = document.getElementById('entirePopupBox').getBoundingClientRect().left;
        var divY = document.getElementById('entirePopupBox').getBoundingClientRect().top;
        return tooltipEnlarged.style("top", (event.pageY - 10 - divY) + "px").style("left", (event.pageX + 10 - divX) + "px");
    }
    else if (elementClass == 'svgArc') {
        return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
    }
    else if (elementClass = 'wordCloudWords') {
        return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
    }
    else {

    }
}

function onMouseOut(d, i) {
    var elementClass = this.getAttribute('class');
    if (elementClass == 'stockPoint') {
        d3.select(this).style('fill', 'black');
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'stockPointEnlarged') {
        d3.select(this).style('fill', 'black');
        tooltipEnlarged.style('visibility', 'hidden');
    }
    else if (elementClass == 'posSentimentCircle' || elementClass == 'negSentimentCircle') {
        d3.select(this).style('opacity', '100%');
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'posSentimentCircleEnlarged' || elementClass == 'negSentimentCircleEnlarged') {
        d3.select(this).style('opacity', '100%');
        tooltipEnlarged.style('visibility', 'hidden');
    }
    else if (elementClass == 'keywordBar') {
        d3.select(this).style('opacity', '100%');
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'keywordBarEnlarged') {
        d3.select(this).style('opacity', '100%');
        tooltipEnlarged.style('visibility', 'hidden');
    }
    else if (elementClass == 'svgArc') {
        d3.select(this).style('opacity', '100%');
        d3.select(this).style('stroke', 'None');
        d3.select(this)
            .transition()
            .duration(250)
            .attr('transform', 'translate(0,0)')
        tooltip.style('visibility', 'hidden');
        document.getElementById('keywordPercentkeywordPie').innerHTML = "중요도";
    }
    else if (elementClass == 'svgArcEnlarged') {
        d3.select(this).style('opacity', '100%');
        d3.select(this).style('stroke', 'None');
        d3.select(this)
            .transition()
            .duration(250)
            .attr('transform', 'translate(0,0)')
        tooltipEnlarged.style('visibility', 'hidden');
        document.getElementById('keywordPercentenlargedChart').innerHTML = "중요도";
    }
    else if (elementClass == 'wordCloudWord') {
        d3.select(this).style('opacity', '60%')
        d3.select(this)
            .style('font-size', this.style.fontSize / 1.1);
    }
    else {
        d3.select(this).style('fill', 'black');
        tooltip.style('visibility', 'hidden');

    }
}

async function getMaxWords(words, sizeMax, divID) {
    var graphDiv = document.getElementById(divID);
    document.getElementById('paddingValue').innerHTML = document.getElementById('paddingSlider').value;
    document.getElementById('textMaxValue').innerHTML = document.getElementById('textNumberSlider').value;
    var xPadding = 20;
    var yPadding = 20;
    if (divID == "enlargedChart") {
        var divHeight = 602;
        var divWidth = 944;
    }
    else {
        var divHeight = graphDiv.offsetHeight;
        var divWidth = graphDiv.offsetWidth;
    }
    var step = 10;
    var wordSlice = [];
    for (var i = 0; i < words.length; i++) {
        wordSlice.push({ text: words[i].text, value: words[i].value });
    }
    return d3.layout.cloud()
        .size([divWidth - 2 * xPadding, divHeight - 2 * yPadding])
        .words(wordSlice)
        .padding(document.getElementById('paddingSlider').value)
        .rotate(0)
        /* .rotate(function () { return ~~(Math.random() * 2) * 90; }) */
        .fontSize(function (d) {
            return d.value / maxValue *
                sizeMax;
        })
        .on("end", function (output) {
            if (wordSlice.length == output.length) {
                getMaxWords(words, sizeMax + step, divID)
            }
            else {
                console.log('IN FAILURE')
                document.getElementById('fontSizeSlider').setAttribute('max', sizeMax - step);
                document.getElementById('fontSizeSlider').setAttribute('value', 3 * sizeMax / 4);
                document.getElementById('fontSizeValue').innerHTML = 3 * sizeMax / 4;
            }
        })
        .start();
}

function drawWordcloud(words, divID) {
    var graphDiv = document.getElementById(divID);

    var maxValue = Math.max.apply(Math, words.map(function (o) { return o.value }));
    var wordSlice = [];
    for (var i = 0; i < document.getElementById('textNumberSlider').value; i++) {
        wordSlice.push({ text: words[i].text, value: words[i].value });
    }
    var xPadding = 20;
    var yPadding = 20;


    if (divID == "enlargedChart") {
        var divHeight = 602;
        var divWidth = 944;
        document.getElementById(divID).innerHTML = "";
    }
    else {
        var divHeight = graphDiv.clientHeight;
        var divWidth = graphDiv.clientWidth;
    }

    console.log(wordSlice)
    document.getElementById(divID).innerHTML = "";
    var layout = d3.layout.cloud()
        .size([divWidth - 2 * xPadding, divHeight - 2 * yPadding])
        .words(wordSlice)
        .padding(document.getElementById('paddingSlider').value)
        .rotate(0)
        /* .rotate(function () { return ~~(Math.random() * 2) * 90; }) */
        .fontSize(function (d) {
            return d.value / maxValue *
                document.getElementById('fontSizeSlider').value;
        })
        .on("end", function (output) {
            if (wordSlice.length != output.length) {
                window.alert('Not all words fit into the word cloud--please try lowering font size')
            }
            draw(wordSlice)
        });
    layout.start();


    function draw(wordSlice) {
        var yScale = d3.scaleLinear()
            .domain([0, divHeight])
            .range([0, divHeight])
        var xScale = d3.scaleTime()
            .domain([0, divWidth])
            .range([0, divWidth]);

        var svg = d3.select("#" + divID).append("svg")
            .attr("transform", "translate(" + xPadding + "," + yPadding + ")")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])

        var words = svg.append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll(".wordCloudWord")
            .data(wordSlice)
            .enter().append("text")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .attr("text-anchor", "middle")
            .attr("class", 'wordCloudWord')
            .style("fill", function (d) {
                var colors = ["#F94144", "#F3722C", "#F8961E",
                    "#F9C74F", "#90BE6D", "#43AA8B", "#3a34ed"];
                return colors[Math.floor(Math.random() * colors.length)];
            })
            .style('opacity', '60%')
            .text(function (d) { return d.text; })
            .on("mouseover", onMouseOver)
            /* .on("mousemove", onMouseMove) */
            .on("mouseout", onMouseOut)
            .transition()
            .style("font-size", function (d) {
                return d.value / maxValue *
                    document.getElementById('fontSizeSlider').value + "px";
            })
            .duration(500);

        /*svg.append("rect")
            .attr("class", "stocksScroller")
            .attr("width", divWidth)
            .attr("height", divHeight)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on
            .call(zoomBeh);

        var zoomBeh = d3.zoom()
            .scaleExtent([1, 500])
            .on("zoom", zoom);

        function zoom() {
            console.log(event)
            var new_xScale = d3.event.transform.rescaleX(xScale);
            var new_yScale = d3.event.transform.rescaleY(yScale);
            d3.selectAll(".wordCloudWord")
                .data(wordSlice)
                .attr("transform", function (d) {
                    return "translate(" + [new_xScale(d.x), new_yScale(d.y)] + ")rotate(" + d.rotate + ")"
                })

            var lines = svg.append('g')
                .attr('class', 'linechartarea')
                .attr('clip-path', function () {
                    if (divID == 'enlargedChart') {
                        return 'url(#stockClipEnlarged)';
                    }
                    else {
                        return 'url(#stockClip)';
                    }
                })
                .selectAll(".stockLine")
                .data(stockData)
                .enter().append('line')
                .attr("class", "stockLine")
                .attr('x1', function (d) { return xScale(d.time) })
                .attr('y1', function (d) { return yScale(d.stock) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(d.time)
                    }
                    return xScale(stockData[i - 1].time);
                })
                .attr('y2', function (d, i) {
                    if (i == 0) { return yScale(d.stock) }
                    return yScale(stockData[i - 1].stock);
                })
                .attr('stroke', '#990000')
                .attr('stroke-width', 1);
            lines.data(stockData)
                .attr('x1', function (d) { return new_xScale(d.time) })
                .attr('y1', function (d) { return new_yScale(d.stock) })
                .attr('x2', function (d, i) {
                    if (i == 0) { return new_xScale(d.time) }
                    return new_xScale(stockData[i - 1].time);
                })
                .attr('y2', function (d, i) {
                    if (i == 0) { return new_yScale(d.stock) }
                    return new_yScale(stockData[i - 1].stock);
                }) 
        }*/
    }
}

function getChartQuery() {
    var search_company = document.getElementById('search_company').value;
    console.log(search_company);
    $.ajax({
        url: "/getChartQueryByCompany/" + search_company,
        method: 'GET',
        dataType: 'json',
        success: function (responseData) {
            window.newsResponseData = responseData;

            console.log(responseData)
            alert('조회 성공');
            makeGauge('dangerGauge', responseData.averageScore)
            document.getElementById('dangerGauge').addEventListener('click', function () {
                console.log('clicked');
                makeGauge('enlargedChart', responseData.averageScore);
            })


            var sentimentData = [];
            for (var i = 0; i < responseData.sentimentDates.length; i++) {
                sentimentData.push({
                    time: Date.parse(responseData.sentimentDates[i].date),
                    sentiment: responseData.sentimentDates[i].sentiment
                })
            }
            var chart = document.getElementById('sentimentTimeTwoLines');
            makeSentimentTimeGraph(sentimentData, 'sentimentTimeTwoLines');
            chart.addEventListener('click', function () {
                console.log('clicked');
                makeSentimentTimeGraph(sentimentData, 'enlargedChart');
            })

            var chart = document.getElementById('keywordBar');
            makeKeywordBarPlot(responseData.keywords, 'keywordBar', document.getElementById('keywordBarSlider').value)
            chart.addEventListener('click', function () {
                document.getElementById('keywordBarSettings').style.display = 'inline';
                makeKeywordBarPlot(responseData.keywords, 'enlargedChart', document.getElementById('keywordBarSlider').value)
            })


            var pieChart = document.getElementById('keywordPie');
            makePieChart(responseData.keywords, 'keywordPie', document.getElementById('keywordPieSlider').value)
            pieChart.addEventListener('click', function () {
                console.log('clicked');
                document.getElementById('keywordPieSettings').style.display = 'inline';
                makePieChart(responseData.keywords, 'enlargedChart', document.getElementById('keywordPieSlider').value);
            })


            makeWordcloud(responseData.keywords);

        },
        error: function () {
            alert('조회 실패');
        }
    });

    console.log('test')
}

function makeWordcloud(data) {
    console.log(data)
    var words = data.sort(function (a, b) { return b.frequency - a.frequency });
    console.log(words)
    var sizeMax = 20;
    var maxValue = Math.max.apply(Math, words.map(function (o) { return o.frequency }));
    var paddingSlide = document.getElementById('paddingSlider')
    paddingSlide.onchange = function () {
        document.getElementById('paddingValue').innerHTML = this.frequency;
        drawWordcloud(words, 'enlargedChart');
    }

    var fontSizeSlide = document.getElementById('fontSizeSlider')
    fontSizeSlide.onchange = function () {
        document.getElementById('fontSizeValue').innerHTML = this.frequency;
        drawWordcloud(words, 'enlargedChart');
    }

    var textNumberSlide = document.getElementById('textNumberSlider')
    textNumberSlide.setAttribute('max', words.length);
    textNumberSlide.onchange = function () {
        document.getElementById('textMaxValue').innerHTML = this.value;
        drawWordcloud(words, 'enlargedChart');
    }

    wordCloud = document.getElementById('wordCloud')
    wordCloud.addEventListener('click', () => clickFunction(), false);

    async function clickFunction() {
        /* let maxWords = await getMaxWords(words, 20, 'enlargedChart'); */
        console.log('clicked wordcloud')
        document.getElementById('wordCloudSettings').style.display = 'inline';
        drawWordcloud(words, 'enlargedChart');
    }

    async function f() {
        let maxWords = await getMaxWords(words, 20, 'wordCloud');
        console.log('this is async')
        drawWordcloud(words, 'wordCloud');
    }

    drawWordcloud(words, 'wordCloud')
}