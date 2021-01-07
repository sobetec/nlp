function makeGauge(divID, sentimentScore) {
    if (!isFinite(sentimentScore)) {
        sentimentScore = 0;
    }
    var sFactor = 4;
    function sobeDangerScore(x) {
        return (50 + sFactor) * ((x - 50) / (sFactor + Math.abs(50 - x))) + 50
    }
    console.log(sentimentScore)
    var sentimentScore = sobeDangerScore(sentimentScore);
    var rotation = sentimentScore / 100 * 240 - 30;

    var gauge = document.getElementById(divID);
    var divHeight = gauge.scrollHeight;
    var divWidth = gauge.scrollWidth;
    gauge.innerHTML = "";


    gaugeSVG = d3.select("#" + divID).append("svg")
        .attr('class', function () { if (divID == 'enlargedChart') { return 'largeSVG' } else { return 'visSVG' } })
        .attr("width", "100%")
        .attr("height", "100%");

    if (divID == "enlargedChart") {
        var divHeight = 550;
        var divWidth = 1250;
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

    appendArc(gaugeSVG, divWidth, divHeight, 240, 312, "#ef5d5d", 'negative' + divID);
    appendArc(gaugeSVG, divWidth, divHeight, 312, 408, "#ffcf49", 'neutral' + divID);
    appendArc(gaugeSVG, divWidth, divHeight, 48, 120, "#37b76a", 'positive' + divID);

    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.145 * divHeight, 0.14 * divHeight, '#negative' + divID, 'NEGATIVE')
    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.255 * divHeight, 0.14 * divHeight, '#neutral' + divID, 'NEUTRAL')
    appendArcLabel(gaugeSVG, divWidth, divHeight, 0.17 * divHeight, 0.14 * divHeight, '#positive' + divID, 'POSITIVE')

    gaugeSVG.append('g')
        .attr('transform', 'translate(' + divWidth / 2 + ',' + 3 * divHeight / 5 + ")")
        .append("polygon")
        .attr('id', function () {
            if (divID == 'enlargedChart') {
                return 'gaugeNeedleEnlarged';
            }
            else {
                return 'gaugeNeedle'
            }
        })
        .attr('stroke-width', 3)
        .attr('fill', '#820812')
        .attr('class', 'needle')
        .attr('points', "0,0 -" + "0," + 0.02 * divHeight +
            " " + -divHeight / 2.6 + ",0 " + "0," + -divHeight * 0.02)
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .attr("transform", "rotate(149)")
        .transition()
        .ease(d3.easeElastic)
        .duration(5000)
        .attr("transform", "rotate(" + rotation + ")")


    gaugeSVG.append('g')
        .attr('transform', 'translate(' + divWidth / 2 + ',' + divHeight / 1.27 + ")")
        .append('text')
        .text(function (d) {
            if (rotation < -30) {
                return 'NO RESULT'
            }
            else {
                if (rotation < 50) {
                    return 'Negative'
                }
                else if (rotation > 130) {
                    return 'Positive'
                }
                else {
                    return 'Neutral'
                }
            }
        })
        .attr('id', 'sentimentIndicator')
        .style('alignment-baseline', 'middle')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .style('fill', function (d) {
            if (rotation < 50) {
                return '#ef5d5d'
            }
            else if (rotation > 130) {
                return '#37b76a'
            }
            else {
                return '#ffcf49'
            }
        })
        .style('font-size', 0.12 * divHeight);

    gaugeSVG.append('g')
        .attr('transform', 'translate(' + divWidth / 2 + ',' + divHeight / 1.12 + ")")
        .append('text')
        .text(function (d) {
            if (rotation < -30) {
                return ''
            }
            else {
                return '(' + String(sentimentScore.toFixed(1) + '점)')
            }
        })
        .attr('id', 'sentimentIndicator')
        .style('alignment-baseline', 'middle')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .style('fill', function (d) {
            if (rotation < 50) {
                return '#ef5d5d'
            }
            else if (rotation > 130) {
                return '#37b76a'
            }
            else {
                return '#ffcf49'
            }
        })
        .style('font-size', 0.06 * divHeight);


    var textHeight = document.getElementById('sentimentIndicator').getBoundingClientRect().height
    var textWidth = document.getElementById('sentimentIndicator').getBoundingClientRect().width
    gaugeSVG.append("circle")
        .style("fill", "black")
        .attr("r", 0.02 * divHeight)
        .attr("cx", divWidth / 2)
        .attr("cy", 3 * divHeight / 5);

    //var lg = svgmain

    function appendArc(g, divWidth, divHeight, startAngle, endAngle, color, arcID) {
        var arc = d3.arc()
            .innerRadius(divHeight / 5 / 0.6377118)
            .outerRadius(divHeight / 3 / 0.6377118)
            .startAngle(startAngle * (Math.PI / 180))  //180 degree = ㅍ radian , 1 degree = ㅍ / 180 radian
            .endAngle(endAngle * (Math.PI / 180));
        if (divID == 'enlargedChart') {
            g.append("path")
                .attr("d", arc)
                .attr('id', arcID)
                .attr('class', 'shadowArc')
                .style('filter', 'url(#drop-shadow)')
                .attr("transform", "translate(" + divWidth / 2 + ',' + 3 * divHeight / 5 + ")")
                .attr("fill", color)
                .on('click', function () {
                    d3.select('#gaugeNeedleEnlarged')
                        .transition()
                        .ease(d3.easeLinear)
                        .duration(200)
                        .attr("transform", "rotate(150)")
                        .transition()
                        .ease(d3.easeElastic)
                        .duration(5000)
                        .attr("transform", "rotate(" + rotation + ")")
                })
        }
        else {
            g.append("path")
                .attr("d", arc)
                .attr('id', arcID)
                .attr('class', 'shadowArc')
                .attr("transform", "translate(" + divWidth / 2 + ',' + 3 * divHeight / 5 + ")")
                .attr("fill", color)
                .on('click', function () {
                    d3.select('#gaugeNeedle')
                        .transition()
                        .ease(d3.easeLinear)
                        .duration(200)
                        .attr("transform", "rotate(150)")
                        .transition()
                        .ease(d3.easeElastic)
                        .duration(5000)
                        .attr("transform", "rotate(" + rotation + ")")
                })
        }

    }

    function appendArcLabel(g, divWidth, divHeight, x, dy, arclabel, label) {
        g.append("text")
            .attr('x', x)
            .attr('dy', dy)
            .attr("class", "arcLabel")
            .append("textPath")
            .attr("xlink:href", arclabel)
            .style("font-size", 0.07474 * divHeight)
            .style("font-color", 'black')
            .text(label);
    }

    if (divID == 'enlargedChart') {
        window.SVG = gaugeSVG;
    }

    if (sentimentScore < 0) {
        $('#maximizeGaugeSpan').hide();
    }
    else {
        $('#maximizeGaugeSpan').show();
    }
    $('#resetDiv').hide();



}

function makeSentimentBoxPlot(sentimentData, divID) {
    console.log('making sentiment box')
    console.log(sentimentData)
    console.log(sentimentData.length)
    if (sentimentData.length > 0) {
        document.getElementById(divID).innerHTML = "";

        sentimentData.sort(function (a, b) { return dateParser(b.date) - dateParser(a.date) });
        var dateArray = [];
        for (var i = sentimentData.length - 1; i > -1; i--) {
            dateArray.push(dateParser(sentimentData[i].date));
        }
        var graphDiv = document.getElementById(divID);
        if (divID == "enlargedChart") {
            var divHeight = 550;
            var divWidth = 1250;
            document.getElementById(divID).innerHTML = "";
        }
        else {
            var divHeight = graphDiv.clientHeight;
            var divWidth = graphDiv.clientWidth;
        }
        var xPadding = 65;
        var yPadding = 25;
        var INNER_HEIGHT = divHeight - 2 * yPadding;
        var INNER_WIDTH = divWidth - 2 * xPadding;
        var ySentScale = d3.scaleLinear()
            .domain([0, 100])
            .range([divHeight - yPadding, yPadding])
        var ySentAxis = d3.axisLeft(ySentScale)
            .scale(ySentScale)
            .ticks(5)
            .tickSizeOuter(0);
        var yAxisGrid = d3.axisLeft(ySentScale)
            .tickSize(-INNER_WIDTH)
            .ticks(5)
            .tickFormat('')
            .tickSizeOuter(0);

        var gubun = $("#gubunNews").val()

        var xScale = d3.scaleBand()
            .domain(dateArray)
            .range([xPadding, divWidth - xPadding])
            .padding(0.05);
        if (gubun == 'month') {
            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    return !((i + Math.floor(sentimentData.length / 8)) % (Math.floor(sentimentData.length / 4)))
                }))
                .ticks(5)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.timeFormat("%Y년%b%d일"))
        }
        else {
            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    if (gubun == 'quarter') {
                        return !((i + Math.floor(sentimentData.length / 6)) % (Math.floor(sentimentData.length / 3)))
                    }
                    else if (gubun == 'year')
                        return !((i + Math.floor(sentimentData.length / 12)) % (Math.floor(sentimentData.length / 6)))
                    else {
                        return !((i + Math.floor(sentimentData.length / 16)) % (Math.floor(sentimentData.length / 8)))
                    }
                }))
                .ticks(5)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.timeFormat("%Y년%b"))
        }


        var zoomBeh = d3.zoom()
            .scaleExtent([0, 100])
            .on("zoom", zoom);



        var svg = d3.select("#" + divID).append("svg")
            .attr('class', function () { if (divID == 'enlargedChart') { return 'largeSVG' } else { return 'visSVG' } })
            .attr("width", "100%")
            .attr("height", "100%")
            .attr('pointer-events', 'all');
        if (divID == 'enlargedChart') {
            svg.call(zoomBeh);
        }

        svg.append('rect')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('fill', 'white')


        svg.append('g')
            .attr("transform", "translate(" + xPadding + ",0)")
            .attr('id', 'sentYAxis')
            .call(ySentAxis);


        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -divHeight / 2)
            .attr('y', xPadding / 2)
            .text("감성지수");


        svg.append('g')
            .attr('class', 'y axis-grid')
            .attr("transform", "translate(" + xPadding + ",0)")
            .call(yAxisGrid);

        if (divID == 'enlargedChart') {
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

            var gX = svg.append('g')
                .attr('id', 'articlexAxis')
                .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
                .attr('clip-path', 'url(#articleClipEnlarged)')
                .call(xAxis);
        }
        else {
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
            var gX = svg.append('g')
                .attr('id', 'articlexAxis')
                .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
                .attr('clip-path', 'url(#articleClip)')
                .call(xAxis);
        }

        var iqrBoxes = clippedsvg.selectAll('.iqrBox .upper')
            .data(sentimentData)
            .enter()
            .append('rect')
            .attr('class', 'iqrBox upper')
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
            .attr('height', function (d, i) {
                return Math.max(0, Math.min(ySentScale(60), ySentScale(d.lower)) - ySentScale(d.upper))
            })
            .attr('x', function (d, i) {
                var tempDate = dateParser(d.date)
                return xScale(tempDate);
            })
            .attr('y', function (d, i) {
                return ySentScale(d.upper)
            })
            .attr('fill', 'red')
            .style('opacity', '40%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);

        var iqrBoxes = clippedsvg.selectAll('.iqrBox .center')
            .data(sentimentData)
            .enter()
            .append('rect')
            .attr('class', 'iqrBox center')
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
            .attr('height', function (d, i) {
                return Math.max(0, Math.min(ySentScale(40), ySentScale(d.lower)) - Math.max(ySentScale(60), ySentScale(d.upper)))
            })
            .attr('x', function (d, i) {
                var tempDate = dateParser(d.date)
                return xScale(tempDate);
            })
            .attr('y', function (d, i) {
                return Math.max(ySentScale(60), ySentScale(d.upper))
            })
            .attr('fill', 'green')
            .style('opacity', '40%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);

        var iqrBoxes = clippedsvg.selectAll('.iqrBox .lower')
            .data(sentimentData)
            .enter()
            .append('rect')
            .attr('class', 'iqrBox lower')
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
            .attr('height', function (d, i) {
                return Math.max(0, ySentScale(d.lower) - Math.max(ySentScale(40), ySentScale(d.upper)))
            })
            .attr('x', function (d, i) {
                var tempDate = dateParser(d.date)
                return xScale(tempDate);
            })
            .attr('y', function (d, i) {
                return Math.max(ySentScale(d.upper), ySentScale(40))
            })
            .attr('fill', 'blue')
            .style('opacity', '40%')
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);


        var meanLines = clippedsvg.selectAll('.meanLine')
            .data(sentimentData)
            .enter()
            .append('line')
            .attr('class', 'meanLine')
            .attr('x1', function (d) { return xScale(dateParser(d.date)) })
            .attr('y1', function (d) { return ySentScale(d.median) })
            .attr('x2', function (d, i) {
                return xScale(dateParser(d.date)) + xScale.bandwidth()
            })
            .attr('y2', function (d, i) {
                return ySentScale(d.median)
            })
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        var meanLines = clippedsvg.selectAll('.firstQuartLine')
            .data(sentimentData)
            .enter()
            .append('line')
            .attr('class', 'firstQuartLine')
            .attr('x1', function (d) { return xScale(dateParser(d.date)) })
            .attr('y1', function (d) { return ySentScale(d.min) })
            .attr('x2', function (d, i) {
                return xScale(dateParser(d.date)) + xScale.bandwidth()
            })
            .attr('y2', function (d, i) {
                return ySentScale(d.min)
            })
            .attr('stroke', '#990000')
            .attr('stroke-width', 1);

        var meanLines = clippedsvg.selectAll('.thirdQuartLine')
            .data(sentimentData)
            .enter()
            .append('line')
            .attr('class', 'thirdQuartLine')
            .attr('x1', function (d) { return xScale(dateParser(d.date)) })
            .attr('y1', function (d) { return ySentScale(d.max) })
            .attr('x2', function (d, i) {
                return xScale(dateParser(d.date)) + xScale.bandwidth()
            })
            .attr('y2', function (d, i) {
                return ySentScale(d.max)
            })
            .attr('stroke', '#990000')
            .attr('stroke-width', 1);

        var meanLines = clippedsvg.selectAll('.centerLine')
            .data(sentimentData)
            .enter()
            .append('line')
            .attr('class', 'centerLine')
            .attr('x1', function (d) { return xScale(dateParser(d.date)) + xScale.bandwidth() / 2 })
            .attr('y1', function (d) { return ySentScale(d.min) })
            .attr('x2', function (d, i) { return xScale(dateParser(d.date)) + xScale.bandwidth() / 2 })
            .attr('y2', function (d) { return ySentScale(d.max) })
            .attr('stroke', '#990000')
            .attr('stroke-width', 1);


        /* MAKE LEGEND */

        var legend = svg.append('g')
            .attr('width', (divWidth / 2) + 'px')
            .attr('height', '30px')
            .attr('id', 'sentimentBoxLegend');

        legend.append('rect')
            .attr('x', 0)
            .attr('y', yPadding / 2)
            .attr('width', yPadding / 3)
            .attr('height', yPadding / 3)
            .attr('fill', 'blue')
            .attr('opacity', '40%')

        legend.append('text')
            .attr('transform', 'translate(' + (yPadding / 2.5) + ',' + (3 * yPadding / 4) + ")")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .style('font-size', '12px')
            .text('부정');

        var legendShift1 = yPadding * 1.7;
        legend.append('rect')
            .attr('x', legendShift1)
            .attr('y', yPadding / 2)
            .attr('width', yPadding / 3)
            .attr('height', yPadding / 3)
            .attr('fill', 'green')
            .attr('opacity', '40%')

        legend.append('text')
            .attr('transform', 'translate(' + (yPadding / 2.5 + legendShift1) + ',' + (3 * yPadding / 4) + ")")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .style('font-size', '12px')
            .text('중립');

        var legendShift2 = yPadding * 3.4;
        legend.append('rect')
            .attr('x', legendShift2)
            .attr('y', yPadding / 2)
            .attr('width', yPadding / 3)
            .attr('height', yPadding / 3)
            .attr('fill', 'red')
            .attr('opacity', '40%')

        legend.append('text')
            .attr('transform', 'translate(' + (yPadding / 2.5 + legendShift2) + ',' + (3 * yPadding / 4) + ")")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .style('font-size', '12px')
            .text('긍정');

        var legendWidth = document.getElementById('sentimentBoxLegend').getBoundingClientRect().width;


        legend.attr('transform', 'translate(' + (divWidth - xPadding - legendWidth) + ',0)')








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
            gX.call(xAxis.scale(xScale))

            svg.selectAll(".meanLine")
                .attr('x1', function (d) { return xScale(dateParser(d.date)) })
                .attr('x2', function (d, i) { return xScale(dateParser(d.date)) + xScale.bandwidth() })

            svg.selectAll(".firstQuartLine")
                .attr('x1', function (d) { return xScale(dateParser(d.date)) })
                .attr('x2', function (d, i) { return xScale(dateParser(d.date)) + xScale.bandwidth() })

            svg.selectAll(".thirdQuartLine")
                .attr('x1', function (d) { return xScale(dateParser(d.date)) })
                .attr('x2', function (d, i) { return xScale(dateParser(d.date)) + xScale.bandwidth() })

            svg.selectAll('.iqrBox')
                .attr('width', function (d, i) {
                    return xScale.bandwidth();
                })
                .attr('x', function (d, i) {
                    var tempDate = dateParser(d.date)
                    return xScale(tempDate);
                });

            svg.selectAll(".centerLine")
                .attr('x1', function (d) { return xScale(dateParser(d.date)) + xScale.bandwidth() / 2 })
                .attr('x2', function (d, i) { return xScale(dateParser(d.date)) + xScale.bandwidth() / 2 })
        }
        if (divID == 'enlargedChart') {
            window.SVG = svg;
        }

        svg.attr('transform', 'translate(10,0)')

        if (divID == 'enlargedChart') {
            window.SVG = svg;
        }
        $('#maximizeSentimentBoxSpan').show();
        $('#resetDiv').show();

    } else {
        var keywordBarContents = `
                                    <div style="text-align:center;">
                                        <img src="/img/no_gisa5.png" style="max-width:100%; max-height:80%"/>
                                    </div>
                                 `;
        document.getElementById(divID).innerHTML = keywordBarContents;
        $('#maximizeSentimentBoxSpan').hide();
    }
}

function makeKeywordBarPlot(data, divID, nCutoff) {
    var colorVec = ['#83afd5', '#fbbe81', '#80c89c', '#be7cbf']
    var graphDiv = document.getElementById(divID);

    if (divID == "enlargedChart") {
        var divHeight = 550;
        var divWidth = 1250;
        document.getElementById(divID).innerHTML = "";
    }
    else {
        var divHeight = graphDiv.clientHeight;
        var divWidth = graphDiv.clientWidth;
    }
    var xPadding = 0.164 * divWidth;
    var yPadding = 10;
    var INNER_HEIGHT = divHeight - 2 * yPadding;
    var INNER_WIDTH = divWidth - 2 * xPadding;

    if (data.length != 0) {
        data.sort(function (a, b) { return b.tf_idf - a.tf_idf });
        dataSlice = data.slice(0, nCutoff)
        dataSlice.sort(function (a, b) { return a.tf_idf - b.tf_idf });

        var keywordBarContents = ``;
        document.getElementById(divID).innerHTML = keywordBarContents;


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
        var xAxisGrid = d3.axisBottom(xScale)
            .tickSize(-INNER_HEIGHT)
            .tickFormat('')
            .tickSizeOuter(0);

        var svg = d3.select("#" + divID).append("svg")
            .attr('class', function () { if (divID == 'enlargedChart') { return 'largeSVG' } else { return 'visSVG' } })
            .attr("width", "100%")
            .attr("height", "100%");

        var plot = svg.append('g')

        plot.append('g')
            .attr('class', 'x axis-grid')
            .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
            .call(xAxisGrid)
            .call(g => g.select('.domain').remove());

        plot.selectAll(".keywordBar")
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
                    var selectItem = $("#fold").val();

                    dataTableSearch(d.keyword);
                    if (selectItem == "company") {
                        document.getElementById('dataTableSearchCompany').scrollIntoView();
                    }
                    else if (selectItem == "subsidiary") {
                        document.getElementById('dataTableSearchSubsidiary').scrollIntoView();
                    }
                    else if (selectItem == "industry") {
                        document.getElementById('dataTableSearchIndustry').scrollIntoView();
                    }
                    else if (selectItem == "keyword") {
                        document.getElementById('dataTableSearchKeyword').scrollIntoView();
                    }


                    console.log(d.keyword);

                }
                else {
                    var selectItem = $("#fold").val();

                    dataTableSearch(d.keyword);
                    if (selectItem == "company") {
                        document.getElementById('dataTableSearchCompany').scrollIntoView();
                    }
                    else if (selectItem == "subsidiary") {
                        document.getElementById('dataTableSearchSubsidiary').scrollIntoView();
                    }
                    else if (selectItem == "industry") {
                        document.getElementById('dataTableSearchIndustry').scrollIntoView();
                    }
                    else if (selectItem == "keyword") {
                        document.getElementById('dataTableSearchKeyword').scrollIntoView();
                    }


                    console.log(d.keyword);
                }
            });

        var yAxis = plot.append('g')
            .attr('id', 'keywordYAxis')
            .attr("transform", "translate(" + xPadding + ",0)")
            .style('font-size', function () {
                if (nCutoff <= 20) {
                    return divHeight * 0.038 + 'px'
                }
                else {
                    return divHeight * 0.038 * 20 / nCutoff + 'px'
                }
            })
            .call(yAxis);

        var leftWidth = document.getElementById('keywordYAxis').getBoundingClientRect().width;
        plot.attr('transform', 'translate(' + (leftWidth / 4) + ',0)');

        if (divID == 'enlargedChart') {
            window.SVG = svg;
        }
        $('#maximizeKeywordBarSpan').show();
        $('#resetDiv').hide();
    }
    else {
        var keywordBarContents = `
                                    <div style="text-align:center;">
                                        <img src="/img/no_keyword4.png" style="max-width:100%; max-height:80%"/>
                                    </div>
                                 `;
        document.getElementById(divID).innerHTML = keywordBarContents;
        $('#maximizeKeywordBarSpan').hide();
    }



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

function makeCombinedGraph(sentimentData, articlesData, divID) {
    console.log(sentimentData);
    if (sentimentData.length != 0 && articlesData.length != 0) {
        console.log(sentimentData)
        console.log(articlesData)
        document.getElementById(divID).innerHTML = "";
        console.log(window.newsResponseData.selectedName);
        if (window.newsResponseData.selectedName != null) {
            document.getElementById('paramName').innerHTML = window.newsResponseData.selectedName;
        }

        var counts = {};
        for (var i = 0; i < articlesData.length; i++) {
            if (!counts[articlesData[i].newsDate]) {
                counts[articlesData[i].newsDate] = 0
            }
            counts[articlesData[i].newsDate]++;
        }
        sentimentData.sort(function (a, b) { return dateParser(b.date) - dateParser(a.date) });
        var articleCounts = []
        for (var i = 0; i < Object.keys(counts).length; i++) {
            articleCounts.push({ date: Object.keys(counts)[i], count: counts[Object.keys(counts)[i]] })
        }
        var dateArray = [];
        for (var i = sentimentData.length - 1; i > -1; i--) {
            dateArray.push(dateParser(sentimentData[i].date));
        }
        var graphDiv = document.getElementById(divID);
        sentimentData = sentimentData.filter((item) => item.mean > 0)
        console.log(sentimentData)



        if (divID == "enlargedChart") {
            var divHeight = 550;
            var divWidth = 1250;
            document.getElementById(divID).innerHTML = "";
        }
        else {
            var divHeight = graphDiv.clientHeight;
            var divWidth = graphDiv.clientWidth;
        }
        var xPadding = 65;
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

        var xScale = d3.scaleBand()
            .domain(dateArray)
            .range([xPadding, divWidth - xPadding])
            .padding(0.05);

        var gubun = $("#gubunNews").val()

        if (gubun == 'month') {
            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    return !((i + Math.floor(dateArray.length / 8)) % (Math.floor(dateArray.length / 4)))
                }))
                .ticks(5)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.timeFormat("%Y년%b%d일"))
        }
        else {
            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    if (gubun == 'quarter') {
                        return !((i + Math.floor(dateArray.length / 6)) % (Math.floor(dateArray.length / 3)))
                    }
                    else if (gubun == 'year')
                        return !((i + Math.floor(dateArray.length / 12)) % (Math.floor(dateArray.length / 6)))
                    else {
                        return !((i + Math.floor(dateArray.length / 16)) % (Math.floor(dateArray.length / 8)))
                    }
                }))
                .ticks(5)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.timeFormat("%Y년%b"))
        }




        var zoomBeh = d3.zoom()
            .extent([[xPadding, yPadding], [xPadding + INNER_WIDTH, yPadding + INNER_HEIGHT]])
            .scaleExtent([1, 500])
            .translateExtent([[xPadding, yPadding], [xPadding + INNER_WIDTH, yPadding + INNER_HEIGHT]])
            .on("zoom", zoom);

        var svg = d3.select("#" + divID).append("svg")
            .attr('class', function () { if (divID == 'enlargedChart') { return 'largeSVG' } else { return 'visSVG' } })
            .attr("width", "100%")
            .attr("height", "100%")
            .attr('pointer-events', 'all')

        if (divID == 'enlargedChart') {
            svg.call(zoomBeh);
        }



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
                .attr('pointer-events', 'all')
                .style('opacity', '40%')
                .on("mouseover", onMouseOver)
                .on("mousemove", onMouseMove)
                .on("mouseout", onMouseOut)
                .on('click', function (d) {
                    $('.layer_dimmed').removeClass('is_active');
                    $('.enlargedChartSettings').css("display", "none");
                    var selectItem = $("#fold").val();

                    dataTableSearch(d.date);
                    if (selectItem == "company") {
                        document.getElementById('dataTableSearchCompany').scrollIntoView();
                    }
                    else if (selectItem == "subsidiary") {
                        document.getElementById('dataTableSearchSubsidiary').scrollIntoView();
                    }
                    else if (selectItem == "industry") {
                        document.getElementById('dataTableSearchIndustry').scrollIntoView();
                    }
                    else if (selectItem == "keyword") {
                        document.getElementById('dataTableSearchKeyword').scrollIntoView();
                    }


                    console.log(d.date);
                });

            var sentPoints = clippedsvg.selectAll('.sentimentPointEnlarged')
                .data(sentimentData)
                .enter()
                .append('circle')
                .attr('class', 'sentimentPointEnlarged')
                .attr('cx', function (d, i) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
                .attr('cy', function (d, i) {
                    return ySentScale(d.mean)
                })
                .attr('r', 5)
                .attr('fill', '#990000')
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
                .attr('y1', function (d) { return ySentScale(d.mean) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                    }
                    return xScale(dateParser(sentimentData[i - 1].date)) + (xScale.bandwidth() / 2);
                })
                .attr('y2', function (d, i) {
                    if (i == 0) { return ySentScale(d.mean) }
                    return ySentScale(sentimentData[i - 1].mean);
                })
                .attr('stroke', '#990000')
                .attr('stroke-width', 3);



            var gX = svg.append('g')
                .attr('id', 'articlexAxis')
                .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
                .attr('clip-path', 'url(#articleClipEnlarged)')
                .call(xAxis);
        }
        else {
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
                .style('opacity', '40%')
                .on("mouseover", onMouseOver)
                .on("mousemove", onMouseMove)
                .on("mouseout", onMouseOut)
                .on('click', function (d) {
                    var selectItem = $("#fold").val();

                    dataTableSearch(d.date);
                    if (selectItem == "company") {
                        document.getElementById('dataTableSearchCompany').scrollIntoView();
                    }
                    else if (selectItem == "subsidiary") {
                        document.getElementById('dataTableSearchSubsidiary').scrollIntoView();
                    }
                    else if (selectItem == "industry") {
                        document.getElementById('dataTableSearchIndustry').scrollIntoView();
                    }
                    else if (selectItem == "keyword") {
                        document.getElementById('dataTableSearchKeyword').scrollIntoView();
                    }


                    console.log(d.date);
                });

            var sentPoints = clippedsvg.selectAll('.sentimentPoint')
                .data(sentimentData)
                .enter()
                .append('circle')
                .attr('class', 'sentimentPoint')
                .attr('cx', function (d, i) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
                .attr('cy', function (d, i) {
                    return ySentScale(d.mean)
                })
                .attr('r', 5)
                .attr('fill', 'black')
                .style('opacity', '0%')
                .on("mouseover", onMouseOver)
                .on("mousemove", onMouseMove)
                .on("mouseout", onMouseOut);


            /* var sentLines = clippedsvg.selectAll('.sentimentLine')
                .data(sentimentData)
                .enter()
                .append('line')
                .attr('class', 'sentimentLine')
                .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
                .attr('y1', function (d) { return ySentScale(d.mean) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                    }
                    return xScale(dateParser(sentimentData[i - 1].date)) + (xScale.bandwidth() / 2);
                })
                .attr('y2', function (d, i) {
                    if (i == 0) { return ySentScale(d.mean) }
                    return ySentScale(sentimentData[i - 1].mean);
                })
                .attr('stroke', '#990000')
                .attr('stroke-width', 1); */

            var sentLineMaker = d3.line()
                .curve(d3.curveMonotoneX)
                .x(function (d, i) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
                .y(function (d, i) {
                    return ySentScale(d.mean)
                })

            var sentLinePath = clippedsvg.append('svg:path')
                .attr('d', sentLineMaker(sentimentData))
                .attr('stroke', '#990000')
                .attr('stroke-width', 1)
                .attr('fill', 'none');



            var gX = svg.append('g')
                .attr('id', 'articlexAxis')
                .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
                .attr('clip-path', 'url(#articleClip)')
                .call(xAxis);
        }

        /* MAKE LEGEND */
        var legend = svg.append('g')
            .attr('transform', 'translate(' + divWidth / 2 + ',0)')
            .attr('id', 'combinedLegend')
            .attr('width', (divWidth / 2) + 'px')
            .attr('height', '30px');

        legend.append('line')
            .attr('x1', 0)
            .attr('x2', yPadding / 2)
            .attr('y1', 2 * yPadding / 3)
            .attr('y2', 2 * yPadding / 3)
            .attr('stroke', '#990000')
            .attr('stroke-width', 2);

        /* 범례에 있는 모양과 텍스트 사이의 거리: yPadding / 5 */
        legend.append('text')
            .attr('transform', 'translate(' + (yPadding / 2 + yPadding / 5) + ',' + (3 * yPadding / 4) + ")")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .style('font-size', '12px')
            .text('감성지수');

        var legendOffset = yPadding * 3
        legend.append('rect')
            .attr('x', legendOffset)
            .attr('y', yPadding / 2)
            .attr('height', yPadding / 3)
            .attr('width', yPadding / 3)
            .style('fill', '#ffa73b')
            .style('opacity', '50%')
        legend.append('text')
            .attr('transform', 'translate(' + (legendOffset + yPadding / 3 + yPadding / 5) + ',' + (3 * yPadding / 4) + ")")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .style('font-size', '12px')
            .text('기사수');

        var legendWidth = document.getElementById('combinedLegend').getBoundingClientRect().width;
        legend.attr('transform', 'translate(' + (divWidth - xPadding - legendWidth) + ',0)')

        function zoom() {
            xScale.range([xPadding, xPadding + INNER_WIDTH].map(d => d3.event.transform.applyX(d)))

            var inScope = xScale.domain().filter(function (d) {
                return xScale(d) > xPadding && xScale(d) < (INNER_WIDTH - xPadding)
            })
            console.log(inScope)

            gX.call(xAxis.scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    if (gubun == 'quarter') {
                        return !((i + Math.floor(articleCounts.length / 6)) % (Math.floor(articleCounts.length / 3)))
                    }
                    else if (gubun == 'year')
                        return !((i + Math.floor(articleCounts.length / 12)) % (Math.floor(articleCounts.length / 6)))
                    else {
                        return !((i + Math.floor(articleCounts.length / 16)) % (Math.floor(articleCounts.length / 8)))
                    }
                })))

            console.log(this);

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

        svg.attr('transform', 'translate(10,0)')

        if (divID == 'enlargedChart') {
            window.SVG = svg;
        }
        $('#maximizeCombinedSpan').show();
        $('#resetDiv').show();
    }
    else {
        var keywordBarContents = `
                                    <div style="text-align:center;">
                                        <img src="/img/no_gisa5.png" style="max-width:100%; max-height:80%"/>
                                    </div>
                                 `;
        document.getElementById(divID).innerHTML = keywordBarContents;
        $('#maximizeCombinedSpan').hide();
    }
}

function makeStockBarGraph(data, divID) {
    console.log(data)
    var company = document.getElementById('stockRange').value;
    console.log(company);



    stockData = [];
    for (var i = 0; i < data[company].length; i++) {
        stockData.push({ time: dateParser(data[company][i].date), stock: parseFloat(data[company][i].price) });
    }
    stockData.sort(function (a, b) { return a.date - b.date })

    var plotData = []
    var timeVector = [];
    var stockVector = [];
    for (var i = 0; i < stockData.length - 1; i++) {
        plotData.push({ time: stockData[i].time, stock1: stockData[i].stock, stock2: stockData[i + 1].stock })
        timeVector.push(stockData[i].time);
        stockVector.push(stockData[i].stock);
    }
    stockVector.push(stockData[stockData.length - 1].stock);

    if (stockData.length > 5) {
        var fiveDay = [];
        for (var i = 4; i < stockData.length - 1; i++) {
            var average = 0;
            for (var j = i - 4; j <= i; j++) {
                average += stockData[j].stock
            }
            average = average / 5;
            fiveDay.push({ time: stockData[i].time, average: average })
        }
    }
    if (stockData.length > 20) {
        var twentyDay = [];
        for (var i = 19; i < stockData.length - 1; i++) {
            var average = 0;
            for (var j = i - 19; j <= i; j++) {
                average += stockData[j].stock
            }
            average = average / 20;
            twentyDay.push({ time: stockData[i].time, average: average })
        }
    }


    var xPadding = 65;
    var yPadding = 25;
    var graphDiv = document.getElementById(divID);
    graphDiv.innerHTML = '';


    if (divID == 'enlargedChart') {
        var divHeight = 550;
        var divWidth = 1250;
    }
    else {
        var divHeight = graphDiv.offsetHeight;
        var divWidth = graphDiv.offsetWidth;
    }

    var INNER_HEIGHT = divHeight - 2 * yPadding;
    var INNER_WIDTH = divWidth - 2 * xPadding;

    var dataPadding = (d3.max(stockVector) - d3.min(stockVector)) / 10
    var yScale = d3.scaleLinear()
        .domain([d3.min(stockVector) - dataPadding, d3.max(stockVector) + dataPadding])
        .range([divHeight - yPadding, yPadding])
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSizeOuter(0);
    var yAxisGrid = d3.axisLeft(yScale)
        .tickSize(-INNER_WIDTH)
        .tickFormat('')
        .tickSizeOuter(0);

    var xScale = d3.scaleBand()
        .domain(timeVector)
        .range([xPadding, divWidth - xPadding])
        .padding(0.05);

    var gubun = $("#gubunNews").val()
    if (gubun == 'month') {
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .tickValues(xScale.domain().filter(function (d, i) {
                return !((i + Math.floor(stockData.length / 8)) % (Math.floor(stockData.length / 4)))
            }))
            .ticks(5)
            .tickPadding(5)
            .tickSizeOuter(0)
            .tickFormat(d3.timeFormat("%Y년%b%d일"))
    }
    else {
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .tickValues(xScale.domain().filter(function (d, i) {
                if (gubun == 'quarter') {
                    return !((i + Math.floor(stockData.length / 6)) % (Math.floor(stockData.length / 3)))
                }
                else if (gubun == 'year')
                    return !((i + Math.floor(stockData.length / 12)) % (Math.floor(stockData.length / 6)))
                else {
                    return !((i + Math.floor(stockData.length / 16)) % (Math.floor(stockData.length / 8)))
                }
            }))
            .ticks(5)
            .tickPadding(5)
            .tickSizeOuter(0)
            .tickFormat(d3.timeFormat("%Y년%b"))
    }


    var zoomBeh = d3.zoom()
        .extent([[xPadding, yPadding], [xPadding + INNER_WIDTH, yPadding + INNER_HEIGHT]])
        .scaleExtent([1, 500])
        .translateExtent([[xPadding, yPadding], [xPadding + INNER_WIDTH, yPadding + INNER_HEIGHT]])
        .on("zoom", zoom);

    var svg = d3.select("#" + divID).append("svg")
        .attr('class', function () { if (divID == 'enlargedChart') { return 'largeSVG' } else { return 'visSVG' } })
        .attr("width", "100%")
        .attr("height", "100%")
        .attr('pointer-events', 'all')


    if (divID == 'enlargedChart') {
        svg.call(zoomBeh);
    }

    svg.append('g')
        .attr('class', 'yAxis')
        .attr('id', 'stocksYAxis')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxis);
    svg.append('g')
        .attr('class', 'y axis-grid')
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxisGrid);

    if (divID == 'enlargedChart') {
        var clip = svg.append("defs").append("svg:clipPath")
            .attr('id', 'stockClipEnlarged')
            .append('svg:rect')
            .attr('width', 1250 - 2 * xPadding)
            .attr('height', 550)
            .attr('x', xPadding)
            .attr('y', 0);


        var gX = svg.append('g')
            .attr('class', 'xAxis')
            .attr('clip-path', 'url(#stockClipEnlarged)')
            .attr('id', 'stockXAxis')
            .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
            .call(xAxis);


    }
    else {
        var gX = svg.append('g')
            .attr('class', 'xAxis')
            .attr('id', 'stockXAxis')
            .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
            .call(xAxis);
    }

    var bars = svg.append('g')
        .attr('class', 'barchartarea')
        .attr('clip-path', function () {
            if (divID == 'enlargedChart') {
                return 'url(#stockClipEnlarged)';
            }
            else {
                return 'url(#stockClip)';
            }
        })
        .selectAll(".stockBar")
        .data(plotData)
        .enter().append('rect')
        .attr("class", function (d) {
            if (divID == 'enlargedChart') {
                return "stockBarEnlarged";
            }
            else {
                return "stockBar";
            }
        })
        .attr('x', function (d, i) {
            return xScale(d.time)
        })
        .attr('y', function (d, i) {
            return d3.min([yScale(d.stock1), yScale(d.stock2)])
        })
        .attr('width', function (d, i) {
            return xScale.bandwidth();
        })
        .attr('height', function (d, i) {
            if (yScale(d.stock1) == yScale(d.stock2)) {
                return 2;
            }
            else {
                return Math.abs(yScale(d.stock1) - yScale(d.stock2));
            }
        })
        .attr('fill', function (d, i) {
            if (d.stock1 < d.stock2) {
                return '#f14811'
            }
            else {
                return '#089ac9'
            }
        })
        .style('opacity', '100%')
        .on("mouseover", onMouseOver)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut);

    var sentLines = svg.append('g')
        .attr('class', 'barchartarea')
        .attr('clip-path', function () {
            if (divID == 'enlargedChart') {
                return 'url(#stockClipEnlarged)';
            }
            else {
                return 'url(#stockClip)';
            }
        })
        .selectAll('.sentimentLineEnlarged')
        .data(plotData)
        .enter()
        .append('line')
        .attr('class', 'sentimentLineEnlarged')
        .attr('x1', function (d) { return xScale(d.time) + (xScale.bandwidth() / 2); })
        .attr('y1', function (d, i) {
            if (yScale(d.stock1) == yScale(d.stock2)) {
                return yScale(d.stock1) - 2;
            }
            else {
                var diff = Math.abs(yScale(d.stock2) - yScale(d.stock1))
                return d3.max([d3.min([yScale(d.stock2), yScale(d.stock1)]) - diff / 4, yPadding]);
            }
        })
        .attr('x2', function (d, i) {
            return xScale(d.time) + (xScale.bandwidth() / 2);
        })
        .attr('y2', function (d, i) {
            if (yScale(d.stock1) == yScale(d.stock2)) {
                return yScale(d.stock1) + 2;
            }
            else {
                var diff = Math.abs(yScale(d.stock2) - yScale(d.stock1))
                return d3.min([d3.max([yScale(d.stock1), yScale(d.stock2)]) + diff / 4, divHeight - yPadding]);
            }
        })
        .attr('stroke', '#990000')
        .attr('stroke-width', 1);

    if (stockData.length > 5) {
        var fiveDayLine = svg.append('g')
            .attr('clip-path', function () {
                if (divID == 'enlargedChart') {
                    return 'url(#stockClipEnlarged)';
                }
                else {
                    return 'url(#stockClip)';
                }
            })
            .selectAll('.fiveDayLine')
            .data(fiveDay)
            .enter()
            .append('line')
            .attr("class", function (d) {
                if (divID == 'enlargedChart') {
                    return "fiveDayLineEnlarged";
                }
                else {
                    return "fiveDayLine";
                }
            })
            .attr('x1', function (d) { return xScale(d.time) + (xScale.bandwidth() / 2); })
            .attr('y1', function (d) { return yScale(d.average); })
            .attr('x2', function (d, i) {
                if (i == fiveDay.length - 1) {
                    return xScale(d.time) + (xScale.bandwidth() / 2)
                }
                else {
                    return xScale(fiveDay[i + 1].time) + (xScale.bandwidth() / 2);
                }
            })
            .attr('y2', function (d, i) {
                if (i == fiveDay.length - 1) { return yScale(d.average) }
                else {
                    return yScale(fiveDay[i + 1].average)
                }
            })
            .attr('stroke', '#990000')
            .attr('stroke-width', 1)
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);
    }

    if (stockData.length > 20) {
        var twentyDayLine = svg.append('g')
            .attr('clip-path', function () {
                if (divID == 'enlargedChart') {
                    return 'url(#stockClipEnlarged)';
                }
                else {
                    return 'url(#stockClip)';
                }
            })
            .selectAll('.twentyDayLine')
            .data(twentyDay)
            .enter()
            .append('line')
            .attr("class", function (d) {
                if (divID == 'enlargedChart') {
                    return "twentyDayLineEnlarged";
                }
                else {
                    return "twentyDayLine";
                }
            })
            .attr('x1', function (d) { return xScale(d.time) + (xScale.bandwidth() / 2); })
            .attr('y1', function (d) { return yScale(d.average); })
            .attr('x2', function (d, i) {
                if (i == twentyDay.length - 1) {
                    return xScale(d.time) + (xScale.bandwidth() / 2)
                }
                else {
                    return xScale(twentyDay[i + 1].time) + (xScale.bandwidth() / 2);
                }
            })
            .attr('y2', function (d, i) {
                if (i == twentyDay.length - 1) { return yScale(d.average) }
                else {
                    return yScale(twentyDay[i + 1].average)
                }
            })
            .attr('stroke', '#664be8')
            .attr('stroke-width', 1)
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);
    }

    svg.append('text')
        .attr('transform', 'translate(' + (divWidth / 2) + ',' + (3 * yPadding / 4) + ")")
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .text(company + ' 주가지수 추이');


    /* MAKE LEGEND */
    var legend = svg.append('g')
        .attr('transform', 'translate(' + divWidth / 2 + ',0)')
        .attr('id', 'stockBarLegend')
        .attr('width', (divWidth / 2) + 'px')
        .attr('height', '30px');

    legend.append('circle')
        .attr('transform', 'translate(0,' + yPadding / 3 + ')')
        .attr('r', yPadding / 4)
        .attr('cx', 0)
        .attr('cy', yPadding / 3)
        .attr('width', '100px')
        .style('fill', '#990000')
    legend.append('text')
        .attr('transform', 'translate(' + (yPadding / 4 + yPadding / 5) + ',' + (3 * yPadding / 4) + ")")
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'left')
        .style('font-size', '12px')
        .text('5일 이동평균');

    var legendOffset = yPadding * 4
    legend.append('circle')
        .attr('transform', 'translate(0,' + yPadding / 3 + ')')
        .attr('r', yPadding / 4)
        .attr('cx', legendOffset)
        .attr('cy', yPadding / 3)
        .attr('width', '100px')
        .style('fill', '#664be8')
    legend.append('text')
        .attr('transform', 'translate(' + (legendOffset + yPadding / 4 + yPadding / 5) + ',' + (3 * yPadding / 4) + ")")
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'left')
        .style('font-size', '12px')
        .text('20일 이동평균');


    var legendWidth = document.getElementById('stockBarLegend').getBoundingClientRect().width;
    legend.attr('transform', 'translate(' + (divWidth - xPadding - legendWidth) + ',0)')


    function zoom() {
        console.log('zooming')
        xScale.range([xPadding, xPadding + INNER_WIDTH].map(d => d3.event.transform.applyX(d)))
        gX.call(xAxis.scale(xScale))

        bars.data(plotData)
            .attr('x', function (d) {
                return xScale(d.time)
            })
            .attr('width', function (d, i) {
                return xScale.bandwidth();
            })
        sentLines.data(plotData)
            .attr('x1', function (d) { return xScale(d.time) + (xScale.bandwidth() / 2); })
            .attr('x2', function (d, i) {
                return xScale(d.time) + (xScale.bandwidth() / 2);
            })
        if (stockData.length > 5) {
            fiveDayLine.data(fiveDay)
                .attr('x1', function (d) { return xScale(d.time) + (xScale.bandwidth() / 2); })
                .attr('x2', function (d, i) {
                    if (i == fiveDay.length - 1) {
                        return xScale(d.time) + (xScale.bandwidth() / 2)
                    }
                    else {
                        return xScale(fiveDay[i + 1].time) + (xScale.bandwidth() / 2);
                    }
                })
        }
        if (stockData.length > 20) {
            twentyDayLine.data(twentyDay)
                .attr('x1', function (d) { return xScale(d.time) + (xScale.bandwidth() / 2); })
                .attr('x2', function (d, i) {
                    if (i == twentyDay.length - 1) {
                        return xScale(d.time) + (xScale.bandwidth() / 2)
                    }
                    else {
                        return xScale(twentyDay[i + 1].time) + (xScale.bandwidth() / 2);
                    }
                })
        }
    }

    if (divID == 'enlargedChart') {
        window.SVG = svg;
    }
    svg.attr('transform', 'translate(10,0)')
}

function makeLineGraph(data, divID) {
    var type = $("#chartFold").val();
    var scope = $("#fold").val();
    if (data.length != 0) {
        console.log(data)
        document.getElementById(divID).innerHTML = "";
        console.log(window.newsResponseData.selectedName);
        if (window.newsResponseData.selectedName != null) {
            document.getElementById('paramName').innerHTML = window.newsResponseData.selectedName;
        }

        data.sort(function (a, b) { return dateParser(b.date) - dateParser(a.date) });

        var dateArray = [];
        var valueArray = [];
        var toPlot = [];
        for (var i = data.length - 1; i > -1; i--) {
            dateArray.push(dateParser(data[i].date));
            if (data[i].value != 'na') {
                if (type == 'grade' || type == 'grade2') {
                    if (scope == 'industry') {
                        valueArray.push(Number(data[i].value.slice(-1)));
                        toPlot.push({ date: data[i].date, value: Number(data[i].value.slice(-1)) })
                    }
                    else {
                        valueArray.push(data[i].value);
                        toPlot.push({ date: data[i].date, value: data[i].value })
                    }
                }
                else {
                    valueArray.push(Number(data[i].value));
                    toPlot.push({ date: data[i].date, value: Number(data[i].value) })
                }
            }
        }
        var graphDiv = document.getElementById(divID);
        console.log(data)



        if (divID == "enlargedChart") {
            var divHeight = 550;
            var divWidth = 1250;
            document.getElementById(divID).innerHTML = "";
        }
        else {
            var divHeight = graphDiv.clientHeight;
            var divWidth = graphDiv.clientWidth;
        }
        var xPadding = 65;
        var yPadding = 25;
        var INNER_HEIGHT = divHeight - 2 * yPadding;
        var INNER_WIDTH = divWidth - 2 * xPadding;
        var dataRange = d3.max([d3.max(valueArray) - d3.min(valueArray), valueArray[0]]);
        if (type == 'grade') {
            if (scope == 'industry') {
                var yScale = d3.scaleLinear()
                    .domain([1, 6])
                    .range([divHeight - yPadding, yPadding])
                var yAxis = d3.axisLeft(yScale)
                    .scale(yScale)
                    .ticks(6)
                    .tickFormat((d) => 'A-IRO' + d)
                    .tickSizeOuter(0);
            }
            else {
                var domain = ['E01', 'E02', 'E03', 'E04', 'E05', 'E06', 'E07', 'E08', 'E09', 'E10', 'E11', 'E12']
                var range = Array(domain.length).fill().map((e, i) => divHeight - yPadding - INNER_HEIGHT / (domain.length - 1) * i);
                var yScale = d3.scaleOrdinal()
                    .domain(domain)
                    .range(range)
                var yAxis = d3.axisLeft(yScale)
                    .scale(yScale)
                    .tickSizeOuter(0);
                for (var i = 0; i < domain.length; i++) {
                    console.log(domain[i])
                    console.log(yScale(domain[i]))
                }
            }
        }
        else if (type == 'grade2') {
            var domain = ['D', 'C', 'CC', 'CCC', 'B-', 'B', 'B+', 'BB-', 'BB', 'BB+', 'BBB-', 'BBB', 'BBB+', 'A-', 'A', 'A+', 'AA-', 'AA', 'AA+', 'AAA'];
            var range = Array(domain.length).fill().map((e, i) => divHeight - yPadding - INNER_HEIGHT / (domain.length - 1) * i);
            var yScale = d3.scaleOrdinal()
                .domain(domain)
                .range(range)
            var yAxis = d3.axisLeft(yScale)
                .scale(yScale)
                .tickSizeOuter(0);
            for (var i = 0; i < domain.length; i++) {
                console.log(domain[i])
                console.log(yScale(domain[i]))
            }
        }
        else if (type == 'sales') {
            var yScale = d3.scaleLinear()
                .domain([d3.min(valueArray) - 0.1 * dataRange, d3.max(valueArray) + 0.1 * dataRange])
                .range([divHeight - yPadding, yPadding])
            var yAxis = d3.axisLeft(yScale)
                .scale(yScale)
                .tickFormat(function (d) {
                    if (d >= 10000) {
                        return String((d / 10000).toFixed(1) + '조')
                    }
                    else {
                        return d;
                    }
                })
                .ticks(5)
                .tickSizeOuter(0);
        }
        else {
            var yScale = d3.scaleLinear()
                .domain([d3.min(valueArray) - 0.1 * dataRange, d3.max(valueArray) + 0.1 * dataRange])
                .range([divHeight - yPadding, yPadding])
            var yAxis = d3.axisLeft(yScale)
                .scale(yScale)
                .ticks(5)
                .tickSizeOuter(0);
        }


        var yAxisGrid = d3.axisLeft(yScale)
            .tickSize(-INNER_WIDTH)
            .ticks(6)
            .tickFormat('')
            .tickSizeOuter(0);

        var xScale = d3.scaleBand()
            .domain(dateArray)
            .range([xPadding, divWidth - xPadding])
            .padding(0.05);

        var gubun = $("#gubunNews").val()

        if (gubun == 'month') {
            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    return !((i + Math.floor(dateArray.length / 8)) % (Math.floor(dateArray.length / 4)))
                }))
                .ticks(5)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.timeFormat("%Y년%b%d일"))
        }
        else {
            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    if (gubun == 'quarter') {
                        return !((i + Math.floor(dateArray.length / 6)) % (Math.floor(dateArray.length / 3)))
                    }
                    else if (gubun == 'year')
                        return !((i + Math.floor(dateArray.length / 12)) % (Math.floor(dateArray.length / 6)))
                    else {
                        return !((i + Math.floor(dateArray.length / 16)) % (Math.floor(dateArray.length / 8)))
                    }
                }))
                .ticks(5)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.timeFormat("%Y년%b"))
        }
        var zoomBeh = d3.zoom()
            .extent([[xPadding, yPadding], [xPadding + INNER_WIDTH, yPadding + INNER_HEIGHT]])
            .scaleExtent([1, 500])
            .translateExtent([[xPadding, yPadding], [xPadding + INNER_WIDTH, yPadding + INNER_HEIGHT]])
            .on("zoom", zoom);

        var svg = d3.select("#" + divID).append("svg")
            .attr('class', function () { if (divID == 'enlargedChart') { return 'largeSVG' } else { return 'visSVG' } })
            .attr("width", "100%")
            .attr("height", "100%")
            .attr('pointer-events', 'all')

        if (divID == 'enlargedChart') {
            svg.call(zoomBeh);
        }

        svg.append('g')
            .attr("transform", "translate(" + xPadding + ",0)")
            .attr('id', 'linegraphYAxis')
            .call(yAxis);

        svg.append('g')
            .attr('class', 'y axis-grid')
            .attr("transform", "translate(" + xPadding + ",0)")
            .call(yAxisGrid);

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

            var sentLines = clippedsvg.selectAll('.sentimentLineEnlarged')
                .data(toPlot)
                .enter()
                .append('line')
                .attr('class', 'sentimentLineEnlarged')
                .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
                .attr('y1', function (d) { return yScale(d.value) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                    }
                    return xScale(dateParser(toPlot[i - 1].date)) + (xScale.bandwidth() / 2);
                })
                .attr('y2', function (d, i) {
                    if (i == 0) { return yScale(d.value) }
                    return yScale(toPlot[i - 1].value);
                })
                .attr('stroke', '#2266a5')
                .attr('stroke-width', 2);

            var sentPoints = clippedsvg.selectAll('.linePointEnlarged')
                .data(toPlot)
                .enter()
                .append('circle')
                .attr('class', 'linePointEnlarged')
                .attr('cx', function (d, i) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
                .attr('cy', function (d, i) {
                    return yScale(d.value)
                })
                .attr('r', 3)
                .attr('fill', 'black')
                .style('opacity', '100%')
                .on("mouseover", onMouseOver)
                .on("mousemove", onMouseMove)
                .on("mouseout", onMouseOut);



            var gX = svg.append('g')
                .attr('id', 'articlexAxis')
                .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
                .attr('clip-path', 'url(#articleClipEnlarged)')
                .call(xAxis);
        }
        else {
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


            var sentLines = clippedsvg.selectAll('.sentimentLine')
                .data(toPlot)
                .enter()
                .append('line')
                .attr('class', 'sentimentLine')
                .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
                .attr('y1', function (d) { return yScale(d.value) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                    }
                    return xScale(dateParser(toPlot[i - 1].date)) + (xScale.bandwidth() / 2);
                })
                .attr('y2', function (d, i) {
                    if (i == 0) { return yScale(d.value) }
                    return yScale(toPlot[i - 1].value);
                })
                .attr('stroke', '#2266a5')
                .attr('stroke-width', 1);

            /*     var sentLineMaker = d3.line()
                .curve(d3.curveLinear)
                .x(function (d, i) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
                .y(function (d, i) {
                    /* if (i == 0) { return yScale(d.mean) }
                    return yScale(data[i - 1].mean); 
                    console.log(d.value)
                    console.log(yScale(d.value))
                    return yScale(d.value)
                })



            var sentLinePath = clippedsvg.append('svg:path')
                .attr('d', sentLineMaker(toPlot))
                .attr('stroke', '#2266a5')
                .attr('stroke-width', 1)
                .attr('fill', 'none'); */


            var sentPoints = clippedsvg.selectAll('.linePoint')
                .data(toPlot)
                .enter()
                .append('circle')
                .attr('class', 'linePoint')
                .attr('cx', function (d, i) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
                .attr('cy', function (d, i) {
                    console.log(d.value)
                    console.log(yScale(d.value))
                    return yScale(d.value)
                })
                .attr('r', 2)
                .attr('fill', 'black')
                .style('opacity', '100%')
                .on("mouseover", onMouseOver)
                .on("mousemove", onMouseMove)
                .on("mouseout", onMouseOut);


            var gX = svg.append('g')
                .attr('id', 'articlexAxis')
                .attr("transform", "translate(0," + (divHeight - yPadding) + ")")
                .attr('clip-path', 'url(#articleClip)')
                .call(xAxis);
        }

        /* MAKE LEGEND */

        var yAxisWidth = document.getElementById('linegraphYAxis').getBoundingClientRect().width;

        var legend = svg.append('g')
            .attr('width', (divWidth / 2) + 'px')
            .attr('height', '30px')
            .attr('id', 'lineLegend');

        legend.append('line')
            .attr('x1', 0)
            .attr('x2', yPadding / 2)
            .attr('y1', 2 * yPadding / 3)
            .attr('y2', 2 * yPadding / 3)
            .attr('stroke', '#2266a5')
            .attr('stroke-width', 2);

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -divHeight / 2)
            .attr('y', xPadding - yAxisWidth)
            .attr('dy', '-0.5em')
            .text(function () {
                if (type == 'credit') {
                    return '신용공여점수'
                }
                else if (type == 'sales') {
                    return '매출액'
                }
                else if (type == 'grade') {
                    return '등급'
                }
                else if (type == 'grade2') {
                    return '신용평가등급'
                }
            });

        legend.append('text')
            .attr('transform', 'translate(' + (yPadding / 1.6) + ',' + (3 * yPadding / 4) + ")")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .style('font-size', '12px')
            .text(function () {
                if (type == 'credit') {
                    return '신용공여점수'
                }
                else if (type == 'sales') {
                    return '매출액 (억원)'
                }
                else if (type == 'grade') {
                    return '등급'
                }
                else if (type == 'grade2') {
                    return '신용평가등급'
                }
            });

        var legendWidth = document.getElementById('lineLegend').getBoundingClientRect().width;


        legend.attr('transform', 'translate(' + (divWidth - xPadding - legendWidth) + ',0)')

        function zoom() {
            xScale.range([xPadding, xPadding + INNER_WIDTH].map(d => d3.event.transform.applyX(d)))

            var inScope = xScale.domain().filter(function (d) {
                return xScale(d) > xPadding && xScale(d) < (INNER_WIDTH - xPadding)
            })
            console.log(inScope)

            gX.call(xAxis.scale(xScale)
                .tickValues(xScale.domain().filter(function (d, i) {
                    if (gubun == 'quarter') {
                        return !((i + Math.floor(dateArray.length / 6)) % (Math.floor(dateArray.length / 3)))
                    }
                    else if (gubun == 'year')
                        return !((i + Math.floor(dateArray.length / 12)) % (Math.floor(dateArray.length / 6)))
                    else {
                        return !((i + Math.floor(dateArray.length / 16)) % (Math.floor(dateArray.length / 8)))
                    }
                })))

            console.log(this);

            svg.selectAll(".sentimentLine")
                .attr('x1', function (d) { return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2) })
                .attr('x2', function (d, i) {
                    if (i == 0) {
                        return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                    }
                    return xScale(dateParser(toPlot[i - 1].date)) + (xScale.bandwidth() / 2);
                })
            svg.selectAll(".sentimentPoint")
                .attr("cx", function (d) {
                    return xScale(dateParser(d.date)) + (xScale.bandwidth() / 2)
                })
        }
        svg.attr('transform', 'translate(10,0)')

        if (divID == 'enlargedChart') {
            window.SVG = svg;
        }
        $('#maximizeCombinedSpan').show();
        $('#resetDiv').show();
    }
    else {
        var keywordBarContents = `
                                    <div style="text-align:center;">
                                        <img src="/img/no_gisa5.png" style="max-width:100%; max-height:80%"/>
                                    </div>
                                 `;
        document.getElementById(divID).innerHTML = keywordBarContents;
        $('#maximizeCombinedSpan').hide();
    }
}

var tooltip = d3.select('.main_panel')
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
        tooltipEnlarged.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
            + '월' + date.getDate() + '일') + '<br />주가: ' + d.stock)
        tooltipEnlarged.style('background-color', '#f0f0f0');
    }
    else if (elementClass == 'stockBar') {
        var date = new Date(d.time)
        d3.select(this).style('opacity', '100%');
        tooltip.style('visibility', 'visible');
        tooltip.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
            + '월' + date.getDate() + '일') + '<br />주가: ' + d.stock1)
        tooltip.style('background-color', '#f0f0f0');
    }
    else if (elementClass == 'stockBarEnlarged') {
        var date = new Date(d.time)
        d3.select(this).style('opacity', '100%');
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
            + '월' + date.getDate() + '일') + '<br />주가: ' + d.stock1)
        tooltipEnlarged.style('background-color', '#f0f0f0');
    }
    else if (elementClass.includes('DayLine')) {
        var date = new Date(d.time)
        d3.select(this).style('opacity', '100%');
        if (elementClass.includes('Enlarged')) {
            tooltipEnlarged.style('visibility', 'visible');
            tooltipEnlarged.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
                + '월' + date.getDate() + '일') + '<br />평균: ' + d.average)
            tooltipEnlarged.style('background-color', '#f0f0f0');
        }
        else {
            tooltip.style('visibility', 'visible');
            tooltip.html('날짜: ' + (date.getFullYear() + '년' + (date.getMonth() + 1)
                + '월' + date.getDate() + '일') + '<br />평균: ' + d.average)
            tooltip.style('background-color', '#f0f0f0');
        }

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
        // tooltip.text(d.keyword + ': ' + d.tf_idf);
        tooltip.text(d.keyword);
    }
    else if (elementClass == 'keywordBarEnlarged') {
        d3.select(this).style('opacity', '70%');
        tooltipEnlarged.style('visibility', 'visible');
        // tooltipEnlarged.text(d.keyword + ': ' + d.tf_idf);
        tooltipEnlarged.text(d.keyword);
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
            .style('font-weight', 700)
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
        tooltip.text(d.date + ': ' + d.mean);
    }
    else if (elementClass == 'sentimentPointEnlarged') {
        console.log('in sent point enlarged')
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text(d.date + ': ' + d.mean);
    }
    else if (elementClass.includes('iqrBox')) {
        if (elementClass == 'iqrBox upper') {
            d3.select(this).style('fill', '#820812')
            d3.select(this).style('opacity', '100%');
        }
        else {
            d3.select(this).style('opacity', '100%');
        }
        tooltip.style('visibility', 'visible');
        tooltip.text(d.date + ': ' + d.mean);
    }
    else if (elementClass == 'linePoint') {
        d3.select(this).style('opacity', '60%');
        tooltip.style('visibility', 'visible');
        tooltip.text(d.date + ': ' + d.value);
    }
    else if (elementClass == 'linePoint') {
        d3.select(this).style('opacity', '60%');
        tooltipEnlarged.style('visibility', 'visible');
        tooltipEnlarged.text(d.date + ': ' + d.value);
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
    else if (elementClass == 'stockBar') {
        d3.select(this).style('opacity', '100%');
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'stockBarEnlarged') {
        d3.select(this).style('opacity', '100%');
        tooltipEnlarged.style('visibility', 'hidden');
    }
    else if (elementClass.includes('DayLine')) {
        d3.select(this).style('opacity', '100%');
        if (elementClass.includes('Enlarged')) {
            tooltipEnlarged.style('visibility', 'hidden');
        }
        else {
            tooltip.style('visibility', 'hidden');
        }

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
            .style('font-size', this.style.fontSize / 1.1)
            .style('font-weight', 400);
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
    else if (elementClass.includes('iqrBox')) {
        if (elementClass == 'iqrBox upper') {
            d3.select(this).style('fill', 'red')
            d3.select(this).style('opacity', '40%');
        }
        else {
            d3.select(this).style('opacity', '40%');
        }
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'linePoint') {
        d3.select(this).style('opacity', '100%');
        tooltip.style('visibility', 'hidden');
    }
    else if (elementClass == 'linePoint') {
        d3.select(this).style('opacity', '100%');
        tooltipEnlarged.style('visibility', 'hidden');
    }
    else {
        d3.select(this).style('fill', 'black');
        tooltip.style('visibility', 'hidden');
        tooltipEnlarged.style('visibility', 'hidden');

    }
}

function drawWordcloud(words, divID) {
    $('#resetDiv').hide();
    var graphDiv = document.getElementById(divID);

    var maxValue = Math.max.apply(Math, words.map(function (o) { return o.tf_idf }));
    console.log(maxValue)
    var wordSlice = [];
    for (var i = 0; i < document.getElementById('textNumberSlider').value; i++) {
        wordSlice.push({ text: words[i].keyword, value: words[i].tf_idf });
    }
    var xPadding = 20;
    var yPadding = 20;


    if (divID == "enlargedChart") {
        var divHeight = 550;
        var divWidth = 1250;
        document.getElementById(divID).innerHTML = "";
    }
    else {
        var divHeight = graphDiv.clientHeight;
        var divWidth = graphDiv.clientWidth;
    }
    document.getElementById(divID).innerHTML = "";
    var layout = d3.layout.cloud()
        .size([divWidth - 2 * xPadding, divHeight - 2 * yPadding])
        .words(wordSlice)
        .padding(document.getElementById('paddingSlider').value)
        .rotate(0)
        /* .rotate(function () { return ~~(Math.random() * 2) * 90; }) */
        .fontSize(function (d) {
            return Math.sqrt(d.value / maxValue) *
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
            .attr('class', function () { if (divID == 'enlargedChart') { return 'largeSVG' } else { return 'visSVG' } })
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
            .on('click', function (d) {
                if (divID == 'enlargedChart') {
                    $('.layer_dimmed').removeClass('is_active');
                    $('.enlargedChartSettings').css("display", "none");
                    var selectItem = $("#fold").val();

                    dataTableSearch(d.text);
                    if (selectItem == "company") {
                        document.getElementById('dataTableSearchCompany').scrollIntoView();
                    }
                    else if (selectItem == "subsidiary") {
                        document.getElementById('dataTableSearchSubsidiary').scrollIntoView();
                    }
                    else if (selectItem == "industry") {
                        document.getElementById('dataTableSearchIndustry').scrollIntoView();
                    }
                    else if (selectItem == "keyword") {
                        document.getElementById('dataTableSearchKeyword').scrollIntoView();
                    }


                    console.log(d.text);

                }
                else {
                    var selectItem = $("#fold").val();

                    dataTableSearch(d.text);
                    if (selectItem == "company") {
                        document.getElementById('dataTableSearchCompany').scrollIntoView();
                    }
                    else if (selectItem == "subsidiary") {
                        document.getElementById('dataTableSearchSubsidiary').scrollIntoView();
                    }
                    else if (selectItem == "industry") {
                        document.getElementById('dataTableSearchIndustry').scrollIntoView();
                    }
                    else if (selectItem == "keyword") {
                        document.getElementById('dataTableSearchKeyword').scrollIntoView();
                    }


                    console.log(d.text);
                }
            })
            .transition()
            .style("font-size", function (d) {
                return Math.sqrt(d.value / maxValue) *
                    document.getElementById('fontSizeSlider').value + "px";
            })
            .duration(500);
        if (divID == 'enlargedChart') {
            window.SVG = svg;
        }
    }
}

function getChartQuery(queryInput, queryType) {
    console.log('##########RUNNING CHART QUERY' + queryType)
    console.log(queryInput)
    d3.selectAll('.visSVG').remove();
    document.getElementById('chartFold').innerHTML = ""


    document.getElementById('keywordBarSlider').value = 10;
    document.getElementById('fontSizeSlider').value = 27;
    document.getElementById('textNumberSlider').value = 50;

    console.log(document.getElementById('keywordBarSlider').value)
    document.getElementById('keywordMaxValueBar').innerHTML = document.getElementById('keywordBarSlider').value;
    // var search_company = document.getElementById('search_company_news').value;
    //console.log(search_company);
    document.getElementById('chartModal').innerHTML = modalhtml4;
    var data;
    var selectedName;
    $('#chartModal').show();
    if (queryType == 3) {
        data = parameters();
        data.gubunJaName = $("#fold").val();
        data.selectedName = queryInput;
        selectedName = queryInput;
        console.log(data)
    }
    else if (queryType == 4) {
        selectedName = queryInput.selectedName;
        data = queryInput;
        data.searchWord = selectedName;
    }
    console.log(data)

    $.ajax({
        url: "/getChartQueryByCondition",
        method: 'POST',
        data: data,
        dataType: 'json',
        success: function (responseData) {
            var qType = $("#fold").val();
            console.log(qType)
            if (qType != 'company') {
                document.getElementById('chartFold').innerHTML = `
                <option value="stock">주가</option>
                <option value="credit">신용공여</option>
                <option value="sales">매출액</option>
                <option value="grade">등급</option>`
            }
            else {
                document.getElementById('chartFold').innerHTML = `
                <option value="stock">주가</option>
                <option value="credit">신용공여</option>
                <option value="sales">매출액</option>
                <option value="grade">등급</option>
                <option value="grade2">신용평가등급</option>`
            }

            console.log(responseData)
            var tempcreditData = [];
            for (var i = 1; i < 10; i++) {
                tempcreditData.push({ date: '2020-0' + i + '-01', value: 3 * i + 10 });
            }
            var tempsalesData = [];
            for (var i = 1; i < 10; i++) {
                tempsalesData.push({ date: '2020-0' + i + '-01', value: 3 * i * (-1) ^ i + 10 });
            }
            var tempgradeData = [];
            var ranks = ['E01', 'E02', 'E03', 'E04', 'E05', 'E06', 'E07', 'E08', 'E09', 'E10', 'E11', 'E12'];
            for (var i = 1; i < 10; i++) {
                tempgradeData.push({ date: '2020-0' + i + '-01', value: ranks[i] });
            }
            tempgrade2Data = [];
            var ranks = ['D', 'C', 'CC', 'CCC', 'B-', 'B', 'B+', 'BB-', 'BB', 'A-', 'A', 'A+', 'AA-', 'AA', 'AA+', 'AAA']
            for (var i = 1; i < 10; i++) {
                tempgrade2Data.push({ date: '2020-0' + i + '-01', value: ranks[i] });
            }
            sentimentDates = [];
            for (var i = 0; i < responseData.sentimentDates.length; i++) {
                sentimentDates.push(responseData.sentimentDates[i].date)
            }
            stockDates = [];
            for (var i = 0; i < responseData.stockData.length; i++) {
                stockDates.push(responseData.stockData[i].date)
            }
            creditDates = [];
            for (var i = 0; i < responseData.creditData.length; i++) {
                creditDates.push(responseData.creditData[i].date)
            }
            salesDates = [];
            for (var i = 0; i < responseData.salesData.length; i++) {
                salesDates.push(responseData.salesData[i].date)
            }
            gradeDates = [];
            for (var i = 0; i < responseData.gradeData.length; i++) {
                gradeDates.push(responseData.gradeData[i].date)
            }
            grade2Dates = [];
            for (var i = 0; i < responseData.grade2Data.length; i++) {
                grade2Dates.push(responseData.grade2Data[i].date)
            }


            allDates = stockDates.concat(sentimentDates.filter((item) => stockDates.indexOf(item) < 0))
            allDates = allDates.concat(creditDates.filter((item) => allDates.indexOf(item) < 0))
            allDates = allDates.concat(salesDates.filter((item) => allDates.indexOf(item) < 0))
            allDates = allDates.concat(gradeDates.filter((item) => allDates.indexOf(item) < 0))
            allDates = [...new Set(allDates)]

            console.log(allDates.length);
            console.log(sentimentDates)
            console.log(stockDates)
            var creditData = [];
            var salesData = [];
            var gradeData = [];
            var grade2Data = [];
            var sentimentData = [];
            for (var i = 0; i < allDates.length; i++) { //Build sentimentData, creditData, salesData, and gradeData
                /* console.log(sentimentDates
                        .indexOf(allDates[i])) */
                if (creditDates.includes(allDates[i])) {
                    var j = creditDates.indexOf(allDates[i]);
                    creditData.push({ date: responseData.creditData[j].date, value: responseData.creditData[j].value })
                }
                else { creditData.push({ date: allDates[i], value: 'na' }) }

                if (salesDates.includes(allDates[i])) {
                    var j = salesDates.indexOf(allDates[i]);
                    salesData.push({ date: responseData.salesData[j].date, value: responseData.salesData[j].value })
                }
                else { salesData.push({ date: allDates[i], value: 'na' }) }

                if (gradeDates.includes(allDates[i])) {
                    var j = gradeDates.indexOf(allDates[i]);
                    gradeData.push({ date: responseData.gradeData[j].date, value: responseData.gradeData[j].value })
                }
                else { gradeData.push({ date: allDates[i], value: 'na' }) }

                if (grade2Dates.includes(allDates[i])) {
                    var j = grade2Dates.indexOf(allDates[i]);
                    grade2Data.push({ date: responseData.grade2Data[j].date, value: responseData.grade2Data[j].value })
                }
                else { grade2Data.push({ date: allDates[i], value: 'na' }) }

                if (sentimentDates.includes(allDates[i])) {
                    var j = sentimentDates.indexOf(allDates[i]);

                    var tempDate = responseData.sentimentDates[j].date;
                    var tempMean = responseData.sentimentDates[j].mean;
                    var tempMin = responseData.sentimentDates[j].min;
                    var tempLower = responseData.sentimentDates[j].lower;
                    var tempMedian = responseData.sentimentDates[j].median;
                    var tempUpper = responseData.sentimentDates[j].upper;
                    var tempMax = responseData.sentimentDates[j].max;

                    if ((tempUpper - tempLower) < 10) {
                        if (tempUpper >= 95) {
                            tempUpper = 100;
                            tempLower = 90;
                            tempMax = 100;
                            tempMin = tempLower - ((tempMedian - tempLower) * (0.2 + Math.random() * 0.70))
                        }
                        else if (tempLower <= 5) {
                            tempLower = 0;
                            tempUpper = 10;
                            tempMin = 0;
                            tempMax = tempUpper + ((tempUpper - tempMedian) * (0.2 + Math.random() * 0.70))
                        }
                        else {
                            tempLower = d3.max([tempMedian - (5 + Math.random() * 5), 0]);
                            tempUpper = d3.min([tempMedian + (5 + Math.random() * 5), 100]);
                            tempMin = d3.max([tempLower - ((tempMedian - tempLower) * (Math.random())), 0])
                            tempMax = d3.min([tempUpper + ((tempUpper - tempMedian) * (Math.random())), 100])
                        }
                    }

                    sentimentData.push({
                        date: tempDate,
                        mean: tempMean,
                        min: tempMin,
                        lower: tempLower,
                        median: tempMedian,
                        upper: tempUpper,
                        max: tempMax
                    })
                }
                else {
                    sentimentData.push({
                        date: allDates[i],
                        mean: 0,
                        min: 0,
                        lower: 0,
                        median: 0,
                        upper: 0,
                        max: 0
                    })
                }
            }

            console.log(sentimentData);



            if (responseData.stockData.length > 0) {
                console.log('test')
            }
            var companies = [];
            var allStockData = {};

            console.log("스톡 길이 :  " + responseData.stockData.length);
            for (var i = 0; i < responseData.stockData.length; i++) {
                var tempStock = responseData.stockData[i]
                if (!companies.includes(tempStock.company)) {
                    companies.push(tempStock.company);
                    allStockData[tempStock.company] = [];
                }
                allStockData[tempStock.company].push({ date: tempStock.date, price: tempStock.price })
            }
            console.log("스톡데이터");
            console.log(allStockData)

            responseData['allStockData'] = allStockData;
            window.newsChartData = responseData;

            document.getElementById('stockRange').innerHTML = '';
            var stockOptions = document.getElementById('stockRange');
            if (responseData.stockData.length != 0) {
                var stockContents = ``;
                document.getElementById('stockTime').innerHTML = stockContents;
                var shortestCompany = companies.reduce(function (a, b) {
                    return a.length <= b.length ? a : b;
                })

                console.log("스톡옵션");
                console.log(stockOptions);
                for (var i = 0; i < companies.length; i++) {
                    if (companies[i] == selectedName) {
                        var tempHTML = `<option value='${companies[i]}' selected>${companies[i]}</option>`;
                    }
                    else {
                        var tempHTML = `<option value='${companies[i]}'>${companies[i]}</option>`;
                    }
                    stockOptions.insertAdjacentHTML('beforeend', tempHTML);
                }

                document.getElementById('maximizeStock').addEventListener('click', function () {
                    var selectItem = $("#chartFold").val();
                    console.log(selectItem)
                    if (selectItem == 'stock') {
                        document.getElementById('resetChart').addEventListener('click', function () {
                            makeStockBarGraph(window.newsChartData.allStockData, 'enlargedChart');
                        })
                        makeStockBarGraph(window.newsChartData.allStockData, 'enlargedChart');
                    }
                    else if (selectItem == 'credit') {
                        document.getElementById('resetChart').addEventListener('click', function () {
                            makeLineGraph(window.newsChartData.creditData, 'enlargedChart');
                        })
                        makeLineGraph(window.newsChartData.creditData, 'enlargedChart');
                    }
                    else if (selectItem == 'sales') {
                        document.getElementById('resetChart').addEventListener('click', function () {
                            makeLineGraph(window.newsChartData.salesData, 'enlargedChart');
                        })
                        makeLineGraph(window.newsChartData.salesData, 'enlargedChart');
                    }
                    else if (selectItem == 'grade') {
                        document.getElementById('resetChart').addEventListener('click', function () {
                            makeLineGraph(window.newsChartData.gradeData, 'enlargedChart');
                        })
                        makeLineGraph(window.newsChartData.gradeData, 'enlargedChart');
                    }
                    else if (selectItem == 'grade2') {
                        console.log(window.newsChartData.grade2Data)
                        document.getElementById('resetChart').addEventListener('click', function () {
                            makeLineGraph(window.newsChartData.grade2Data, 'enlargedChart');
                        })
                        makeLineGraph(window.newsChartData.grade2Data, 'enlargedChart');
                    }

                })
                document.getElementById('stockRange').addEventListener('change', function () {
                    makeStockBarGraph(window.newsChartData.allStockData, 'stockTime');
                })

                makeStockBarGraph(window.newsChartData.allStockData, 'stockTime');
                $('#maximizeStockSpan').show();
                $('#resetDiv').show();
            }
            else {
                var stockContents = `
                                        <div style="text-align:center;">
                                            <img src="/img/no_gisa5.png" style="max-width:100%; max-height:80%"/>
                                        </div>
                                    `;
                document.getElementById('stockTime').innerHTML = stockContents;
                $('#maximizeStockSpan').hide();
            }

            makeGauge('dangerGauge', responseData.averageScore)
            document.getElementById('maximizeGauge').addEventListener('click', function () {
                //console.log('clicked');
                makeGauge('enlargedChart', responseData.averageScore);
            })

            makeCombinedGraph(sentimentData, responseData.allNews, 'articleCounts');
            document.getElementById('maximizeCombined').addEventListener('click', function () {
                document.getElementById('resetChart').addEventListener('click', function () {
                    makeCombinedGraph(sentimentData, responseData.allNews, 'enlargedChart');
                })
                //console.log('clicked');
                makeCombinedGraph(sentimentData, responseData.allNews, 'enlargedChart');
            })
            // document.getElementById('articleCountRange').addEventListener('change', function () {
            //     makeCombinedGraph(responseData.sentimentDates, responseData.allNews, 'articleCounts');
            // })

            makeKeywordBarPlot(responseData.keywords, 'keywordBar', document.getElementById('keywordBarSlider').value)
            document.getElementById('maximizeKeywordBar').addEventListener('click', function () {
                $('.layer_dimmed').addClass('is_active');
                document.getElementById('keywordBarSettings').style.display = 'inline';
                makeKeywordBarPlot(responseData.keywords, 'enlargedChart', document.getElementById('keywordBarSlider').value)
            })


            makeSentimentBoxPlot(sentimentData, 'sentimentBoxPlot');
            document.getElementById('maximizeSentimentBox').addEventListener('click', function () {
                console.log('clicked');
                makeSentimentBoxPlot(sentimentData, 'enlargedChart');
            })

            makeWordcloud(responseData.keywords);




            window.newsChartData = {
                keywords: responseData.keywords, averageScore: responseData.averageScore, sentimentData: sentimentData,
                allNews: responseData.allNews, allStockData: allStockData, creditData: creditData, salesData: salesData,
                gradeData: gradeData, grade2Data: grade2Data
            };


            $('#chartModal').hide();
            window.scrollTo(0, 0);
        },
        error: function () {
            alert('조회 실패');
        }
    });
}

function makeWordcloud(data) {
    if (data.length > 0) {
        $('#maximizeWordCloudSpan').show();
        $('#resetDiv').hide();
        var words = data.sort(function (a, b) { return b.tf_idf - a.tf_idf });
        var paddingSlide = document.getElementById('paddingSlider')
        document.getElementById('paddingValue').innerHTML = paddingSlide.value;
        paddingSlide.onchange = function () {
            document.getElementById('paddingValue').innerHTML = paddingSlide.value;
            drawWordcloud(words, 'enlargedChart');
        }

        var fontSizeSlide = document.getElementById('fontSizeSlider')
        document.getElementById('fontSizeValue').innerHTML = fontSizeSlide.value;
        fontSizeSlide.onchange = function () {
            document.getElementById('fontSizeValue').innerHTML = fontSizeSlide.value;
            drawWordcloud(words, 'enlargedChart');
        }

        var textNumberSlide = document.getElementById('textNumberSlider')
        document.getElementById('textMaxValue').innerHTML = textNumberSlide.value;
        textNumberSlide.onchange = function () {
            document.getElementById('textMaxValue').innerHTML = textNumberSlide.value;
            drawWordcloud(words, 'enlargedChart');
        }

        wordCloud = document.getElementById('maximizeWordCloud')
        wordCloud.addEventListener('click', () => clickFunction(), false);

        async function clickFunction() {
            document.getElementById('wordCloudSettings').style.display = 'inline';
            drawWordcloud(words, 'enlargedChart');
        }

        async function f() {
            drawWordcloud(words, 'wordCloud');
        }

        drawWordcloud(words, 'wordCloud')
    } else {
        var keywordBarContents = `
                                    <div style="text-align:center;">
                                        <img src="/img/no_cloud2.png" style="max-width:100%; max-height:80%"/>
                                    </div>
                                 `;
        document.getElementById('wordCloud').innerHTML = keywordBarContents;
        $('#maximizeWordCloudSpan').hide();
    }

}