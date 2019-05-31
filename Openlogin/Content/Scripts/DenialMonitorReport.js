var $j = jQuery.noConflict();

Highcharts.theme = { colors: ["#4572A7"] }; // prevent errors in default theme
var highchartsOptions = Highcharts.getOptions();

Highcharts.setOptions
({
    credits:
    {
        enabled: false
    },

    chart:
    {
        backgroundColor: "#F5F5F5"
    }
});

var theme = "openit";

//get parameters provided
var country;
var server;
var type;
var features;
var featurelabel;
var startdate;
var endend;
var timedensity;
var timedensity1;
var topelements;
var parameters;
var faveFeature;
var sortmethod;

$j(document).ready(function () {

    //Methods
    jQuery.extend({
        loadjqwFeatures: function (features) {
            var source = [{ value: "[Application].[Application Name].Children", label: "All" }];
            $j.each(features, function (index, value) {
                var item = {};
                item["value"] = value.ParameterValue;
                item["label"] = value.ParameterLabel;

                source.push(item);
            });
            //create featutures
            $j("#jqxfeatures").jqxComboBox({
                checkboxes: true,
                source: source,
                width: "160px",
                height: "20px",
                animationType: "none"
            });


            if (faveFeature !== null && faveFeature !== "") {
                $j.each(faveFeature, function (index, paramData) {
                    var items = $j("#jqxfeatures").jqxComboBox("getItemByValue", paramData);
                    $j("#jqxfeatures").jqxComboBox("checkIndex", items.index);
                });
            }
        },

        loadjqwProducts: function (objectId, products, type) {
            $j("#" + objectId).append(new Option("All", "[Application].[" + type + "].[All]"));
            $j.each(products, function (key, value) {
                $j("#" + objectId).append(new Option(value.ParameterLabel, value.ParameterValue));
            });
            if ($j("#" + objectId + "Selected").val() !== "") {
                $j("#" + objectId).val($j("#" + objectId + "Selected").val());
            }
        },

        getParameter: function (requester, param) {
            $j("#" + requester).html("");

            $j.post("/DenialMonitor/Reports/getParameter.htm", { 'requester': requester, 'param': param }, function (data) {

                var features = [];
                $j.each(data, function (index, paramData) {
                    features.push(paramData);
                });

                if (requester === "Features") {
                    $j.loadjqwFeatures(features);
                }

                if (requester === "Server") {
                    $j.loadjqwProducts("Server", features, "Product");
                }
            }, "json");

        },

        deniedDiv: function () {

            parameters = { 'country': country, 'type': type, 'server': server, 'features': "[Application].[Application Name].[All]", 'startdate': startdate, 'endend': endend, 'timedensity': timedensity, 'topelements': topelements, callback: "?" }

            $j.post("/DenialMonitor/Reports/getDenied.htm", parameters, function (data) {

                if (data.length > 0) {
                    var options =
                    {
                        chart: {
                            renderTo: "denialDiv",
                            defaultSeriesType: "column"
                        },
                        title: {
                            text: "Features with denied " + timedensity1 + " values: " + server
                        },
                        xAxis: {
                            title: { text: "Features" },
                            categories: []

                        },
                        yAxis: {
                            title: {
                                text: "# Denied " + timedensity + "s"
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return "<b>Feature: </b>" + this.x + "<br/><b>Denied  " + timedensity + "s: </b>" + this.y;
                            }
                        },

                        plotOptions: {
                            series: {
                                colorByPoint: true,
                                cursor: "pointer",
                                events: {
                                    click: function (e) {

                                        var featureSelected = e.point.category;

                                        $j("#jqxfeatures").jqxComboBox("uncheckAll");
                                        var items = $j("#jqxfeatures").jqxComboBox("getItems");
                                        var item;


                                        $j.each(items, function (index, citem) {
                                            if (citem.label === featureSelected) {
                                                item = citem;
                                            }
                                        });

                                        $j("#jqxfeatures").jqxComboBox("checkItem", item);

                                        country = $j("#Country").val();
                                        type = $j("#Type").val();
                                        server = $j("#Server").val();
                                        features = $j.getFeatures();
                                        startdate = $j("#StartDate").val();
                                        endend = $j("#EndDate").val();
                                        timedensity = $j("#TimeDensity").val();
                                        timedensity1 = $j("#TimeDensity :selected").text();
                                        topelements = $j("#TopElements").val();
                                        if (features.length > 0) {
                                            $j.AvailableInUseDiv();
                                            $j.DenialHistory();
                                        }
                                    }
                                }

                            }
                        },
                        legend: { enabled: false },

                        series: []
                    }

                    var series = { data: [] };
                    series.name = "Features";
                    $j.each(data, function (index, paramData) {
                        series.data.push(paramData.yValue);
                        options.xAxis.categories.push(paramData.xValue);

                    });

                    options.series.push(series);

                    var chart = new Highcharts.Chart(options);
                } else {
                    $j.noDataDiv($j("#denialDiv"));
                }
            }, "json");

        },

        PieDiv: function () {

            //get parameters provided
            country = $j("#Country").val();
            server = $j("#Server").val();
            startdate = $j("#StartDate").val();
            endend = $j("#EndDate").val();
            timedensity = $j("#TimeDensity").val();
            topelements = $j("#TopElements").val();
            sortmethod = $j("#sortMethod").val();

            parameters = { 'country': country, 'type': type, 'server': server, 'startdate': startdate, 'endend': endend, 'timedensity': timedensity, 'topelements': topelements, 'sortmethod': sortmethod, callback: "?" }

            $j.post("/DenialMonitor/OpenPie/MaxUsedServer.htm", parameters, function (data) {
                var options =
                {
                    chart: {
                        renderTo: "MaxUsedServer",
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: server
                    },
                    tooltip: {
                        pointFormat: "{series.name}: <b>{point.percentage}%</b>",
                        percentageDecimals: 2
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: "pointer",
                            dataLabels: {
                                formatter: function () {
                                    return "<b>" + this.point.name + "</b>: " + this.percentage.toFixed(2) + " %";
                                },
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: []
                }

                random = Math.ceil(Math.random() * 10);
                var series = { data: [] };
                series.type = "pie";
                series.name = sortmethod + " Features";

                $j.each(data, function (index, paramData) {
                    var s;
                    if (random === index) {
                        s = {
                            name: paramData.xValue,
                            y: paramData.yValue,
                            sliced: true,
                            selected: true
                        };
                    } else
                        s = [paramData.xValue, paramData.yValue];

                    series.data.push(s);
                });

                options.series.push(series);


                var chart = new Highcharts.Chart(options);
            }, "json");


        },

        AvailableInUseDiv: function () {

            parameters = { 'country': country, 'type': type, 'server': server, 'features': features, 'startdate': startdate, 'endend': endend, 'timedensity': timedensity, 'topelements': topelements, callback: "?" }
            $j.post("/DenialMonitor/Reports/getAvailableInUse.htm", parameters, function (data) {
                if (data.length > 0) {


                    var historyChart = new Highcharts.StockChart({
                        chart: {
                            renderTo: "AvailableInUseDiv",
                            alignTicks: true,
                            height: 400

                        },
                        rangeSelector: {
                            buttons: [
                                {
                                    type: "week",
                                    count: 1,
                                    text: "W"
                                },
                                {
                                    type: "month",
                                    count: 1,
                                    text: "M"
                                },
                                {
                                    type: "month",
                                    count: 3,
                                    text: "Q"
                                },
                                {
                                    type: "year",
                                    count: 1,
                                    text: "Y"
                                },
                                {
                                    type: "all",
                                    text: "All"
                                }
                            ],
                            selected: 1,
                            inputEnabled: false
                        },
                        title: {
                            text: server
                        },
                        subtitle: {
                            text: featurelabel
                        },
                        xAxis: {
                            maxZoom: 7 * 24 * 3600000
                        },
                        tooltip: {
                            yDecimals: 2
                        },
                        plotOptions: {
                            series: {
                                cursor: "pointer",
                                events:
                                {
                                    click: function (e) {
                                        // Log to console

                                        $j.getUserInfo(e.point.x, country, type, server, features, "Max In Use");
                                    }
                                },
                                dataGrouping:
                                {
                                    enabled: false
                                }

                            }
                        },

                        series: data
                    });

                } else {
                    $j.noDataDiv($j("#AvailableInUseDiv"));
                }
            }, "json");
         
        },

        DenialHistory: function () {


            parameters = { 'country': country, 'type': type, 'server': server, 'features': features, 'startdate': startdate, 'endend': endend, 'timedensity': timedensity, 'topelements': topelements, callback: "?" }


            $j.post("/DenialMonitor/Reports/getDenialHistory.htm", parameters, function (data) {

                if (data.length > 0) {
              
                    var historyChart = new Highcharts.StockChart({
                        chart: {
                            renderTo: "deniedDailyDiv",
                            alignTicks: true,
                            height: 400

                        },
                        rangeSelector: {
                            buttons: [
                                {
                                    type: "week",
                                    count: 1,
                                    text: "W"
                                },
                                {
                                    type: "month",
                                    count: 1,
                                    text: "M"
                                },
                                {
                                    type: "month",
                                    count: 3,
                                    text: "Q"
                                },
                                {
                                    type: "year",
                                    count: 1,
                                    text: "Y"
                                },
                                {
                                    type: "all",
                                    text: "All"
                                }
                            ],
                            selected: 1,
                            inputEnabled: false
                        },
                        title: {
                            text: server
                        },
                        subtitle: {
                            text: featurelabel
                        },
                        xAxis: {
                            maxZoom: 7 * 24 * 3600000
                        },
                        tooltip: {
                            yDecimals: 2
                        },

                        plotOptions: {
                            series: {
                                cursor: "pointer",
                                events: {
                                    click: function (e) {
                                        // Log to console
                                        $j.getUserInfo(e.point.x, country, type, server, features, "Denials");

                                    },
                                    dataGrouping:
                                    {
                                        enabled: false
                                    }
                                }
                            }
                        },


                        series: data
                    });
                } else {
                    $j.noDataDiv($j("#deniedDailyDiv"));
                }
            }, "json");

        },

        getFeatures: function () {
            var arr = [];
            var labels = [];
            var checkedItems = $j("#jqxfeatures").jqxComboBox("getCheckedItems");

            if (checkedItems === null) return arr;

            if (checkedItems.length > 0) {
                $j.each(checkedItems, function (index, object) {
                    if (object.value === "[Application].[Application Name].Children") {
                        arr.push(object.value);
                        labels.push("All");
                        return false;
                    } else
                        arr.push(object.value);
                    labels.push(object.label);
                });
            }
            featurelabel = labels;
            return arr;
        },

        getUserInfo: function (epoch, country, type, server, features, dimension) {
            var userparam = { 'dimension': dimension, 'country': country, 'epoch': epoch, 'type': type, 'server': server, 'features': features }


            $j.post("/DenialMonitor/Reports/getUsers.htm", userparam, function (data) {

                // $j.createUserPopUp(epoch, server, features, data);
                $this = $j.popupDiv().append($j.createUserPopUp(epoch, server, features, data, dimension));
                //  $this.append($j.createUserPopUp(epoch, server, features, data));

            }, "json");

        },

        createHashDiv: function () {
            var s4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return $j(document.createElement("div"))
                .attr("id", "popup_" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
        },

        popupDiv: function () {
            var popupDiv = $j.createHashDiv();
            $j("#subcontents").append(popupDiv);
            $j(popupDiv).dialog({
                minWidth: 450, /*minWidth: 1024,*/
                height: 350,
                modal: true,
                close: function (event, ui) {
                    $j(popupDiv).remove();
                }
            });
            return popupDiv;
        },

        createUserPopUp: function (epoch, server, features, data, dimension) {
            var uhead = $j(document.createElement("th"))
                .text("UserName");

            var dhead = $j(document.createElement("th"))
                .text(dimension);

            var rhead = $j(document.createElement("tr"))
                .append(uhead)
                .append(dhead);


            var thead = $j(document.createElement("thead"))
                .append(rhead);

            var userTable = $j(document.createElement("table"))
                .addClass("userTable")
                .append(thead);


            var tr;

            $j.each(data, function (index, paramData) {

                var utd = $j(document.createElement("td"))
                    .text(paramData.xValue);
                var dtd = $j(document.createElement("td"))
                    .text(paramData.yValue);

                tr = $j(document.createElement("tr"))
                    .append(utd)
                    .append(dtd);
                userTable.append(tr);

            });


            var date = $j.datepicker.formatDate("M dd, yy", new Date(epoch));
            var tr1 = $j(document.createElement("tr"))
                .append($j(document.createElement("td")).text("Server:").addClass("tdlevel"))
                .append($j(document.createElement("td")).text(server).addClass("tdval"));


            var tr2 = $j(document.createElement("tr"))
                .append($j(document.createElement("td")).text("Date:").addClass("tdlevel"))
                .append($j(document.createElement("td")).text(date).addClass("tdval"));


            var tTable = $j(document.createElement("table"))
                .addClass("userServerTable")
                .append(tr1)
                .append(tr2);

            var userInnerDiv = $j(document.createElement("div"))
                .addClass("userInnerDiv")
                .append(userTable);

            var userServer = $j(document.createElement("div"))
                .addClass("userServer")
                .append(tTable);

            var userOuterDiv = $j(document.createElement("div"))
                .addClass("userOuterDiv")
                .append(userServer)
                .append(userServer)
                .append(userInnerDiv)


            // $j.popupDiv().append(userOuterDiv);
            return userOuterDiv;

        },

        noDataDiv: function (parentDiv) {

            parentDiv.empty();

            var noDataDiv = $j(document.createElement("div"))
                .addClass("NoDataDiv")
                .text("No Data Received");

            parentDiv.append(noDataDiv);
        },

        loadParams: function () {
            $j.getParameter("Server", [$j("#Country").val()]);
            $j.getParameter("Features", ["[Application].[Product].[All]"]);
        }

    });


    //-------------------------

    $j("#DeniedDaily").hide();
    $j("#MaxInUseMaxAvailable").hide();
    $j("#DenialHistory").hide();
    $j("#PieReports").hide();


    //cascade other dropdowns when parent dropdown value has changed
    $j("#Country").change(function () {
        $j.getParameter("Server", [$j("#Type").val(), $j("#Country").val()]);
        $j.getParameter("Features", [$j("#Type").val(), $j("#Country").val()]);
    });

    $j("#Type").change(function () {
        $j.getParameter("Server", [$j("#Type").val(), $j("#Country").val()]);
        $j.getParameter("Features", [$j("#Type").val(), "[Application].[Product].[All]"]);
    });

    $j("#Server").change(function () {
        $j.getParameter("Features", [$j("#Country").val(), $j("#Server").val()]);
    });

    $j("#jqxfeatures").bind("checkChange", function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item != undefined) {
                var checked = item.checked;
                if (item.label === "All" && checked === true) {
                    $j("#jqxfeatures").jqxComboBox("checkAll");
                } else if (item.label === "All" && checked === false) {
                    $j("#jqxfeatures").jqxComboBox("uncheckAll");
                }
            }
        }
    });

    $j("#submitFilter").click(function () {
        country = $j("#Country").val();
        type = $j("#Type").val();
        server = $j("#Server").val();
        features = $j.getFeatures();
        startdate = $j("#StartDate").val();
        endend = $j("#EndDate").val();
        timedensity = $j("#TimeDensity").val();
        timedensity1 = $j("#TimeDensity :selected").text();
        topelements = $j("#TopElements").val();

        features = features.length > 0 ? features : "[Application].[Application Name].Children";

        $j("#deniedDailyAnchor").text("Denied " + timedensity1);
        $j("#DeniedDaily").show();
        $j("#MaxInUseMaxAvailable").show();
        $j("#DenialHistory").show();

        $j.deniedDiv();
        $j.AvailableInUseDiv();
        $j.DenialHistory();

    });

    $j("#PiesubmitFilter").click(function () {
        $j("#PieReports").show();
        $j.PieDiv();
    });

    //Spinner
    $j("#loading").bind("ajaxSend", function () {
        $j(this).show();
    }).bind("ajaxStop", function () {
        $j(this).hide();
    }).bind("ajaxError", function () {
        $j(this).hide();
    });


});