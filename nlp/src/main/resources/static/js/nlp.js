function makeGauge(divID, sentimentScore) {
    var sFactor = 7.1;
    function sobescore(x) {
        return 100 / (1 + Math.exp(-(x - 50) / sFactor));
    }
    var sFactor2 = 4;
    function sobescore2(x) {
        return 50 * ((x - 50) / (sFactor2 + Math.abs(x - 50))) + 50
    }
    function sobeDangerScore(x) {
        return 50 * ((50 - x) / (sFactor2 + Math.abs(50 - x))) + 50
    }
    console.log(sentimentScore)
    sentimentScore = sobeDangerScore(sentimentScore);

    var gauge = document.getElementById(divID);
    var divHeight = gauge.scrollHeight;
    var divWidth = gauge.scrollWidth;
    gauge.innerHTML = "";


    gaugeSVG = d3.select("#" + divID).append("svg")
        .attr('class', 'visSVG')
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
    var defs = gaugeSVG.append("defs");
    var filter = defs.append('filter')
        .attr('id', 'drop-shadow')
        .attr('height', '130%')

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 1)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0.0083056478 * divHeight)
        .attr("dy", 0.0083056478 * divHeight)
        .attr("result", "offsetBlur");

    var feMerge = filter.append('feMerge')

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");


    appendArc(gaugeSVG, divWidth, divHeight, 288, 336, "#f3ff90", 'low' + divID);
    appendArc(gaugeSVG, divWidth, divHeight, 240, 288, "#b7ff90", 'veryLow' + divID);
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


    gaugeSVG.append('rect')
        .attr('width',)
    gaugeSVG.append('g')
        .attr('transform', 'translate(' + divWidth / 2.05 + ',' + divHeight / 1.2 + ")")
        .append('text')
        .text('ƒ(s): ' + String(sentimentScore.toFixed(1)))
        .attr('id', 'sentimentIndicator')
        .style('font-style', 'italic')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .style('font-size', 0.08 * divHeight);



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
            .attr('class', 'shadowArc')
            .style('filter', 'url(#drop-shadow)')
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

    //console.log(divWidth, divHeight)

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
        .attr('class', 'visSVG')
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
        .attr('x1', xPadding)
        .attr('y1', yScale(40))
        .attr('x2', divWidth - xPadding)
        .attr('y2', yScale(40))
        .attr('stroke-width', 0.25)
        .attr('stroke', 'black');

    svg.append('line')
        .attr('x1', xPadding)
        .attr('y1', yScale(60))
        .attr('x2', divWidth - xPadding)
        .attr('y2', yScale(60))
        .attr('stroke-width', 0.25)
        .attr('stroke', 'black');
}

function makeKeywordBarPlot(data, divID, nCutoff) {
    var xPadding = 50;
    var yPadding = 30;
    var colorVec = ['#83afd5', '#fbbe81', '#80c89c', '#be7cbf']
    var graphDiv = document.getElementById(divID);
    data.sort(function (a, b) { return b.tf_idf - a.tf_idf });
    dataSlice = data.slice(0, nCutoff)
    dataSlice.sort(function (a, b) { return a.tf_idf - b.tf_idf });
    //console.log(data)

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
        .tickSizeOuter(0)
        .scale(yScale);


    var xScale = d3.scaleLinear()
        .domain([0, dataSlice[nCutoff - 1].tf_idf])
        .range([xPadding, divWidth - xPadding])
    /* var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks([])
        
                                                        .tickSize(0) */;

    var xAxisGrid = d3.axisBottom(xScale)
        .tickSize(-INNER_HEIGHT)
        .tickFormat('')
        .tickSizeOuter(0);

    var svg = d3.select("#" + divID).append("svg")
        .attr('class', 'visSVG')
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");

    svg.append('g')
        .attr('class', 'x axis-grid')
        .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
        .call(xAxisGrid)
        .call(g => g.select('.domain').remove());




    /* svg.append('g')
        .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
        .call(xAxis); */



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
        .attr("width", function (d) { return xScale(d.tf_idf) - xScale(0) })
        .attr("height", yScale.bandwidth)
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut)
        .on('click', function (d) {
            if (divID == 'enlargedChart') {
                $('.layer_dimmed').removeClass('is_active');
                $('.enlargedChartSettings').css("display", "none");
                dataTableSearch(d.keyword);
                document.getElementById('dataTableSearch').scrollIntoView();
                console.log(d.keyword);

            }
            else {

            }
        });

    var yAxis = svg.append('g')
        .attr('id', 'keywordYAxis')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxis);

    var leftWidth = document.getElementById('keywordYAxis').getBoundingClientRect().width;
    svg.attr('transform', 'translate(' + (leftWidth / 4) + ',0)');

}

function dateParser(dateString) {
    if (dateString.includes('-')) {
        var b = dateString.split('-')
        return new Date(b[0], (parseInt(b[1]) - 1).toString(), b[2]);
    }
    else {
        return new Date(dateString.slice(0, 4), dateString.slice(4, 6), dateString.slice(6, 8));
    }
}

function makeArticleCounts(data, divID) {
    var timeRange = document.getElementById('articleCountRange').value;
    var currDate = new Date();
    var timeRangeStart = d3.timeYear.offset(currDate, -timeRange);
    //console.log(timeRangeStart)

    var counts = {};
    for (var i = 0; i < data.length; i++) {
        if (!counts[data[i].newsDate]) {
            counts[data[i].newsDate] = 0
        }
        counts[data[i].newsDate]++;
    }
    var articleCounts = []
    for (var i = 0; i < Object.keys(counts).length; i++) {
        articleCounts.push({ date: Object.keys(counts)[i], count: counts[Object.keys(counts)[i]] })
    }
    var dateArray = [];
    for (var i = articleCounts.length - 1; i > -1; i--) {
        dateArray.push(dateParser(articleCounts[i].date));
    }
    /* var maxTime = dateParser(articleCounts[0].date);
    var minTime = dateParser(articleCounts[articleCounts.length - 1].date);
    var dateArray = d3.timeDays(minTime, d3.timeDay.offset(maxTime)) */
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
    var xPadding = 30;
    var yPadding = 20;
    var INNER_HEIGHT = divHeight - 2 * yPadding;
    var INNER_WIDTH = divWidth - 2 * xPadding;
    var yScale = d3.scaleLinear()
        .domain([0,
            d3.max(articleCounts, function (d) { return d.count })])
        .range([divHeight - yPadding, yPadding])
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSizeOuter(0);
    var yAxisGrid = d3.axisLeft(yScale)
        .tickSize(-INNER_WIDTH)
        .tickFormat('')
        .tickSizeOuter(0);
    /* //console.log(articleCounts) */
    //console.log(dateArray)
    //console.log(xPadding)
    //console.log(divWidth - xPadding)
    var xScale = d3.scaleBand()
        .domain(dateArray)
        .rangeRound([xPadding, divWidth - xPadding])
        .padding(0.05);
    var xAxis = d3.axisBottom()
        .scale(xScale)
        /* .tickSize(0)
        .tickValues([]) */
        .ticks(5)
        .tickPadding(5)
        .tickFormat(d3.timeFormat("%d/%b"))


    var zoomBeh = d3.zoom()
        .scaleExtent([0, 500])
        /* .translateExtent(extent)
        .extent(extent) */
        .on("zoom", zoom);

    var svg = d3.select("#" + divID).append("svg")
        .attr('class', 'visSVG')
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




    if (divID == 'enlargedChart') {
        console.log('making enlaregd articl3es')
        svg.append("rect")
            .attr("class", "articleScrollerEnlarged")
            .attr("width", divWidth)
            .attr("height", divHeight)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(zoomBeh);
        var clip = svg.append("defs").append("svg:clipPath")
            .attr('class', 'visSVG')
            .attr('id', 'stockClipEnlarged')
            .append('svg:rect')
            .attr('width', 944 - 2 * xPadding)
            .attr('height', 602)
            .attr('x', xPadding)
            .attr('y', 0);

        var rectsEnlarged = svg.selectAll('.articleCountRectEnlarged')
            .data(articleCounts)
            .enter()
            .append('rect')
            .attr('class', 'articleCountRectEnlarged')
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
            .attr('height', function (d, i) {
                return INNER_HEIGHT - yScale(d.count)
            })
            .attr('x', function (d, i) {
                var tempDate = dateParser(d.date)
                return xScale(tempDate);
            })
            .attr('y', function (d, i) {
                return yScale(d.count) + yPadding
            })
            .attr('fill', 'blue')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);
        var gX = svg.append('g')
            .attr('id', 'articlexAxis')
            .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
            .attr('clip-path', 'url(#articleClip)')
            .call(xAxis);
    }
    else {
        svg.append("rect")
            .attr("class", "articleScroller")
            .attr("width", divWidth)
            .attr("height", divHeight)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(zoomBeh);
        var clip = svg.append("defs").append("svg:clipPath")
            .attr('id', 'articleClip')
            .append('svg:rect')
            .attr('width', INNER_WIDTH)
            .attr('height', divHeight)
            .attr('x', xPadding)
            .attr('y', 0);

        var rects = svg.append('g')
            .attr('class', 'linechartarea')
            .attr('clip-path', 'url(#articleClip)')
            .selectAll('.articleCountRect')
            .data(articleCounts)
            .enter()
            .append('rect')
            .attr('class', 'articleCountRect')
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
            .attr('height', function (d, i) {
                /* //console.log(INNER_HEIGHT + yPadding)
                //console.log(d.count)
                //console.log(yScale(d.count)) */
                return INNER_HEIGHT + yPadding - yScale(d.count)
            })
            .attr('x', function (d, i) {
                var tempDate = dateParser(d.date)
                return xScale(tempDate);
            })
            .attr('y', function (d, i) {
                return yScale(d.count)
            })
            .attr('fill', '#ffa73b')
            .style('opacity', '50%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);
        var gX = svg.append('g')
            .attr('id', 'articlexAxis')
            .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
            .attr('clip-path', 'url(#articleClip)')
            .call(xAxis);
    }

    function zoom() {
        //console.log('zooming')

        xScale.rangeRound([xPadding, divWidth - xPadding].map((d, i) => {
            if (i == 0) {
                if (d3.event.transform.applyX(d) > xPadding) {
                    return xPadding
                }
                else {
                    return d3.event.transform.applyX(d)
                }
            }
            else if (i == 1) {
                if (d3.event.transform.applyX(d) < (divWidth - xPadding)) {
                    return divWidth - xPadding
                }
                else {
                    return d3.event.transform.applyX(d)
                }
            }
            else {
            }
        }));

        gX.call(xAxis.scale(xScale))

        svg.selectAll(".articleCountRect")
            .attr("x", function (d) {
                var tempDate = dateParser(d.date)
                return xScale(tempDate);
            })
            .attr("width", xScale.bandwidth())



    }
}

function makeCombinedGraph(sentimentData, articlesData, divID) {
    document.getElementById(divID).innerHTML = "";
    var timeRange = document.getElementById('articleCountRange').value;
    if (timeRange == 'all') {
        var timeRangeStart = new Date('1970-01-01')
    }
    else {
        var currDate = new Date();
        var timeRangeStart = d3.timeYear.offset(currDate, -timeRange);
        //console.log(timeRangeStart)
    }


    var counts = {};
    for (var i = 0; i < articlesData.length; i++) {
        if (!counts[articlesData[i].newsDate]) {
            counts[articlesData[i].newsDate] = 0
        }
        counts[articlesData[i].newsDate]++;
    }
    sentimentData.sort(function (a, b) { return dateParser(a.date) - dateParser(b.date) });
    var articleCounts = []
    for (var i = 0; i < Object.keys(counts).length; i++) {
        articleCounts.push({ date: Object.keys(counts)[i], count: counts[Object.keys(counts)[i]] })
    }
    sentimentData = sentimentData.filter(x => dateParser(x.date) > timeRangeStart)
    articleCounts = articleCounts.filter(x => dateParser(x.date) > timeRangeStart)
    //console.log(sentimentData)
    //console.log(articleCounts)
    var dateArray = [];
    for (var i = articleCounts.length - 1; i > -1; i--) {
        dateArray.push(dateParser(articleCounts[i].date));
    }


    /* var maxTime = dateParser(articleCounts[0].date);
    var minTime = dateParser(articleCounts[articleCounts.length - 1].date);
    var dateArray = d3.timeDays(minTime, d3.timeDay.offset(maxTime)) */
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
    var xPadding = 60;
    var yPadding = 25;
    var INNER_HEIGHT = divHeight - 2 * yPadding;
    var INNER_WIDTH = divWidth - 2 * xPadding;
    var yScale = d3.scaleLinear()
        .domain([0,
            d3.max(articleCounts, function (d) { return d.count }) + 10])
        .range([divHeight - yPadding, yPadding])
    var ySentScale = d3.scaleLinear()
        .domain([0, 100])
        .range([divHeight - yPadding, yPadding])
    var yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(5)
        .tickSizeOuter(0);
    var ySentAxis = d3.axisLeft(ySentScale)
        .scale(ySentScale)
        .ticks(5)
        .tickSizeOuter(0);
    var yAxisGrid = d3.axisLeft(ySentScale)
        .tickSize(-INNER_WIDTH)
        .ticks(5)
        .tickFormat('')
        .tickSizeOuter(0);

    /* //console.log(articleCounts) */
    /* //console.log(dateArray)
    //console.log(xPadding)
    //console.log(divWidth - xPadding) */
    //console.log(dateArray)
    var xScale = d3.scaleBand()
        .domain(dateArray)
        .range([xPadding, divWidth - xPadding])
        .padding(0.05);
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickValues(xScale.domain().filter(function (d, i) { return !(i % (Math.floor(articleCounts.length / 8))) }))
        /* .tickSize(0)
        .tickValues([]) */
        .ticks(5)
        .tickPadding(5)
        .tickFormat(d3.timeFormat("%Y년%b"))


    var zoomBeh = d3.zoom()
        .scaleExtent([0, 100])
        /* .translateExtent(extent)
        .extent(extent) */
        .on("zoom", zoom);

    var svg = d3.select("#" + divID).append("svg")
        .attr('class', 'visSVG')
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");


    svg.append('g')
        .attr("transform", "translate(" + xPadding + ",0)")
        .attr('id', 'sentYAxis')
        .call(ySentAxis);

    svg.append('g')
        .attr('id', 'newsCountYAxis')
        .attr("transform", "translate(" + (divWidth - xPadding) + ",0)")
        .call(yAxis);

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -divHeight / 2)
        .attr('y', xPadding / 2)
        .text("감성지수");
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -divHeight / 2)
        .attr('y', divWidth - (xPadding / 4))
        .text("기사수");


    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -divHeight / 2)
        .attr('y', divWidth - 20)
        .text("");

    svg.append('g')
        .attr('class', 'y axis-grid')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxisGrid);

    svg.append("rect")
        .attr("class", function () {
            console.log(divID)
            if (divID == 'enlargedChart') {
                console.log('making enlarged chart scroller')
                return "articleScrollerEnlarged"
            }
            else {
                console.log('making regular scroller')
                return "articleScroller"
            }
        })
        .attr("width", divWidth)
        .attr("height", divHeight)
        .style("fill", "none")
        .style("pointer-events", "all")
        .call(zoomBeh);


    if (divID == 'enlargedChart') {
        console.log('making enlarged')
        var clip = svg.append("defs").append("svg:clipPath")
            .attr('id', 'articleClipEnlarged')
            .append('svg:rect')
            .attr('width', INNER_WIDTH)
            .attr('height', divHeight)
            .attr('x', xPadding)
            .attr('y', 0);

        var clippedsvg = svg.append('g')
            .attr('class', 'linechartarea')
            .attr('clip-path', 'url(#articleClipEnlarged)')

        var rects = clippedsvg.selectAll('.articleCountRectEnlarged')
            .data(articleCounts)
            .enter()
            .append('rect')
            .attr('class', 'articleCountRectEnlarged')
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
            .attr('height', function (d, i) {
                /* //console.log(INNER_HEIGHT + yPadding)
                //console.log(d.count)
                //console.log(yScale(d.count)) */
                return INNER_HEIGHT + yPadding - yScale(d.count)
            })
            .attr('x', function (d, i) {
                var tempDate = dateParser(d.date)
                //console.log(xScale(tempDate))
                return xScale(tempDate);
            })
            .attr('y', function (d, i) {
                return yScale(d.count)
            })
            .attr('fill', '#ffa73b')
            .style('opacity', '40%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);

        var sentPoints = clippedsvg.selectAll('.sentimentPointEnlarged')
            .data(sentimentData)
            .enter()
            .append('circle')
            .attr('class', 'sentimentPointEnlarged')
            .attr('cx', function (d, i) {
                return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
            })
            .attr('cy', function (d, i) {
                return ySentScale(d.sentiment)
            })
            .attr('r', 5)
            .attr('fill', 'blue')
            .style('opacity', '0%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);

        var sentLines = clippedsvg.selectAll('.sentimentLineEnlarged')
            .data(sentimentData)
            .enter()
            .append('line')
            .attr('class', 'sentimentLineEnlarged')
            .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
            .attr('y1', function (d) { return ySentScale(d.sentiment) })
            .attr('x2', function (d, i) {
                if (i == 0) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                }
                return xScale(dateParser(sentimentData[i - 1].date)) + (xScale.bandwidth() / 2);
            })
            .attr('y2', function (d, i) {
                if (i == 0) { return ySentScale(d.sentiment) }
                return ySentScale(sentimentData[i - 1].sentiment);
            })
            .attr('stroke', '#990000')
            .attr('stroke-width', 1);



        var gX = svg.append('g')
            .attr('id', 'articlexAxis')
            .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
            .attr('clip-path', 'url(#articleClipEnlarged)')
            .call(xAxis);
    }
    else {
        //console.log(INNER_WIDTH)
        //console.log(xPadding)
        //console.log(xScale.domain());
        var clip = svg.append("defs").append("svg:clipPath")
            .attr('id', 'articleClip')
            .append('svg:rect')
            .attr('width', INNER_WIDTH)
            .attr('height', divHeight)
            .attr('x', xPadding)
            .attr('y', 0);

        var clippedsvg = svg.append('g')
            .attr('class', 'linechartarea')
            .attr('clip-path', 'url(#articleClip)')

        var rects = clippedsvg.selectAll('.articleCountRect')
            .data(articleCounts)
            .enter()
            .append('rect')
            .attr('class', 'articleCountRect')
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
            .attr('height', function (d, i) {
                /* //console.log(INNER_HEIGHT + yPadding)
                //console.log(d.count)
                //console.log(yScale(d.count)) */
                return INNER_HEIGHT + yPadding - yScale(d.count)
            })
            .attr('x', function (d, i) {
                var tempDate = dateParser(d.date)
                //console.log(xScale(tempDate))
                return xScale(tempDate);
            })
            .attr('y', function (d, i) {
                return yScale(d.count)
            })
            .attr('fill', '#ffa73b')
            .style('opacity', '40%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);

        var sentPoints = clippedsvg.selectAll('.sentimentPoint')
            .data(sentimentData)
            .enter()
            .append('circle')
            .attr('class', 'sentimentPoint')
            .attr('cx', function (d, i) {
                return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
            })
            .attr('cy', function (d, i) {
                return ySentScale(d.sentiment)
            })
            .attr('r', 5)
            .attr('fill', 'blue')
            .style('opacity', '0%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);

        var sentLines = clippedsvg.selectAll('.sentimentLine')
            .data(sentimentData)
            .enter()
            .append('line')
            .attr('class', 'sentimentLine')
            .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
            .attr('y1', function (d) { return ySentScale(d.sentiment) })
            .attr('x2', function (d, i) {
                if (i == 0) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                }
                return xScale(dateParser(sentimentData[i - 1].date)) + (xScale.bandwidth() / 2);
            })
            .attr('y2', function (d, i) {
                if (i == 0) { return ySentScale(d.sentiment) }
                return ySentScale(sentimentData[i - 1].sentiment);
            })
            .attr('stroke', '#990000')
            .attr('stroke-width', 1);



        var gX = svg.append('g')
            .attr('id', 'articlexAxis')
            .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
            .attr('clip-path', 'url(#articleClip)')
            .call(xAxis);
    }

    function zoom() {
        //console.log('zooming')

        xScale.range([xPadding, divWidth - xPadding].map((d, i) => {
            if (i == 0) {
                if (d3.event.transform.applyX(d) > xPadding) {
                    return xPadding
                }
                else {
                    return d3.event.transform.applyX(d)
                }
            }
            else if (i == 1) {
                if (d3.event.transform.applyX(d) < (divWidth - xPadding)) {
                    return divWidth - xPadding
                }
                else {
                    return d3.event.transform.applyX(d)
                }
            }
            else {
            }
        }));
        /* xScale.rangeRound([xPadding, divWidth - xPadding].map((d) => d3.event.transform.applyX(d))); */

        gX.call(xAxis.scale(xScale))

        console.log(this);

        if (this.getAttribute('class') == 'articleScrollerEnlarged') {
            svg.selectAll(".articleCountRectEnlarged")
                .attr("x", function (d) {
                    var tempDate = dateParser(d.date)
                    return xScale(tempDate);
                })
                .attr("width", xScale.bandwidth())

            svg.selectAll(".sentimentLineEnlarged")
                .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                    }
                    return xScale(dateParser(sentimentData[i - 1].date)) + (xScale.bandwidth() / 2);
                })
            svg.selectAll(".sentimentPointEnlarged")
                .attr("cx", function (d) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
        }
        else {
            svg.selectAll(".articleCountRect")
                .attr("x", function (d) {
                    var tempDate = dateParser(d.date)
                    return xScale(tempDate);
                })
                .attr("width", xScale.bandwidth())

            svg.selectAll(".sentimentLine")
                .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                    }
                    return xScale(dateParser(sentimentData[i - 1].date)) + (xScale.bandwidth() / 2);
                })
            svg.selectAll(".sentimentPoint")
                .attr("cx", function (d) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
        }





    }
}

function makeStockGraph(data, divID) {
    var company = document.getElementById('stockRange').value;

    stockData = [];
    for (var i = 0; i < data[company].length; i++) {
        /* //console.log(data[i].date)
        //console.log(data[i].price) */
        stockData.push({ time: dateParser(data[company][i].date), stock: parseFloat(data[company][i].price) });
    }
    //console.log(stockData)
    var timeVector = [];
    var stockVector = [];
    for (var i = 0; i < stockData.length; i++) {
        timeVector.push(stockData[i].time);
        stockVector.push(stockData[i].stock);
    }

    var xPadding = 50;
    var yPadding = 25;
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
        .domain([d3.min(timeVector), d3.max(timeVector)])
        .range([xPadding, divWidth - xPadding]);
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSizeOuter(0);
    var xAxisGrid = d3.axisBottom(xScale)
        .tickSize(-INNER_HEIGHT)
        .tickFormat('')
        .tickSizeOuter(0);


    var zoomBeh = d3.zoom()
        .scaleExtent([0, 500])
        .on("zoom", zoom);

    var svg = d3.select("#" + divID).append("svg")
        .attr('class', 'visSVG')
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");



    var gY = svg.append('g')
        .attr('class', 'yAxis')
        .attr('id', 'stocksYAxis')
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
    /* var gXGrid = svg.append('g')
        .attr('class', 'x axis-grid')
        .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
        .call(xAxisGrid); */




    var clip = svg.append("defs").append("svg:clipPath")
        .attr('id', 'stockClip')
        .append('svg:rect')
        .attr('width', INNER_WIDTH)
        .attr('height', INNER_HEIGHT)
        .attr('x', xPadding)
        .attr('y', yPadding);

    var clip = svg.append("defs").append("svg:clipPath")
        .attr('class', 'visSVG')
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
        .attr('stroke', '#368dff')
        .attr('stroke-width', 2);

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

    svg.append('text')
        .attr('transform', 'translate(' + (divWidth / 2) + ',' + (3 * yPadding / 4) + ")")
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .text('주가지수 추이');

    var leftWidth = document.getElementById('stocksYAxis').getBoundingClientRect().width;
    svg.attr('transform', 'translate(' + (leftWidth / 4) + ',0)');




    function zoom() {
        xScale.range([xPadding, divWidth - xPadding].map((d, i) => {
            if (i == 0) {
                if (d3.event.transform.applyX(d) > xPadding) {
                    return xPadding
                }
                else {
                    return d3.event.transform.applyX(d)
                }
            }
            else if (i == 1) {
                if (d3.event.transform.applyX(d) < (divWidth - xPadding)) {
                    return divWidth - xPadding
                }
                else {
                    return d3.event.transform.applyX(d)
                }
            }
            else {
            }
        }));
        /*  xScale.range([xPadding, divWidth - xPadding].map((d, i) => {
             if (i == 0) {
                 if (d3.event.transform.applyX(d) > xPadding) {
                     return xPadding
                 }
                 else {
                     return d3.event.transform.applyX(d)
                 }
             }
             else if (i == 1) {
                 if (d3.event.transform.applyX(d) < (divWidth - xPadding)) {
                     return divWidth - xPadding
                 }
                 else {
                     return d3.event.transform.applyX(d)
                 }
             }
             else {
             }
         })); */

        gX.call(xAxis.scale(xScale))
        /*  gXGrid.call(xAxisGrid.scale(xScale)) */

        lines.data(stockData)
            .attr('x1', function (d) { return xScale(d.time) })
            .attr('y1', function (d) { return yScale(d.stock) })
            .attr('x2', function (d, i) {
                if (i == 0) { return xScale(d.time) }
                return xScale(stockData[i - 1].time);
            })
            .attr('y2', function (d, i) {
                if (i == 0) { return yScale(d.stock) }
                return yScale(stockData[i - 1].stock);
            })
        points.data(stockData)
            .attr('fill', 'red')
            .attr("cx", function (d) { return xScale(d.time) })
            .attr("cy", function (d) { return yScale(d.stock) })




        /* 
        var new_xScale = d3.event.transform.rescaleX(xScale);
        gX.call(xAxis.scale(new_xScale))
        gXGrid.call(xAxisGrid.scale(new_xScale))
        lines.data(stockData)
            .attr('x1', function (d) { return new_xScale(d.time) })
            .attr('y1', function (d) { return yScale(d.stock) })
            .attr('x2', function (d, i) {
                if (i == 0) { return new_xScale(d.time) }
                return new_xScale(stockData[i - 1].time);
            })
            .attr('y2', function (d, i) {
                if (i == 0) { return yScale(d.stock) }
                return yScale(stockData[i - 1].stock);
            })
        points.data(stockData)
            .attr('fill', 'red')
            .attr("cx", function (d) { return new_xScale(d.time) })
            .attr("cy", function (d) { return yScale(d.stock) })

        gXGrid.call(xAxisGrid.scale(new_xScale)) */





        /* var new_yScale = d3.event.transform.rescaleY(yScale); */
        /* gY.call(yAxis.scale(new_yScale)) */
        /* gYGrid.call(yAxisGrid.scale(new_yScale)) */

        /* var stockDataSlice = [];
        var leftBound = Date.parse(new_xScale.invert(xPadding));
        var rightBound = Date.parse(new_xScale.invert(INNER_WIDTH - xPadding));
        //console.log(leftBound, rightBound)
        for (var i = 0; i < stockData.length; i++) {
            if (stockData[i].time > leftBound && stockData[i].time < rightBound) {
                stockDataSlice.push(stockData[i]);
            }
        } */

        /* lines.data(stockData)
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
            .attr("cy", function (d) { return new_yScale(d.stock) }) */


        /* TRY ONLY MOVING X */
        /*         gYGrid.call(yAxisGrid.scale(new_yScale)) */


        /* svg.select(".xAxis").call(xAxis);
        svg.select(".yAxis").call(yAxis);
 
        svg.selectAll(".stockLine")
            .attr("transform", transform); */
    }

}

function makePieChart(data, divID, nCutofftoShow, nCutoff) {
    console.log(nCutoff)
    console.log(nCutofftoShow)
    var dataSlice1 = data.slice(0, nCutoff)
    var pie = d3.pie()
        .value(function (d) { return d.tf_idf; })
    var colorVec = ["#F94144", "#F3722C", "#F8961E",
        "#F9C74F", "#90BE6D", "#43AA8B", "#3a34ed"];
    var color = d3.scaleOrdinal()
        .domain(dataSlice1.map(function (d) { return d.keyword }))
        .range(colorVec.slice(0, dataSlice1.length))



    var importanceTotal = dataSlice1.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b.tf_idf);
    }, 0);
    console.log(importanceTotal)


    dataSlice1.sort(function (a, b) { return b.tf_idf - a.tf_idf });

    dataSlice = dataSlice1.slice(0, nCutofftoShow);
    console.log(dataSlice)

    var keywordImpTotals = 0;
    var propData = [];
    for (var i = 0; i < dataSlice.length; i++) {
        keywordImpTotals += dataSlice[i].tf_idf / importanceTotal;
        propData.push({ keyword: dataSlice[i].keyword, tf_idf: dataSlice[i].tf_idf / importanceTotal });
    }
    /* propData.push({ keyword: '기타', frequency: 1 - keywordImpTotals }); */

    var pieChart = document.getElementById(divID);
    pieChart.innerHTML = "";
    console.log(propData)

    var svg = d3.select("#" + divID).append("svg")
        .attr('class', 'visSVG')
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
        .text('중요도')
        .style('font-style', 'italic');

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
    //console.log(elementClass)
    if (elementClass == 'stockPoint') {
        var date = new Date(d.time)
        d3.select(this).style('fill', 'gray');
        tooltip.style('visibility', 'visible');
        tooltip.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
            + '월' + date.getDate() + '일') + '<br />주가: ' + d.stock)
        tooltip.style('background-color', '#f0f0f0');
    }
    else if (elementClass == 'stockPointEnlarged') {
        var date = new Date(d.time)
        d3.select(this).style('fill', 'gray');
        tooltipEnlarged.style('visibility', 'visible');
        tooltip.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
            + '월' + date.getDate() + '일') + '<br />주가: ' + d.stock)
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
        tooltip.text(d.keyword + ': ' + d.tf_idf);
    }
    else if (elementClass == 'keywordBarEnlarged') {
        d3.select(this).style('opacity', '70%');
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text(d.keyword + ': ' + d.tf_idf);
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
        document.getElementById('keywordPercentkeywordPie').innerHTML = (d.data.tf_idf * 100).toFixed(2) + '%'
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
        document.getElementById('keywordPercentenlargedChart').innerHTML = (d.data.tf_idf * 100).toFixed(2) + '%'
    }
    else if (elementClass == 'wordCloudWord') {
        d3.select(this).style('opacity', '100%');
        d3.select(this)
            .style('font-size', this.style.fontSize * 1.1)
    }
    else if (elementClass == 'articleCountRect') {
        d3.select(this).style('opacity', '70%');
        tooltip.style('visibility', 'visible');
        tooltip.text(d.date + ': ' + d.count);
    }
    else if (elementClass == 'articleCountRectEnlarged') {
        d3.select(this).style('opacity', '70%');
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text(d.date + ': ' + d.count);
    }
    else if (elementClass == 'sentimentPoint') {
        tooltip.style('visibility', 'visible');
        tooltip.text(d.date + ': ' + d.sentiment);
    }
    else if (elementClass == 'sentimentPointEnlarged') {
        console.log('in sent point enlarged')
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text(d.date + ': ' + d.sentiment);
    }
    else {
        console.log('in else')
        d3.select(this).style('fill', 'gray');
        tooltip.style('background-color', '#f0f0f0');
        tooltip.style('visibility', 'visible');

    }
}

function onMouseMove(d, i) {
    var elementClass = this.getAttribute('class');
    if (elementClass.includes('Enlarged')) {
        var divX = document.getElementById('entirePopupBox').getBoundingClientRect().left;
        var divY = document.getElementById('entirePopupBox').getBoundingClientRect().top;
        return tooltipEnlarged.style("top", (event.pageY - 10 - divY) + "px").style("left", (event.pageX + 10 - divX) + "px");
    }
    else {
        return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
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
    else if (elementClass == 'articleCountRect') {
        d3.select(this).style('opacity', '40%');
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'articleCountRectEnlarged') {
        d3.select(this).style('opacity', '40%');
        tooltipEnlarged.style('visibility', 'hidden');
    }
    else if (elementClass == 'sentimentPoint') {
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'sentimentPointEnlarged') {
        tooltipEnlarged.style('visibility', 'hidden');
    }
    else {
        d3.select(this).style('fill', 'black');
        tooltipEnlarged.style('visibility', 'hidden');

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
                //console.log('IN FAILURE')
                document.getElementById('fontSizeSlider').setAttribute('max', sizeMax - step);
                document.getElementById('fontSizeSlider').setAttribute('value', 3 * sizeMax / 4);
                document.getElementById('fontSizeValue').innerHTML = 3 * sizeMax / 4;
            }
        })
        .start();
}

function drawWordcloud(words, divID) {
    var graphDiv = document.getElementById(divID);
    //console.log(words)

    var maxValue = Math.max.apply(Math, words.map(function (o) { return o.tf_idf }));
    console.log(maxValue)
    var wordSlice = [];
    for (var i = 0; i < document.getElementById('textNumberSlider').value; i++) {
        wordSlice.push({ text: words[i].keyword, value: words[i].tf_idf });
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

    //console.log(wordSlice)
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
            .attr('class', 'visSVG')
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
            //console.log(event)
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

function drawWordcloud2(words, divID) {
    var graphDiv = document.getElementById(divID);
    //console.log(words)

    var maxValue = Math.max.apply(Math, words.map(function (o) { return o.tf_idf }));
    console.log(maxValue)
    var wordSlice = [];
    for (var i = 0; i < document.getElementById('textNumberSlider').value; i++) {
        wordSlice.push({ text: words[i].keyword, value: words[i].tf_idf });
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

    //console.log(wordSlice)
    document.getElementById(divID).innerHTML = "";
    var layout = d3.layout.cloud()
        .size([divWidth - 2 * xPadding, divHeight - 2 * yPadding])
        .words(wordSlice)
        .padding(document.getElementById('paddingSlider').value)
        .rotate(0)
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
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
            .attr('class', 'visSVG')
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
            //console.log(event)
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

function getChartQuery1() {
    ////console.log(document.getElementById('articleCountRange').value);
    d3.selectAll('.visSVG').remove();
    var search_company = document.getElementById('search_company').value;
    //console.log(search_company);
    $.ajax({
        url: "/getChartQueryByCompany/" + search_company,
        method: 'GET',
        dataType: 'json',
        success: function (responseData) {
            window.newsResponseData = responseData;

            //console.log(responseData)
            alert('조회 성공: ' + responseData.allNews.length + '개 기사');
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



            var chart = document.getElementById('articleCounts');
            makeCombinedGraph(responseData.sentimentDates, responseData.allNews, 'articleCounts');
            chart.addEventListener('click', function () {
                console.log('clicked');
                makeCombinedGraph(responseData.sentimentDates, responseData.allNews, 'enlargedChart');
            })
            document.getElementById('articleCountRange').addEventListener('change', function () {
                makeCombinedGraph(responseData.sentimentDates, responseData.allNews, 'articleCounts');
            })

            /* var chart = document.getElementById('articleCounts');
            makeArticleCounts(responseData.allNews, 'articleCounts');
            chart.addEventListener('click', function () {
                //console.log('clicked');
                makeArticleCounts(responseData.allNews, 'enlargedChart');
            }) */

            var chart = document.getElementById('keywordBar');
            makeKeywordBarPlot(responseData.keywords, 'keywordBar', document.getElementById('keywordBarSlider').value)
            chart.addEventListener('click', function () {
                document.getElementById('keywordBarSettings').style.display = 'inline';
                makeKeywordBarPlot(responseData.keywords, 'enlargedChart', document.getElementById('keywordBarSlider').value)
            })


            document.getElementById('keywordPieSlider2').max = responseData.keywords.length;
            var pieChart = document.getElementById('keywordPie');
            makePieChart(responseData.keywords, 'keywordPie', document.getElementById('keywordPieSlider').value, document.getElementById('keywordPieSlider2').value)
            pieChart.addEventListener('click', function () {
                console.log('clicked');
                document.getElementById('keywordPieSettings').style.display = 'inline';
                makePieChart(responseData.keywords, 'enlargedChart', document.getElementById('keywordPieSlider').value, document.getElementById('keywordPieSlider2').value);
            })

            var companies = [];
            var allStockData = {};
            for (var i = 0; i < responseData.stockData.length; i++) {
                var tempStock = responseData.stockData[i]
                if (!companies.includes(tempStock.company)) {
                    companies.push(tempStock.company);
                    allStockData[tempStock.company] = [];
                }
                allStockData[tempStock.company].push({ date: tempStock.date, price: tempStock.price })
            }
            console.log(allStockData)
            var shortestCompany = companies.reduce(function (a, b) {
                return a.length <= b.length ? a : b;
            })
            var stockOptions = document.getElementById('stockRange');
            console.log(stockOptions);
            for (var i = 0; i < companies.length; i++) {
                if (companies[i] == shortestCompany) {
                    var tempHTML = `<option value='${companies[i]}' selected>${companies[i]}</option>`;
                }
                else {
                    var tempHTML = `<option value='${companies[i]}'>${companies[i]}</option>`;
                }
                stockOptions.insertAdjacentHTML('beforeend', tempHTML);
            }

            var divID = 'stockTime';
            stockGraph = document.getElementById(divID)
            stockGraph.addEventListener('click', function () {
                document.getElementById('resetChart').addEventListener('click', function () {
                    console.log('clicked');
                    makeStockGraph(allStockData, 'enlargedChart');
                })
                makeStockGraph(allStockData, 'enlargedChart');
            })
            document.getElementById('stockRange').addEventListener('change', function () {
                makeStockGraph(allStockData, divID);
            })
            makeStockGraph(allStockData, divID);


            makeWordcloud(responseData.keywords);
            makeWordcloud2(responseData.keywords);

        },
        error: function () {
            alert('조회 실패');
        }
    });

    //console.log('test')
}

function getChartQuery2() {
    ////console.log(document.getElementById('articleCountRange').value);
    d3.selectAll('.visSVG').remove();
    var search_company = document.getElementById('search_company').value;
    //console.log(search_company);
    loading1('뉴스')
    $.ajax({
        url: "/getChartQueryByCompany/" + search_company,
        method: 'GET',
        dataType: 'json',
        success: function (responseData) {
            window.newsChartData = responseData;

            //console.log(responseData)
            //alert('조회 성공: ' + responseData.allNews.length + '개 기사');

            makeGauge('dangerGauge', responseData.averageScore)
            document.getElementById('dangerGauge').addEventListener('click', function () {
                //console.log('clicked');
                makeGauge('enlargedChart', responseData.averageScore);
            })


            var sentimentData = [];
            for (var i = 0; i < responseData.sentimentDates.length; i++) {
                sentimentData.push({
                    time: Date.parse(responseData.sentimentDates[i].date),
                    sentiment: responseData.sentimentDates[i].sentiment
                })
            }
            /* var chart = document.getElementById('sentimentTimeTwoLines');
            makeSentimentTimeGraph(sentimentData, 'sentimentTimeTwoLines');
            chart.addEventListener('click', function () {
                //console.log('clicked');
                makeSentimentTimeGraph(sentimentData, 'enlargedChart');
            })
 */


            var chart = document.getElementById('articleCounts');
            makeCombinedGraph(responseData.sentimentDates, responseData.allNews, 'articleCounts');
            chart.addEventListener('click', function () {
                //console.log('clicked');
                makeCombinedGraph(responseData.sentimentDates, responseData.allNews, 'enlargedChart');
            })
            document.getElementById('articleCountRange').addEventListener('change', function () {
                makeCombinedGraph(responseData.sentimentDates, responseData.allNews, 'articleCounts');
            })

            /* var chart = document.getElementById('articleCounts');
            makeArticleCounts(responseData.allNews, 'articleCounts');
            chart.addEventListener('click', function () {
                //console.log('clicked');
                makeArticleCounts(responseData.allNews, 'enlargedChart');
            }) */

            var chart = document.getElementById('keywordBar');
            makeKeywordBarPlot(responseData.keywords, 'keywordBar', document.getElementById('keywordBarSlider').value)
            chart.addEventListener('click', function () {
                document.getElementById('keywordBarSettings').style.display = 'inline';
                makeKeywordBarPlot(responseData.keywords, 'enlargedChart', document.getElementById('keywordBarSlider').value)
            })

            if (responseData.stockData.length > 0) {
                console.log('test')
            }
            var companies = [];
            var allStockData = {};
            for (var i = 0; i < responseData.stockData.length; i++) {
                var tempStock = responseData.stockData[i]
                if (!companies.includes(tempStock.company)) {
                    companies.push(tempStock.company);
                    allStockData[tempStock.company] = [];
                }
                allStockData[tempStock.company].push({ date: tempStock.date, price: tempStock.price })
            }
            console.log(allStockData)
            var shortestCompany = companies.reduce(function (a, b) {
                return a.length <= b.length ? a : b;
            })
            var stockOptions = document.getElementById('stockRange');
            console.log(stockOptions);
            for (var i = 0; i < companies.length; i++) {
                if (companies[i] == shortestCompany) {
                    var tempHTML = `<option value='${companies[i]}' selected>${companies[i]}</option>`;
                }
                else {
                    var tempHTML = `<option value='${companies[i]}'>${companies[i]}</option>`;
                }
                stockOptions.insertAdjacentHTML('beforeend', tempHTML);
            }

            var divID = 'stockTime';
            stockGraph = document.getElementById(divID)
            stockGraph.addEventListener('click', function () {
                document.getElementById('resetChart').addEventListener('click', function () {
                    console.log('clicked');
                    makeStockGraph(allStockData, 'enlargedChart');
                })
                makeStockGraph(allStockData, 'enlargedChart');
            })
            document.getElementById('stockRange').addEventListener('change', function () {
                makeStockGraph(allStockData, divID);
            })
            makeStockGraph(allStockData, divID);

            $('#myModal').hide();



            /* document.getElementById('keywordPieSlider2').max = responseData.keywords.length;
            var pieChart = document.getElementById('keywordPie');
            makePieChart(responseData.keywords, 'keywordPie', document.getElementById('keywordPieSlider').value, document.getElementById('keywordPieSlider2').value)
            pieChart.addEventListener('click', function () {
                //console.log('clicked');
                document.getElementById('keywordPieSettings').style.display = 'inline';
                makePieChart(responseData.keywords, 'enlargedChart', document.getElementById('keywordPieSlider').value, document.getElementById('keywordPieSlider2').value);
            }) */


            /* makeWordcloud(responseData.keywords); */

        },
        error: function () {
            alert('조회 실패');
        }
    });

    //console.log('test')
}

function getChartQuery3() {
    ////console.log(document.getElementById('articleCountRange').value);
    d3.selectAll('.visSVG').remove();
    var search_company = '삼성전자'
    //console.log(search_company);
    $.ajax({
        url: "/getChartQueryByCompany/" + search_company,
        method: 'GET',
        dataType: 'json',
        success: function (responseData) {
            window.newsResponseData = responseData;
            console.log(responseData)

            //console.log(responseData)
            alert('조회 성공: ' + responseData.allNews.length + '개 기사');



        },
        error: function () {
            alert('조회 실패');
        }
    });

    //console.log('test')
}

function makeWordcloud(data) {
    //console.log(data)
    var words = data.sort(function (a, b) { return b.tf_idf - a.tf_idf });
    //console.log(words)
    var sizeMax = 20;
    var maxValue = Math.max.apply(Math, words.map(function (o) { return o.tf_idf }));
    var paddingSlide = document.getElementById('paddingSlider')
    document.getElementById('paddingValue').innerHTML = this.value;
    paddingSlide.onchange = function () {
        document.getElementById('paddingValue').innerHTML = this.value;
        drawWordcloud(words, 'enlargedChart');
    }

    var fontSizeSlide = document.getElementById('fontSizeSlider')
    document.getElementById('fontSizeValue').innerHTML = this.value;
    fontSizeSlide.onchange = function () {
        document.getElementById('fontSizeValue').innerHTML = this.value;
        drawWordcloud(words, 'enlargedChart');
    }

    var textNumberSlide = document.getElementById('textNumberSlider')
    /* textNumberSlide.setAttribute('max', words.length); */
    document.getElementById('textMaxValue').innerHTML = this.value;
    textNumberSlide.onchange = function () {
        document.getElementById('textMaxValue').innerHTML = this.value;
        drawWordcloud(words, 'enlargedChart');
    }

    wordCloud = document.getElementById('wordCloud')
    wordCloud.addEventListener('click', () => clickFunction(), false);

    async function clickFunction() {
        /* let maxWords = await getMaxWords(words, 20, 'enlargedChart'); */
        //console.log('clicked wordcloud')
        document.getElementById('wordCloudSettings').style.display = 'inline';
        drawWordcloud(words, 'enlargedChart');
    }

    async function f() {
        let maxWords = await getMaxWords(words, 20, 'wordCloud');
        //console.log('this is async')
        drawWordcloud(words, 'wordCloud');
    }

    drawWordcloud(words, 'wordCloud')
}

function makeWordcloud2(data) {
    //console.log(data)
    var words = data.sort(function (a, b) { return b.tf_idf - a.tf_idf });
    //console.log(words)
    var sizeMax = 20;
    var maxValue = Math.max.apply(Math, words.map(function (o) { return o.tf_idf }));
    var paddingSlide = document.getElementById('paddingSlider')
    document.getElementById('paddingValue').innerHTML = paddingSlide.value;
    paddingSlide.onchange = function () {
        document.getElementById('paddingValue').innerHTML = paddingSlide.value;
        drawWordcloud2(words, 'enlargedChart');
    }

    var fontSizeSlide = document.getElementById('fontSizeSlider')
    document.getElementById('fontSizeValue').innerHTML = fontSizeSlide.value;
    fontSizeSlide.onchange = function () {
        document.getElementById('fontSizeValue').innerHTML = fontSizeSlide.value;
        drawWordcloud2(words, 'enlargedChart');
    }

    var textNumberSlide = document.getElementById('textNumberSlider')
    /* textNumberSlide.setAttribute('max', words.length); */
    document.getElementById('textMaxValue').innerHTML = textNumberSlide.value;
    textNumberSlide.onchange = function () {
        document.getElementById('textMaxValue').innerHTML = textNumberSlide.value;
        drawWordcloud2(words, 'enlargedChart');
    }

    wordCloud = document.getElementById('wordCloud2')
    wordCloud.addEventListener('click', () => clickFunction(), false);

    async function clickFunction() {
        /* let maxWords = await getMaxWords(words, 20, 'enlargedChart'); */
        //console.log('clicked wordcloud')
        document.getElementById('wordCloudSettings').style.display = 'inline';
        drawWordcloud2(words, 'enlargedChart');
    }

    async function f() {
        let maxWords = await getMaxWords(words, 20, 'wordCloud2');
        //console.log('this is async')
        drawWordcloud2(words, 'wordCloud2');
    }

    drawWordcloud2(words, 'wordCloud2')
}