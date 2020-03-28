var $j = jQuery.noConflict();

Highcharts.theme = { colors: ['#4572A7'] }; // prevent errors in default theme
var highchartsOptions = Highcharts.getOptions();

Highcharts.setOptions({
    credits: {
        enabled: false
    }
});



$j(document).ready(function () {

    var viewValue = "";
    var currValue = null;
    var filteredItems = new Object();
    var toggleValue = 0;
    var searchValue = -1;
    var subFilters = $j('#lm-subfilters');
    var filterProducts = $j('#div-filter-products');
    var filterFeatures = $j('#div-filter-features');
    var filterUsers = $j('#div-filter-users');

    function changeContent() {

        filteredItems = new Object();
        $j('#results').empty();
        $j('#productsList').empty();
        $j('#featuresList').empty();
        $j('#usersList').empty()
        $j('#products').val("");
        $j('#features').val("");
        $j('#users').val("");
        $j('#breadcrumb').empty();
        viewValue = $j('#primaryView').val();
        $j('#breadcrumb').append('<ul><li><a href="/LicenseMonitor/index.htm">Home</a></li><li>' + viewValue + '</li></ul>');
        currValue = null;
        var selectedItem = null;

        $j('#current_view').empty();
        $j('#current_view').append(viewValue);

        // Show filters only when the user selected a primary view
        $j('.filters-menu').attr('style', 'display: block;');
        subFilters.addClass('hidden');

        if (viewValue == 'Product') {
            filterProducts.removeClass('hidden');
            filterFeatures.addClass('hidden');
            filterUsers.addClass('hidden');
            $j('#primary-filter').append(filterProducts);
            $j('#productsFilter').removeAttr('multiple');
            $j('#filter-products').addClass('active');
            $j('#filter-features').removeAttr('class');
            $j('#filter-users').removeAttr('class');
            $j('#products').focus();
            selectedItem = $j('#productsFilter').val();
            $j.getRecentCheckouts(20);

        } else if (viewValue == 'Feature Name') {
            filterProducts.addClass('hidden');
            filterFeatures.removeClass('hidden');
            filterUsers.addClass('hidden');
            $j('#primary-filter').append(filterFeatures);
            $j('#featuresFilter').removeAttr('multiple');
            $j('#filter-features').addClass('active');
            $j('#filter-products').removeAttr('class');
            $j('#filter-users').removeAttr('class');
            $j('#features').focus();
            selectedItem = $j('#featuresFilter').val();

            $j.getMaxUtilization(20);
        } else if (viewValue == 'User') {
            filterProducts.addClass('hidden');
            filterFeatures.addClass('hidden');
            filterUsers.removeClass('hidden');
            $j('#primary-filter').append(filterUsers);
            $j("#usersFilter").removeAttr("multiple")
            $j("#filter-users").addClass("active");
            $j("#filter-products").removeAttr("class");
            $j("#filter-features").removeAttr("class");
            $j('#users').focus();
            selectedItem = $j("#usersFilter").val();

            $j('#results').empty();
            $j.getMaxUsers(20);


        } else {

            $j.getRecentCheckouts(10);
            $j.getMaxUtilization(10);
            $j.getMaxUsers(10);
            searchValue = -1;
            // Hide the filters when primary view not in use
            $j('.filters-menu', '#lm-filternavigation').attr('style', 'display: none;');

        }

        if (currValue != selectedItem) {
            currValue = selectedItem;
            $j.serverSide();

        }

    }


    $j("#primaryView").change(function () {
        changeContent();
    }
  );

    jQuery.extend({
        alterTablesorter: function (divName) {
            $j(".tl_" + divName + " table.thirdlayer.tablesorter").tablesorter({
                textExtraction: {
                    2: function (node) {
                        var cell_value = $j(node).text();
                        var sort_value = $j(node).find("div").attr('title');
                        return (sort_value != undefined) ? sort_value : cell_value;
                    }
                }
            });

        },

        getSelectedItem: function () {

            if (viewValue == "Product") {
                selectedItem = $j('#productsFilter').val();
            } else if (viewValue == "Feature Name") {
                selectedItem = $j('#featuresFilter').val();
            } else if (viewValue == "User") {
                selectedItem = $j('#usersFilter').val();
            }

            if (currValue != selectedItem) {
                currValue = selectedItem;
                $j.serverSide();


            }



        },

        showFilters: function () {

            subFilters.removeClass('hidden');
            if (viewValue == 'Product') {
                filterFeatures.removeClass('hidden');
                filterUsers.removeClass('hidden');
                subFilters.append(filterFeatures);
                subFilters.append(filterUsers);
            } else if (viewValue == 'Feature Name') {
                filterProducts.removeClass('hidden');
                filterUsers.removeClass('hidden');
                subFilters.append(filterProducts);
                subFilters.append(filterUsers);
            } else if (viewValue == 'User') {
                filterProducts.removeClass('hidden');
                filterFeatures.removeClass('hidden');
                subFilters.append(filterProducts);
                subFilters.append(filterFeatures);
            }



        },

        checkoutData: function (data) {

            var rawcoDT = (data.CheckoutTime).split('T');
            var currdate = new Date().getTime();
            var coDReform = rawcoDT[0].replace(/-/g, '/'); 					//needed for IE browsers
            var checkoutDT = new Date(coDReform + ' ' + rawcoDT[1] + ' +00'); //needed for IE browsers
            var coFullDate = checkoutDT.getFullYear() + '-' + $j.padnumber(checkoutDT.getMonth() + 1) + '-' + $j.padnumber(checkoutDT.getDate());
            var coTime = $j.padnumber(checkoutDT.getHours()) + ':' + $j.padnumber(checkoutDT.getMinutes()) + ':' + $j.padnumber(checkoutDT.getSeconds());
            var codate = Date.parse(checkoutDT);
            var diff = currdate - codate;
            var timesinceCO = '';
            var timesince = $j(document.createElement('div'));



            if (diff > 1000) {
                if (Math.floor(diff / 86400000) > 0) {
                    //					if(Math.floor(diff / 86400000) > 1)
                    timesinceCO = Math.floor(diff / 86400000) + 'd';
                    //					else
                    //						timesinceCO = '1d';
                    if ((Math.floor((diff % 86400000) / 3600000) > 0) || (Math.floor((diff % 3600000) / 60000) > 0)) {
                        timesinceCO = timesinceCO + ', ';
                    }
                }
                if (Math.floor((diff % 86400000) / 3600000) > 0) {
                    //					if(Math.floor(diff / 86400000) > 1)
                    timesinceCO = timesinceCO + Math.floor((diff % 86400000) / 3600000) + 'h';
                    //					else 
                    //						timesinceCO=timesinceCO + '1h';
                    if (Math.floor((diff % 3600000) / 60000) > 0) {
                        timesinceCO = timesinceCO + ', ';
                    }
                }
                if (Math.floor((diff % 3600000) / 60000) > 0) {
                    //					if(Math.floor(diff / 86400000) > 1)
                    timesinceCO = timesinceCO + Math.floor((diff % 3600000) / 60000) + 'm';
                    //					else
                    //						timesinceCO = timesinceCO + '1 minute';
                }
            }
            else 'Just now.';

            timesince.text(timesinceCO)
				.attr('title', coFullDate + " " + coTime);



            return timesince;


        },

        addSlashes: function (str) {
            str = str.replace(/\\/g, '\\\\');
            str = str.replace(/\'/g, '\\\'');
            str = str.replace(/\"/g, '\\"');
            str = str.replace(/\0/g, '\\0');
            return str;
        },

        padnumber: function (num) {
            if (num < 10) return ('0' + num);
            else return num;
        },

        userBadge: function (data) {
            var userBadge = $j(document.createElement('div'))
				.attr('id', 'userbadge')
				.tooltip({
				    bodyHandler: function () {
				        return '' +
						'<dl>' +
						'<dt class="username">' + data.UserName + '</dt>' +
						'<div class="userdata">' +
						'<dd><label>Full name:</label> ' + data.FullName + '</dd>' +
						'<dd><label>E-mail:</label> ' + data.Email + '</dd>' +
						'<dd><label>Title:</label> ' + data.Title + '</dd>' +
						'<dd><label>Division:</label> ' + data.Division + '</dd>' +
						'<dd><label>Location:</label> ' + data.Location + '</dd></div>' +
						'</dl>';
				    }
				});

            return userBadge.prepend('<img src="/Content/Icons/id_card16.png" border="0">');
        },

        createHashDiv: function () {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };

            return $j(document.createElement('div'))
				.attr('id', 'popup_' + S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
        },

        popupDiv: function () {
            var popupDiv = $j.createHashDiv();

            $j('#subcontents').append(popupDiv);
            $j(popupDiv).dialog({
                minWidth: 960,     /*minWidth: 1024,*/
                modal: true,
                close: function (event, ui) {
                    $j(popupDiv).remove();
                }
            });
            return popupDiv;
        },

        historyDiv: function (product, feature) {

            historyDiv = $j.createHashDiv()
				.append('<div id="chart" />')
				.appendTo('#subcontents');

            $j.getJSON('/licensemonitor/getHistory.htm', { 'product': product, 'feature': feature, callback: '?' }, function (data) {
                var historyChart = new Highcharts.StockChart({
                    chart: {
                        renderTo: 'chart',
                        alignTicks: true,
                        height: 400

                    },
                    rangeSelector: {
                        buttons: [{
                            type: 'week',
                            count: 1,
                            text: 'W'
                        },
						{
						    type: 'month',
						    count: 1,
						    text: 'M'
						},
						{
						    type: 'month',
						    count: 3,
						    text: 'Q'
						},
						{
						    type: 'year',
						    count: 1,
						    text: 'Y'
						},
						{
						    type: 'all',
						    text: 'All'
						}],
                        selected: 1,
                        inputEnabled: false
                    },
                    title: {
                        text: feature
                    },
                    subtitle: {
                        text: product
                    },
                    xAxis: {
                        maxZoom: 7 * 24 * 3600000
                    },
                    tooltip: {
                        yDecimals: 2
                    },
                    series: data
                });
            });


            historyDiv.dialog({
                width: 798,     /*minWidth: 1024,*/
                height: 448,
                minWidth: 400,
                minHeight: 250,
                modal: true,
                resizable: false,
                close: function (event, ui) {
                    historyDiv.remove();
                }
            });


        },

        escapeIllegalCharacter: function (itemName) {
            var divId = itemName.replace(/([?\\#;&,.+*~\':"!^$[\]()=>|\/\ ])/g, '\\$1');

            return divId;
        },

        toSafeName: function (itemName) {
            var safeName = itemName.replace(/[,]/g, '-_')
				.replace(/[;]/g, '_-')
				.toLowerCase()
				.replace(/[^a-z0-9-_]/g, '__');

            return safeName;
        },

        clearerDiv: function () {
            var clearer = $j(document.createElement('div'))
				.addClass('clearer');

            return clearer;
        },

        //===== USER VIEW =================================
        getUserView: function (itemValue, outputDiv) {
            $j.ajaxSetup({ cache: false });
            $j.getJSON('/licensemonitor/getUserView.htm', { 'type': 'Users', 'item': itemValue }, function (data) {

                var userDiv;
                var productDiv;

                var divId = $j.toSafeName(data.UserName);

                var firstLayerLabel = $j(document.createElement('div'))
					.addClass("firstlayerlabel")
					.text(data.UserName);

                // Check if user's data exists
                if (data.FullName != null && data.FullName != '') {
                    firstLayerLabel.append($j.userBadge(data));
                }

                var firstLayer = $j(document.createElement('div'))
					.addClass("firstlayer")
					.attr("id", divId)
					.append(firstLayerLabel);

                var userView = $j(document.createElement('div'))
					.addClass('userview')
					.attr('id', 'userview-' + data.UserName)
					.append(firstLayer);

                $j(outputDiv).append(userView);

                $j.each(data.ProductsList, function (index, product) {

                    // alert(data.UserName + "---" + product.ProductName);

                    var safeName = $j.toSafeName(product.ProductName + '-' + data.UserName);
                    var secondLayerLabel = $j(document.createElement('a'))
						.addClass('secondlayerlabel')
						.attr('id', safeName)
						.text(product.ProductName);
                    var divClass = $j.toSafeName(data.UserName + product.ProductName);

                    var productLabel = $j.toSafeName(product.ProductName)

                    var secondLayer = $j(document.createElement('div'))
						.addClass('secondlayer')
						.addClass(divClass)
						.addClass(product.Mapping)
						.addClass(productLabel)
						.append(secondLayerLabel)
						.append($j.clearerDiv());

                    $j('#' + divId).append($j(secondLayer));

                    var tableHead = $j(document.createElement('thead'));
                    var tableBody = $j(document.createElement('tbody'));
                    var featHead = $j(document.createElement('th'))
						.text("Feature Name");
                    var hostHead = $j(document.createElement('th'))
						.text("Hostname");
                    var checkoutHead = $j(document.createElement('th'))
						.text("Checkout Time");
                    var licenseHead = $j(document.createElement('th'))
						.text("Licenses");
                    var statHead = $j(document.createElement('th'))
						.text("Statistics")
						.attr('colspan', '2');
                    var safeAppName = $j.toSafeName(product.ProductName + '-' + data.UserName);
                    var rowHead = $j(document.createElement('tr'))
						.append(featHead)
						.append(hostHead)
						.append(checkoutHead)
						.append(licenseHead)
						.append(statHead);
                    var tableName = data.UserName + product.ProductName;
                    var utable = $j(document.createElement('table'))
						.addClass('thirdlayer')
						.addClass('list') // Applying global table styles
						.addClass('tablesorter')
						.attr('name', tableName)
						.append(rowHead);
                    var thirdlayer = $j(document.createElement('div'))
						.addClass('thirdlayerTemp')
						.addClass('tl_' + safeName)
						.addClass(productLabel)
						.addClass('hidden');

                    $j.each(product.FeaturesList, function (otherIndex, feature) {
                        var usageperc = (feature.LicenseCountSum / feature.Available) * 100;
                        if (isNaN(usageperc))
                            usageperc = 0;    //fix for buggy data
                        else if (usageperc > 100)
                            usageperc = 100;

                        var usageperctotal = (feature.TotalMaxInUse / feature.Available) * 100
                        if (isNaN(usageperctotal))
                            usageperctotal = 0;
                        else if (usageperctotal > 100)
                            usageperctotal = 100;

                        if (feature.CheckoutsList.length != 0) {

                            $j.each(feature.CheckoutsList, function (i, checkouts) {
                                var safeAppName = $j.toSafeName(product.ProductName + '-' + feature.FeatureName);
                                var featureLabel = $j.toSafeName(feature.FeatureName);

                                var row = $j(document.createElement('tr'))
									.addClass('tableRow')
									.addClass(featureLabel);
                                var featTd = $j(document.createElement('td'))
									.text(feature.FeatureName)
									.addClass('usagelabel');
                                var hostTd = $j(document.createElement('td'))
									.text(checkouts.Host)
									.addClass('userhost');
                                var checkoutTd = $j(document.createElement('td'))
									.append($j.checkoutData(checkouts))
									.addClass('usercheckout');
                                var licenseTd = $j(document.createElement('td'))
									.addClass('userlicense')
									.append(feature.LicenseCountSum)
                                var usagebarLink = $j(document.createElement('a'))
									.text('History')
									.click(function () {
									    $j.historyDiv(product.ProductName, feature.FeatureName);
									});
                                var histTd = $j(document.createElement('td'))
									.addClass('historylink')
									.append(usagebarLink);
                                var usageFigures = $j(document.createElement('div'))
									.addClass('usagefigures')
									.text(feature.LicenseCountSum + '/' + feature.Available)
                                var usageBar = $j(document.createElement('div'))
									.addClass('usagebar')
									.attr('style', 'width: ' + usageperc + '%;')
									.append('&nbsp;');
                                var usageBarTotal = $j(document.createElement('div'))
									.addClass('usagebartotal')
									.attr('style', 'width: ' + usageperctotal + '%;')
									.append('&nbsp;');
                                var usageBarWrapper = $j(document.createElement('div'))
									.addClass('usagebarwrapper')
									.append($j(usageBar))
									.append(usageBarTotal);
                                var usageTd = $j(document.createElement('td'))
									.append(usageBarWrapper)
									.append(usageFigures)
									.addClass('usageinfo');

                                row.append(featTd)
									.append(hostTd)
									.append(checkoutTd)
									.append(licenseTd)
									.append(histTd)
									.append(usageTd);

                                tableBody.append(row);


                            });
                        }
                    });
                    utable.append(tableHead).append(tableBody).tablesorter();
                    thirdlayer.append(utable).append($j.clearerDiv());
                    $j('#' + divId).append(thirdlayer);
                });

                //$j.filterUser();
                $j.ajaxSetup({ cache: false });
            });

        },

        //===== PRODUCT VIEW =================================
        getProductView: function (itemValue, outputDiv) {
            //$j('#results').empty();
            $j.ajaxSetup({ cache: false });
            $j.getJSON('/licensemonitor/getProductView.htm', { 'type': 'Products', 'item': itemValue }, function (data) {

                var firstLayerLabel = $j(document.createElement('div'))
						.addClass('firstlayerlabel')
						.text(data.ProductName);

                var firstLayer = $j(document.createElement('div'))
						.addClass('firstlayer')
						.addClass(data.Mapping)
						.attr('id', data.ProductName)
						.append(firstLayerLabel);

                var productView = $j(document.createElement('div'))
						.addClass('productview')
						.attr('id', 'productview-' + data.ProductName)
						.append(firstLayer);

                $j(outputDiv).append(productView);

                var divId = $j.escapeIllegalCharacter(data.ProductName);

                $j.each(data.FeaturesList, function (index, feature) {


                    var safeAppName = $j.toSafeName(data.ProductName + '-' + feature.FeatureName);

                    var tempFeature = feature.FeatureName.replace(/[ ]/g, '_');

                    var usageperc = (feature.LicenseCountSum / feature.Available) * 100;
                    if (isNaN(usageperc))
                        usageperc = 0;    //fix for buggy data
                    else if (usageperc > 100)
                        usageperc = 100;

                    var usageLabel = $j(document.createElement('a'))
							.addClass('secondlayerlabel')
							.addClass('ubartext')
							.attr('id', safeAppName)
							.text(feature.FeatureName);

                    var usagebarLink = $j(document.createElement('a'))
							.text('History')
							.click(function () {
							    $j.historyDiv(data.ProductName, feature.FeatureName);
							});

                    var usageHistory = $j(document.createElement('div'))
							.addClass('historylink')
							.append(usagebarLink);

                    var usageFigures = $j(document.createElement('div'))
							.addClass('usagefigures')
							.text(feature.LicenseCountSum + '/' + feature.Available);

                    var usageBar = $j(document.createElement('div'))
							.addClass('usagebar')
							.attr('style', 'width: ' + usageperc + '%;')
							.append('&nbsp;');

                    var usageBarWrapper = $j(document.createElement('div'))
							.addClass('usagebarwrapper')
							.append(usageBar);

                    var divClass = data.ProductName + tempFeature;

                    var featureLabel = $j.toSafeName(feature.FeatureName);

                    var secondLayer = $j(document.createElement('div'))
							.addClass('secondlayer')
							.addClass(featureLabel)
							.addClass(divClass)
							.append(usageLabel)
							.append(usageBarWrapper)
							.append(usageFigures)
							.append(usageHistory)
							.append($j.clearerDiv());

                    $j('#' + divId).append($j(secondLayer));

                    var unameHead = $j(document.createElement('th'))
							.text("User Name");

                    var hostHead = $j(document.createElement('th'))
							.addClass('userhostname')
							.text("Hostname")

                    var checkoutHead = $j(document.createElement('th'))
							.addClass('usercheckout')
							.text("Checkout Time");

                    var licenseHead = $j(document.createElement('th'))
							.addClass('userlicense')
							.text("Licenses")

                    var rowHead = $j(document.createElement('tr'))
							.append(unameHead)
							.append(hostHead)
							.append(checkoutHead)
							.append(licenseHead);

                    var tableHead = $j(document.createElement('thead'))
							.append(rowHead);

                    var tableBody = $j(document.createElement('tbody'));
                    var tableName = data.ProductName + feature.FeatureName;
                    var ftable = $j(document.createElement('table'))
							.addClass('thirdlayer')
							.addClass('list') // Applying global table styles
							.addClass('tablesorter')
							.attr('name', tableName);

                    $j.each(feature.UsersList, function (otherIndex, user) {
                        if (user.CheckoutsList.length != 0 && feature.LicenseCountSum > 0) {
                            $j.each(user.CheckoutsList, function (i, checkouts) {
                                var unameEscaped = $j.addSlashes(user.UserName);

                                var hostTd = $j(document.createElement('td'))
										.text(checkouts.Host);
                                var checkoutTd = $j(document.createElement('td'))
										.append($j.checkoutData(checkouts));
                                var licenseTd = $j(document.createElement('td'))
										.text(checkouts.LicenseCount);
                                var ubadgeDiv = $j(document.createElement('div'));
                                var unameLink = $j(document.createElement('a'))
										.text(user.UserName)
										.click(function () {
										    $j.getUserView(user.UserName, $j.popupDiv());
										});
                                var unameEscaped = $j.addSlashes(user.UserName);
                                var unameTd = $j(document.createElement('td'))
										.addClass('userdiv')
										.append(ubadgeDiv)
										.append(unameLink);

                                if (user.FullName != null && user.FullName != '') { //check if user's data exists
                                    unameTd.append($j.userBadge(user));
                                }


                                var row = $j(document.createElement('tr'))
										.addClass("tableRow")
										.addClass(user.UserName)

                                if (checkouts.LicenseCount == 0) {
                                    row = row.addClass("hidden");
                                }

                                row = row
										.append(unameTd)
										.append(hostTd)
										.append(checkoutTd)
										.append(licenseTd);

                                tableBody.append(row);
                            });
                        }

                        ftable.tablesorter()
							.append(tableHead)
							.append(tableBody);

                        var thirdlayer = $j(document.createElement('div'))
							.addClass('thirdlayerTemp')
							.addClass('tl_' + safeAppName)
							.addClass("hidden")
							.addClass(feature.FeatureName)
							.append(ftable)
							.append($j.clearerDiv());

                        $j('#' + divId).append(thirdlayer);
                    });
                });
                $j.filterProduct();
                $j.ajaxSetup({ cache: false });
            });




        },

        //===== FEATURE VIEW =================================
        getFeatureView: function (itemValue, outputDiv) {


            $j.ajaxSetup({ cache: false });
            $j.getJSON('/licensemonitor/getFeatureView.htm', { 'type': 'Features', 'item': itemValue }, function (data) {

                var divId = $j.toSafeName(data.FeatureName);

                var firstLayerLabel = $j(document.createElement('div'))
					.addClass('firstlayerlabel')
					.text(data.FeatureName);
                var firstLayer = $j(document.createElement('div'))
					.addClass('firstlayer')
					.addClass(data.FeatureName)
					.attr('id', divId)
					.append(firstLayerLabel);
                var featureView = $j(document.createElement('div'))
					.addClass('featureview')
					.attr('id', 'featureview-' + data.FeatureName)
					.append(firstLayer);

                $j(outputDiv).append(featureView);

                $j.each(data.ProductsList, function (index, product) {
                    usageperc = (product.LicenseCountSum / product.LicenseAvailable) * 100;
                    if (isNaN(usageperc))
                        usageperc = 0; //fix for buggy data
                    else if (usageperc > 100)
                        usageperc = 100;

                    var safeAppName = $j.toSafeName(product.ProductName + '-' + data.FeatureName);

                    var secondLayerLabel = $j(document.createElement('a'))
						.attr('id', safeAppName)
						.addClass('secondlayerlabel')
						.addClass('ubartext')
						.text(product.ProductName);
                    var usagebarLink = $j(document.createElement('a'))
						.text('History')
						.click(function () {
						    $j.historyDiv(product.ProductName, data.FeatureName);
						});
                    var usageHistory = $j(document.createElement('div'))
						.addClass('historylink')
						.append(usagebarLink);
                    var usageFigures = $j(document.createElement('div'))
						.addClass('usagefigures')
						.text(product.LicenseCountSum + '/' + product.LicenseAvailable);
                    var usageBar = $j(document.createElement('div'))
						.addClass('usagebar')
						.attr('style', 'width: ' + usageperc + '%;')
						.append('&nbsp;');
                    var usageBarWrapper = $j(document.createElement('div'))
						.addClass('usagebarwrapper')
						.append(usageBar);
                    var divClass = data.FeatureName + product.ProductName;
                    var secondlayer = $j(document.createElement('div'))
						.addClass('secondlayer')
						.addClass(product.ProductName)
						.addClass(divClass)
						.addClass(product.Mapping)
						.attr('id', product.ProductName + index)
						.append(secondLayerLabel)
						.append(usageBarWrapper)
						.append(usageFigures)
						.append(usageHistory)
						.append($j.clearerDiv());

                    $j('#' + divId).append(secondlayer);

                    var unameHead = $j(document.createElement('th'))
						.text("User Name");
                    var hostHead = $j(document.createElement('th'))
						.text("Hostname")
						.addClass('userhostname');
                    var checkoutHead = $j(document.createElement('th'))
						.text("Checkout Time")
						.addClass('usercheckout');
                    var licenseHead = $j(document.createElement('th'))
						.text("Licenses")
						.addClass('userlicense');
                    var rowHead = $j(document.createElement('tr'))
						.append(unameHead)
						.append(hostHead)
						.append(checkoutHead)
						.append(licenseHead);
                    var tableHead = $j(document.createElement('thead'))
						.append(rowHead);
                    var tableName = data.FeatureName + product.ProductName;
                    var tableBody = $j(document.createElement('tbody'));

                    $j.each(product.UsersList, function (otherIndex, user) {

                        if (user.CheckoutsList.length != 0) {

                            $j.each(user.CheckoutsList, function (i, checkouts) {
                                var unameEscaped = $j.addSlashes(user.UserName);
                                var unameLink = $j(document.createElement('a'))
									.text(user.UserName)
									.click(function () {
									    $j.getUserView(user.UserName, $j.popupDiv());
									});
                                var ubadgeDiv = $j(document.createElement('div'))
									.append(unameLink);
                                var unameTd = $j(document.createElement('td'))
									.append(ubadgeDiv)
									.addClass("userdiv");
                                var hostTd = $j(document.createElement('td'))
									.text(checkouts.Host);
                                var checkoutTd = $j(document.createElement('td'))
									.append($j.checkoutData(checkouts));
                                var licenseTd = $j(document.createElement('td'))
									.text(checkouts.LicenseCount);

                                // Check if user's data exists
                                if (user.FullName != null && user.FullName != "") {
                                    ubadgeDiv.append($j.userBadge(user));
                                }
                                var row = $j(document.createElement('tr'))
									.addClass("tableRow")
									.addClass(user.UserName)
									.append(unameTd)
									.append(hostTd)
									.append(checkoutTd)
									.append(licenseTd);

                                tableBody.append(row);
                            });
                        }
                    });
                    var ftable = $j(document.createElement('table'))
						.addClass('thirdlayer')
						.addClass('list') // Applying global table styles
						.addClass('tablesorter')
						.attr('name', tableName)
						.append(tableHead)
						.append(tableBody)
						.tablesorter();
                    var thirdlayer = $j(document.createElement('div'))
						.addClass('thirdlayerTemp')
						.addClass(product.ProductName)
						.addClass('tl_' + safeAppName)
						.addClass('hidden')
						.append(ftable)
						.append($j.clearerDiv())
                    $j('#' + divId).append(thirdlayer);
                });
                $j.filterFeature();
                $j.ajaxSetup({ cache: false });
            });




        },

        searchProducts: function (itemValue) {

            $j.ajaxSetup({ cache: false });
            $j.getJSON('/licensemonitor/getAllProducts.htm', { 'query': itemValue }, function (data) {
                //alert(data);
                $j.ajaxSetup({ cache: false });
            });
        },

        filterProduct: function () {

            if ($j('#featuresList').children('li').size() > 0) {
                $j('.secondlayer').addClass('hidden');
                $j('.thirlayerTemp').addClass('hidden');

                $j('#productsList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofProduct = $j.toSafeName(name);

                    $j('#featuresList li').each(function (index1, element1) {
                        var name1 = $j(element1).text();
                        var nameofFeature = $j.toSafeName(name1);

                        $j('.secondlayer.' + nameofFeature).removeClass('hidden');
                    });
                });
                if ($j('#usersList').children('li').size() > 0) {
                    var rowHidden = 0;
                    var rowCount = 0;

                    $j('.tableRow').addClass('hidden');
                    $j('#usersList li').each(function (index, element) {
                        var name = $j(element).text();
                        var nameofUser = $j.escapeIllegalCharacter(name);

                        //if(){
                        $j('.tableRow.' + nameofUser).removeClass('hidden');
                        //}
                    });

                    $j('table').each(function (i) {
                        var cName = $j(this).attr('name');

                        if (cName != null) {
                            cName = $j.escapeIllegalCharacter(cName);

                            var rowCount = $j(this).find('tr').length - 1;
                            var rowHidden = $j(this).find('tr.hidden').length;

                            if (rowCount == rowHidden) {
                                $j('.secondlayer.' + cName).addClass('hidden');
                                $j('.thirdlayerTemp').addClass('hidden');
                            }
                        }
                    });
                }
            } else if ($j('#usersList').children('li').size() > 0) {
                var rowHidden = 0;
                var rowCount = 0;

                $j('.tableRow').addClass('hidden');
                $j('#usersList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofUser = $j.escapeIllegalCharacter(name);

                    $j('.tableRow.' + nameofUser).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            }

        },

        filterFeature: function () {
            if ($j('#productsList').children('li').size() > 0) {

                $j('.secondlayer').addClass('hidden');
                $j('.thirlayerTemp').addClass('hidden');

                $j('#featuresList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofFeature = $j.escapeIllegalCharacter(name);

                    $j('#productsList li').each(function (index1, element1) {
                        var name1 = $j(element1).text();
                        var nameofProduct = $j.escapeIllegalCharacter(name1);

                        $j('.secondlayer.' + nameofProduct).removeClass('hidden');
                    });
                });

                if ($j('#usersList').children('li').size() > 0) {
                    var rowHidden = 0;
                    var rowCount = 0;

                    $j('.tableRow').addClass('hidden');
                    $j('#usersList li').each(function (index, element) {
                        var name = $j(element).text();
                        var nameofUser = $j.escapeIllegalCharacter(name);

                        //if(){
                        $j('.tableRow.' + nameofUser).removeClass('hidden');
                        //}
                    });

                    $j('table').each(function (i) {
                        var cName = $j(this).attr('name');

                        if (cName != null) {
                            cName = $j.escapeIllegalCharacter(cName);

                            var rowCount = $j(this).find('tr').length - 1;
                            var rowHidden = $j(this).find('tr.hidden').length;

                            if (rowCount == rowHidden) {
                                $j('.secondlayer.' + cName).addClass('hidden');
                                $j('.thirdlayerTemp').addClass('hidden');
                            }
                        }
                    });
                }



            } else if ($j('#usersList').children('li').size() > 0) {
                var rowHidden = 0;
                var rowCount = 0;

                $j('.tableRow').addClass('hidden');
                $j('#usersList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofUser = $j.escapeIllegalCharacter(name);
                    $j('.tableRow.' + nameofUser).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            }
        },

        filterUser: function () {
            if ($j('#productsList').children('li').size() > 0) {
                $j('.secondlayer').addClass('hidden');
                $j('.thirlayerTemp').addClass('hidden');

                $j('#usersList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofUser = $j.escapeIllegalCharacter(name);

                    $j('#productsList li').each(function (index1, element1) {
                        var name1 = $j(element1).text();
                        var nameofProduct = $j.toSafeName(name1);

                        $j('.secondlayer.' + nameofProduct).removeClass('hidden');
                    });
                });
                if ($j('#featuresList').children('li').size() > 0) {
                    var rowHidden = 0;
                    var rowCount = 0;

                    $j('.tableRow').addClass('hidden');
                    $j('#featuresList li').each(function (index, element) {
                        var name = $j(element).text();
                        var nameofFeature = $j.toSafeName(name);

                        //if(){
                        $j('.tableRow.' + nameofFeature).removeClass('hidden');
                        //}
                    });

                    $j('table').each(function (i) {
                        var cName = $j(this).attr('name');

                        if (cName != null) {
                            cName = $j.toSafeName(cName);

                            var rowCount = $j(this).find('tr').length - 1;
                            var rowHidden = $j(this).find('tr.hidden').length;

                            if (rowCount == rowHidden) {
                                $j('.secondlayer.' + cName).addClass('hidden');
                                $j('.thirdlayerTemp').addClass('hidden');
                            }
                        }
                    });
                }
            } else if ($j('#featuresList').children('li').size() > 0) {
                var rowHidden = 0;
                var rowCount = 0;

                $j('.tableRow').addClass('hidden');
                $j('#featuresList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofFeature = $j.toSafeName(name);

                    $j('.tableRow.' + nameofFeature).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.toSafeName(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            }
        },

        serverSide: function () {
            if (currValue != null) {
                if (viewValue == 'Product') {


                    $j.getProductView(currValue, '#results');

                    if (searchValue != 0) {
                        $j('#results').empty();
                    }
                    searchValue = 0;
                } else if (viewValue == "Feature Name") {

                    $j.getFeatureView(currValue, '#results');

                    if (searchValue !== 1) {
                        $j('#results').empty();
                    }
                    searchValue = 1;


                } else if (viewValue == "User") {
                    $j.getUserView(currValue, '#results');

                    if (searchValue !== 2) {
                        $j('#results').empty();
                    }
                    searchValue = 2;
                }
            }




        },

        getRecentCheckouts: function (count) {
            $j.ajaxSetup({ cache: false });
            $j.getJSON('/licensemonitor/getRecentCheckouts.htm', { "count": count }, function (data) {

                var reportDiv = $j(document.createElement('div'));
                var recentCheckoutTableTBody = $j(document.createElement('tbody'));
                var tableTitle = $j(document.createElement('div'))
					.text(count + " Most Recent Checkouts")
					.addClass("tableTitle");
                var checkoutHead = $j(document.createElement('th'))
					.text("Checkout Time");
                var productHead = $j(document.createElement('th'))
					.text("Product");
                var featureHead = $j(document.createElement('th'))
					.text("Feature Name");
                var userHead = $j(document.createElement('th'))
					.text("Username");
                var hostHead = $j(document.createElement('th'))
					.text("Hostname");
                var maxInUseHead = $j(document.createElement('th'))
					.attr('colspan', '2')
					.text("Licenses");
                var rowHead = $j(document.createElement('tr'))
					.append(checkoutHead)
					.append(productHead)
					.append(featureHead)
					.append(userHead)
					.append(hostHead)
					.append(maxInUseHead);
                var recentCheckoutTableTHead = $j(document.createElement('thead'))
					.append(rowHead);
                var recentCheckoutTable = $j(document.createElement('table'))
					.append(recentCheckoutTableTHead);

                $j.each(data, function (index, checkoutData) {
                    var unameEscaped = $j.addSlashes(checkoutData.UserName);
                    var pnameEscaped = $j.addSlashes(checkoutData.ProductName);
                    var fnameEscaped = $j.addSlashes(checkoutData.FeatureName);
                    var productLink = $j(document.createElement('a'))
						.text(checkoutData.ProductName)
						.click(function () {

						    $j.getProductView(pnameEscaped, $j.popupDiv());
						});
                    var featureLink = $j(document.createElement('a'))
						.text(checkoutData.FeatureName)
						.click(function () {
						    $j.getFeatureView(fnameEscaped, $j.popupDiv());
						});
                    var unameLink = $j(document.createElement('a'))
						.text(checkoutData.UserName)
						.click(function () {
						    $j.getUserView(checkoutData.UserName, $j.popupDiv());
						});
                    var rawcoDT = (checkoutData.CheckoutTime).split('T');
                    var coDReform = rawcoDT[0].replace(/-/g, '/');
                    var checkoutDT = new Date(coDReform + ' ' + rawcoDT[1] + ' +00');
                    var coDate = checkoutDT.getFullYear() + '-' + $j.padnumber(checkoutDT.getMonth() + 1) + '-' + $j.padnumber(checkoutDT.getDate());
                    var coTime = $j.padnumber(checkoutDT.getHours()) + ':' + $j.padnumber(checkoutDT.getMinutes()) + ':' + $j.padnumber(checkoutDT.getSeconds());

                    var usageperc = (checkoutData.MaxInUse / checkoutData.TotalMaxInUse) * 100
                    if (isNaN(usageperc))
                        usageperc = 0;
                    else if (usageperc > 100)
                        usageperc = 100;

                    var usageperctotal = (checkoutData.TotalMaxInUse / checkoutData.MaxAvailable) * 100
                    if (isNaN(usageperc))
                        usageperctotal = 0;
                    else if (usageperctotal > 100)
                        usageperctotal = 100;

                    var maxinuseText = $j(document.createElement('div'))
						.addClass('ubartext')
						.text(checkoutData.MaxInUse);
                    var usageFigures = $j(document.createElement('div'))
						.addClass('usagefigures')
						.text(checkoutData.TotalMaxInUse + '/' + checkoutData.MaxAvailable);
                    var usageBar = $j(document.createElement('div'))
						.addClass('usagebar')
						.attr('style', 'width: ' + usageperc + '%;')
						.append('&nbsp;');
                    var usageBarTotal = $j(document.createElement('div'))
						.addClass('usagebartotal')
						.attr('style', 'width: ' + usageperctotal + '%;')
						.append($j(usageBar))
						.append('&nbsp;');
                    var usageBarWrapper = $j(document.createElement('div'))
						.addClass('usagebarwrapper')
						.attr('title', 'Total max in use / Max Available: ' + checkoutData.TotalMaxInUse + '/' + checkoutData.MaxAvailable)
						.append($j(usageBarTotal));
                    var checkoutTd = $j(document.createElement('td'))
						.text(coDate + " " + coTime);
                    var productTd = $j(document.createElement('td'))
						.append(productLink);
                    var featureTd = $j(document.createElement('td'))
						.append(featureLink);
                    var userTd = $j(document.createElement('td'))
						.append(unameLink);
                    var hostTd = $j(document.createElement('td'))
						.text(checkoutData.Host);
                    var maxInUseTd = $j(document.createElement('td'))
						.addClass('specialCell1')
						.append(maxinuseText);
                    var maxInUseTdGraph = $j(document.createElement('td'))
						.addClass('specialCell2')
						.append(usageBarWrapper)
						.append(usageFigures);
                    var row = $j(document.createElement('tr'))
						.append(checkoutTd)
						.append(productTd)
						.append(featureTd)
						.append(userTd)
						.append(hostTd)
						.append(maxInUseTd)
						.append(maxInUseTdGraph);

                    recentCheckoutTableTBody.append(row);
                });

                recentCheckoutTable.append(recentCheckoutTableTBody)
					.addClass("tablesorter")
					.addClass("list") // Applying global table styles
					.tablesorter();

                reportDiv.addClass("dashboardReport")
					.append(tableTitle)
					.append(recentCheckoutTable);

                $j("#results").append(reportDiv);
                $j.ajaxSetup({ cache: false });
            });
        },

        getMaxUsers: function (count) {
            $j.ajaxSetup({ cache: false });
            $j.getJSON('/licensemonitor/getMaxUsers.htm', { 'count': count }, function (data) {
                var reportDiv = $j(document.createElement('div'));
                var tableTitle = $j(document.createElement('div'))
					.text(count + ' Top Users')
					.addClass("tableTitle");
                var featureHead = $j(document.createElement('th'))
					.text("Feature Name");
                var userHead = $j(document.createElement('th'))
					.text("Username");
                var maxInUseHead = $j(document.createElement('th'))
					.text("Licenses");
                var rowHead = $j(document.createElement('tr'))
					.append(featureHead)
					.append(userHead)
					.append(maxInUseHead);
                var maxUsersTableTHead = $j(document.createElement('thead'))
					.append(rowHead);
                var maxUsersTable = $j(document.createElement('table'))
					.append(maxUsersTableTHead);
                var maxUsersTableTBody = $j(document.createElement('tbody'));

                $j.each(data, function (index, maxUserData) {
                    var unameEscaped = $j.addSlashes(maxUserData.UserName);
                    var fnameEscaped = $j.addSlashes(maxUserData.FeatureName);
                    var featureLink = $j(document.createElement('a'))
						.text(maxUserData.FeatureName)
						.click(function () {
						    $j.getFeatureView(fnameEscaped, $j.popupDiv());
						});
                    var unameLink = $j(document.createElement('a'))
						.text(maxUserData.UserName)
						.click(function () {
						    $j.getUserView(maxUserData.UserName, $j.popupDiv());
						});
                    var featureTd = $j(document.createElement('td'))
						.append(featureLink);
                    var userTd = $j(document.createElement('td'))
						.append(unameLink);
                    var maxInUseTd = $j(document.createElement('td'))
						.text(maxUserData.MaxInUse);
                    var row = $j(document.createElement('tr'))
						.append(featureTd)
						.append(userTd)
						.append(maxInUseTd);

                    maxUsersTableTBody.append(row);
                });

                maxUsersTable.append(maxUsersTableTBody)
					.addClass('tablesorter')
					.addClass('list') // Applying global table styles
					.tablesorter();

                reportDiv.addClass('dashboardReport')
					.append(tableTitle)
					.append(maxUsersTable);

                $j('#results').append(reportDiv);
                $j.ajaxSetup({ cache: false });
            });
        },

        getMaxUtilization: function (count) {
            $j.ajaxSetup({ cache: false });
            $j.getJSON('/licensemonitor/getMaxUtilization.htm', { 'count': count }, function (data) {
                var reportDiv = $j(document.createElement('div'));
                var featureHead = $j(document.createElement('th'))
					.text('Feature Name');
                var maxUtilHead = $j(document.createElement('th'))
					.text('Max Utilization');
                var maxAvailableHead = $j(document.createElement('th'))
					.attr('colspan', '2')
					.text('Max Available');
                var tableTitle = $j(document.createElement('div'))
					.text('Top ' + count + ' Max Utilization')
					.addClass('tableTitle')
                var productHead = $j(document.createElement('th'))
					.text("Product");
                var rowHead = $j(document.createElement('tr'))
					.append(productHead)
					.append(featureHead)
					.append(maxUtilHead)
					.append(maxAvailableHead);
                var maxUtilizationTableTHead = $j(document.createElement('thead'))
					.append(rowHead);
                var maxUtilizationTable = $j(document.createElement('table'))
					.append(maxUtilizationTableTHead);
                var maxUtilizationTableTBody = $j(document.createElement('tbody'));

                $j.each(data, function (index, utilizationData) {
                    var pnameEscaped = $j.addSlashes(utilizationData.ProductName);
                    var fnameEscaped = $j.addSlashes(utilizationData.FeatureName);
                    var productLink = $j(document.createElement('a'))
						.text(utilizationData.ProductName)
						.click(function () {
						    $j.getProductView(pnameEscaped, $j.popupDiv());
						});
                    var featureLink = $j(document.createElement('a'))
						.text(utilizationData.FeatureName)
						.click(function () {
						    $j.getFeatureView(fnameEscaped, $j.popupDiv());
						});

                    var maxutilperc = Math.round(((utilizationData.MaxInUse / utilizationData.MaxAvailable) * 100) * 100) / 100
                    var maxUtil = maxutilperc
                    if (isNaN(maxutilperc))
                        maxutilperc = 0;
                    else if (maxutilperc > 100)
                        maxutilperc = 100;

                    var maxavailText = $j(document.createElement('div'))
						.addClass('ubartext')
						.text(utilizationData.MaxAvailable);
                    var usageFigures = $j(document.createElement('div'))
						.addClass('usagefigures')
						.text(utilizationData.MaxInUse + '/' + utilizationData.MaxAvailable);
                    var usageBar = $j(document.createElement('div'))
						.addClass('usagebar')
						.attr('style', 'width: ' + maxutilperc + '%;')
						.append('&nbsp;');

                    var usageBarWrapper = $j(document.createElement('div'))
						.addClass('usagebarwrapper')
						.attr('title', 'Max in use / Max Available: ' + utilizationData.MaxInUse + '/' + utilizationData.MaxAvailable)
						.append(usageBar);
                    var productTd = $j(document.createElement('td'))
						.append(productLink);
                    var featureTd = $j(document.createElement('td'))
						.append(featureLink);
                    var maxUtilTd = $j(document.createElement('td'))
						.text(maxUtil + '%');
                    var maxAvailableTd = $j(document.createElement('td'))
						.addClass('specialCell1')
						.append(utilizationData.MaxAvailable);
                    var maxAvailableTdGraph = $j(document.createElement('td'))
						.addClass('specialCell2')
						.append($j(usageBarWrapper))
						.append($j(usageFigures));
                    var row = $j(document.createElement('tr'))
						.append(productTd)
						.append(featureTd)
						.append(maxUtilTd)
						.append(maxAvailableTd)
						.append(maxAvailableTdGraph);

                    maxUtilizationTableTBody.append(row);
                });

                maxUtilizationTable.append(maxUtilizationTableTBody)
					.addClass('tablesorter')
					.addClass('list') // Applying global table styles
					.tablesorter();

                reportDiv.addClass('dashboardReport')
					.append(tableTitle)
					.append(maxUtilizationTable);

                $j('#results').append(reportDiv);
                $j.ajaxSetup({ cache: false });
            });
        },

        getFilteredItems: function () {
            var productsList = new Array();
            var featuresList = new Array();
            var usersList = new Array();
            var filteredItems = new Object;

            $j('#productsList li').each(function (index, element) {
                productsList[index] = $j(element).text();
            });

            $j('#featuresList li').each(function (index, element) {
                featuresList[index] = $j(element).text();
            });

            $j('#usersList li').each(function (index, element) {
                usersList[index] = $j(element).text();
            });

            filteredItems.products = productsList;
            filteredItems.features = featuresList;
            filteredItems.users = usersList;

            return filteredItems;
        },

        pause: function (milliseconds) {
            var dt = new Date();
            while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
        }

    }),

	$j('.selectBox').change(function () {
	    $j.getSelectedItem();
	});

    $j('#button').click(function () {
        $j.getFilteredItems();
    });

    $j('.secondlayerlabel').live('click', function () {
        var divName = $j(this).attr('id');

        var rowCount = $j('div.tl_' + divName + ' > table > tbody > tr').size();
        var rowHidden = $j('div.tl_' + divName + ' > table').find('tr.hidden').size()

        if (rowCount != rowHidden) {
            $j('.tl_' + divName).toggleClass('hidden');
        }
        $j.alterTablesorter(divName);
    });


    $j('.selectedproducts').live('click', function () {
        var item = $j(this).text();
        var item1 = $j.escapeIllegalCharacter(item);
        var item2 = $j.toSafeName(item);

        $j(this).remove();


        var filteredItems = $j.getFilteredItems();

        if ((viewValue == 'Product') && (currValue != null)) {
            $j('#productview-' + item1).remove();

            if ($j('#productsList').children('li').size() == 0) {
                filterFeatures.addClass('hidden');
                filterUsers.addClass('hidden');
                subFilters.addClass('hidden');
                $j('#featuresList').children('li').remove();
                $j('#usersList').children('li').remove();
            }

        } else if (viewValue == 'Feature Name') {

            if ($j('#productsList').children('li').size() > 0) {
                $j('.' + item1).addClass('hidden');
                //$j('.thirdlayerTemp').addClass('hidden');

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            } else {
                $j('.secondlayer').removeClass('hidden');
                //$j('.thirdlayerTemp').addClass('hidden');

                if ($j('#featuresList').children('li').size() > 0) {
                    $j('table').each(function (i) {
                        var cName = $j(this).attr('name');

                        if (cName != null) {
                            cName = $j.escapeIllegalCharacter(cName);

                            var rowCount = $j(this).find('tr').length - 1;
                            var rowHidden = $j(this).find('tr.hidden').length;

                            if (rowCount == rowHidden) {
                                $j('.secondlayer.' + cName).addClass('hidden');
                                $j('.thirdlayerTemp').addClass('hidden');
                            }
                        }
                    });
                }
            }
        } else if (viewValue == 'User') {




            if ($j('#productsList').children('li').size() > 0) {

                $j('.' + item2).addClass('hidden');

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.toSafeName(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {

                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            } else {
                $j('.secondlayer').removeClass('hidden');

                if ($j('#featuresList').children('li').size() > 0) {

                    //$j('.tableRow').addClass('hidden');

                    $j('#featuresList li').each(function (index, element) {
                        var name = $j(element).text();
                        var nameofFeature = $j.escapeIllegalCharacter(name);
                        $j('.' + nameofFeature).removeClass('hidden');
                    });

                    $j('table').each(function (i) {
                        var cName = $j(this).attr('name');

                        if (cName != null) {
                            cName = $j.toSafeName(cName);

                            var rowCount = $j(this).find('tr').length - 1;
                            var rowHidden = $j(this).find('tr.hidden').length;

                            if (rowCount == rowHidden) {
                                $j('.secondlayer.' + cName).addClass('hidden');
                                $j('.thirdlayerTemp').addClass('hidden');
                            }
                        }
                    });
                }
            }
        }

        if ($j('.selectedList li').length == 0) {


            searchValue = -1;
            changeContent();
        }


    });

    $j('.selectedfeatures').live('click', function () {
        var item = $j(this).text();
        var item1 = $j.escapeIllegalCharacter(item);
        var item2 = $j.toSafeName(item);

        $j(this).remove();
        var filteredItems = $j.getFilteredItems();

        if ((viewValue == 'Feature Name') && (currValue != null)) {
            $j('#featureview-' + item1).remove();

            if ($j('#featuresList').children('li').size() == 0) {
                filterProducts.addClass('hidden');
                filterUsers.addClass('hidden');
                subFilters.addClass('hidden');
                $j('#productsList').children('li').remove();
                $j('#usersList').children('li').remove();
            }
        } else if (viewValue == 'Product') {
            if ($j('#featuresList').children('li').size() > 0) {
                $j('.' + item2).addClass('hidden');

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            } else {
                $j('.secondlayer').removeClass('hidden');

                if ($j('#usersList').children('li').size() > 0) {
                    $j('table').each(function (i) {
                        var cName = $j(this).attr('name');

                        if (cName != null) {
                            cName = $j.escapeIllegalCharacter(cName);

                            var rowCount = $j(this).find('tr').length - 1;
                            var rowHidden = $j(this).find('tr.hidden').length;

                            if (rowCount == rowHidden) {
                                $j('.secondlayer.' + cName).addClass('hidden');
                                $j('.thirdlayerTemp').addClass('hidden');
                            }
                        }
                    });
                }
            }
        } else if (viewValue == 'User') {
            if ($j('#featuresList').children('li').size() > 0) {
                $j('.' + item2).addClass('hidden');

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.toSafeName(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            } else {
                $j('.tableRow').removeClass('hidden');
                if ($j('#productsList').children('li').size() > 0) {
                    $j('#productsList li').each(function (i, elem) {
                        var productName = $j(elem).text();
                        var nameofProduct = $j.toSafeName(productName);

                        $j('.secondlayer.' + nameofProduct).removeClass('hidden');
                    });
                } else {
                    $j('.secondlayer').removeClass('hidden');
                }
            }
        }
        if ($j('.selectedList li').length == 0) {
            searchValue = -1;
            changeContent();
        }
    });

    $j('.selectedusers').live('click', function () {
        var item = $j(this).text();
        var item1 = $j.escapeIllegalCharacter(item);
        var item2 = $j.toSafeName(item);

        $j(this).remove();
        var filteredItems = $j.getFilteredItems();

        if ((viewValue == 'User') && (currValue != null)) {

            $j('#userview-' + item1).remove();

            if ($j('#usersList').children('li').size() == 0) {
                filterProducts.addClass('hidden');
                filterFeatures.addClass('hidden');
                subFilters.addClass("hidden");
                $j('#productsList').children('li').remove();
                $j('#featuresList').children('li').remove();
            }
        } else if (viewValue == 'Feature Name') {
            if ($j('#usersList').children('li').size() > 0) {
                $j('.' + item1).addClass('hidden');

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            } else {
                $j('.tableRow').removeClass('hidden');
                if ($j('#productsList').children('li').size() > 0) {
                    $j('#productsList li').each(function (i, elem) {
                        var productName = $j(elem).text();
                        $j('.secondlayer.' + productName).removeClass('hidden');
                    });
                } else {
                    $j('.secondlayer').removeClass('hidden');
                }
            }
        } else if (viewValue == 'Product') {
            if ($j('#usersList').children('li').size() > 0) {
                $j('.' + item1).addClass('hidden');

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            } else {
                $j('.tableRow').removeClass('hidden');
                if ($j('#featuresList').children('li').size() > 0) {
                    $j('#featuresList li').each(function (i, elem) {
                        var featureName = $j(elem).text();
                        $j('.secondlayer.' + featureName).removeClass('hidden');
                    });
                } else {
                    $j('.secondlayer').removeClass('hidden');
                }
            }
        }

        if ($j('.selectedList li').length == 0) {
            searchValue = -1;
            changeContent();
        }
    });

    $j('#products').autocomplete({
        source: function (request, response) {
            filteredItems = $j.getFilteredItems();

            $j.ajax({
                url: '/licensemonitor/getAllProducts.htm',
                dataType: "json",
                data: {
                    term: request.term,
                    products: filteredItems.products,
                    features: filteredItems.features,
                    users: filteredItems.users
                },
                success: function (data) {
                    response(data);
                }
            })
        },
        minLength: 2, //default is 3


        select: function (event, ui) {

            currValue = ui.item.value;
            $j('#productsList').append('<li class="selectedproducts">' + currValue + '</li>');
            if (viewValue == 'Product') {
                $j.serverSide();
                $j.showFilters();

            } else if (viewValue == 'Feature Name') {
                $j('.secondlayer').addClass('hidden');
                $j('.thirdlayerTemp').addClass('hidden');

                $j('#productsList li').each(function (index, element) {
                    var name = $j(element).text();

                    var nameofProduct = $j.escapeIllegalCharacter(name);

                    if (nameofProduct.match(/ /g) != null) {
                        var nameofProduct = nameofProduct.replace(/\\ /g, ".");

                    }


                    $j('.secondlayer.' + nameofProduct).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });

            } else if (viewValue == 'User') {
                $j('.secondlayer').addClass('hidden');
                $j('.thirdlayerTemp').addClass('hidden');

                $j('#productsList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofProduct = $j.toSafeName(name);

                    $j('.secondlayer.' + nameofProduct).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.toSafeName(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }


                });
            }

            ui.item.value = "";


        }


    });

    $j('#features').autocomplete({
        source: function (request, response) {
            filteredItems = $j.getFilteredItems();

            $j.ajax({
                url: '/licensemonitor/getAllFeatures.htm',
                dataType: "json",
                data: {
                    term: request.term,
                    products: filteredItems.products,
                    features: filteredItems.features,
                    users: filteredItems.users
                },
                success: function (data) {
                    response(data);
                }
            })
        },
        minLength: 2,

        select: function (event, ui) {
            currValue = ui.item.value;
            $j('#featuresList').append('<li class="selectedfeatures">' + currValue + '</li>');

            if (viewValue == 'Feature Name') {

                $j.serverSide();
                $j.showFilters();


            } else if (viewValue == 'Product') {
                $j('.secondlayer').addClass('hidden');
                $j('.thirdlayerTemp').addClass('hidden');

                $j('#featuresList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofFeature = $j.toSafeName(name);

                    $j('.secondlayer.' + nameofFeature).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });

            } else if (viewValue == 'User') {
                /*var rowHidden=0;
                var rowCount=0;

                $j('.tableRow').addClass('hidden');
                $j('#featuresList li').each(function(index, element) {
                var name = $j(element).text();
                var nameofUser = $j.escapeIllegalCharacter(name);

                $j('.' + nameofUser).removeClass('hidden');
                });

                $j('table').each(function(i) {
                var cName = $j(this).attr('name'); 

                if(cName != null) {
                cName = $j.escapeIllegalCharacter(cName); 

                var rowCount = $j(this).find('tr').length - 1;
                var rowHidden = $j(this).find('tr.hidden').length;

                if(rowCount == rowHidden) {
                $j('.secondlayer.' + cName).addClass('hidden'); 
                $j('.thirdlayerTemp').addClass('hidden');
                }
                }
                });
                }
                */
                if ($j('#productsList').children('li').size() > 0) {
                    $j('.secondlayer').addClass('hidden');
                    $j('.thirlayerTemp').addClass('hidden');

                    $j('#productsList li').each(function (index, element) {
                        var name = $j(element).text();
                        var nameofProduct = $j.toSafeName(name)

                        $j('.secondlayer.' + nameofProduct).removeClass('hidden');
                    });
                }

                var rowHidden = 0;
                var rowCount = 0;

                $j('.tableRow').addClass('hidden');
                $j('#featuresList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofFeature = $j.toSafeName(name);

                    $j('.' + nameofFeature).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.toSafeName(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            }
            ui.item.value = '';

        }
    });

    $j('#users').autocomplete({
        source: function (request, response) {
            filteredItems = $j.getFilteredItems();

            $j.ajax({
                url: '/licensemonitor/getAllUsers.htm',
                dataType: "json",
                data: {
                    term: request.term,
                    products: filteredItems.products,
                    features: filteredItems.features,
                    users: filteredItems.users
                },
                success: function (data) {
                    response(data);
                }
            })
        },
        minLength: 2,

        select: function (event, ui) {
            currValue = ui.item.value;

            $j('#usersList').append('<li class="selectedusers">' + currValue + '</li>');
            if (viewValue == 'User') {
                $j.serverSide();
                $j.showFilters();

            } else if (viewValue == 'Feature Name') {
                if ($j('#productsList').children('li').size() > 0) {
                    $j('.secondlayer').addClass('hidden');
                    $j('.thirlayerTemp').addClass('hidden');

                    $j('#productsList li').each(function (index, element) {
                        var name = $j(element).text();

                        var nameofProduct = $j.escapeIllegalCharacter(name);

                        if (nameofProduct.match(/ /g) != null) {
                            var nameofProduct = nameofProduct.replace(/\\ /g, ".");

                        }

                        $j('.secondlayer.' + nameofProduct).removeClass('hidden');
                    });
                }

                var rowHidden = 0;
                var rowCount = 0;

                $j('.tableRow').addClass('hidden');
                $j('#usersList li').each(function (index, element) {
                    var name = $j(element).text();
                    var nameofUser = $j.escapeIllegalCharacter(name);

                    if (nameofUser.match(/ /g) != null) {
                        var nameofUser = nameofUser.replace(/\\ /g, ".");

                    }

                    $j('.' + nameofUser).removeClass('hidden');
                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {
                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            }
            else if (viewValue == 'Product') {
                if ($j('#featuresList').children('li').size() > 0) {

                    $j('.secondlayer').addClass('hidden');
                    $j('.thirlayerTemp').addClass('hidden');

                    $j('#featuresList li').each(function (index, element) {
                        var name = $j(element).text();
                        var nameofFeature = $j.toSafeName(name)
                        $j('.secondlayer.' + nameofFeature).removeClass('hidden');
                    });
                }

                var rowHidden = 0;
                var rowCount = 0;

                $j('.tableRow').addClass('hidden');
                $j('#usersList li').each(function (index, element) {
                    var name = $j(element).text();

                    var nameofUser = $j.escapeIllegalCharacter(name);

                    if (nameofUser.match(/ /g) != null) {
                        var nameofUser = nameofUser.replace(/\\ /g, ".");

                    }

                    $j('.' + nameofUser).removeClass('hidden');


                });

                $j('table').each(function (i) {
                    var cName = $j(this).attr('name');

                    if (cName != null) {

                        cName = $j.escapeIllegalCharacter(cName);

                        var rowCount = $j(this).find('tr').length - 1;
                        var rowHidden = $j(this).find('tr.hidden').length;

                        if (rowCount == rowHidden) {
                            $j('.secondlayer.' + cName).addClass('hidden');
                            $j('.thirdlayerTemp').addClass('hidden');
                        }
                    }
                });
            }
            ui.item.value = '';
        }
    });

    //Spinner
    $j('#loading').bind('ajaxSend', function () {
        $j(this).show();
    }).bind('ajaxStop', function () {
        $j(this).hide();
    }).bind('ajaxError', function () {
        $j(this).hide();
    });

    //table for recent checkouts
    $j.getRecentCheckouts(10);
    $j.getMaxUtilization(10);
    $j.getMaxUsers(10);




});
