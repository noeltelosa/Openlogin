//This requires jqwidget's dropdown library (so as it's required library), highcharts.
var portletInstanceHeight = [{ "value": "300", "label": "100%" }, { "value": "375", "label": "125%" }, { "value": "450", "label": "150%" }, { "value": "525", "label": "175%" }, { "value": "600", "label": "200%" }];

var getChartDrpDown = function (chart_id, iid, height, isUpdate, isDataLabels) {
    var selectHeight = jQuery(document.createElement('div'))
	    .attr('id', ('drp_iid_' + iid))
	    .addClass('pInstanceDrpDown');

    var dataLabels = jQuery(document.createElement('input'))
		.attr('type', 'checkbox')
		.attr('checked', isDataLabels)
		.attr('onchange', 'toggleDataLabels($j("#' + chart_id + '").highcharts())');

    var toolbar = jQuery(document.createElement('div'))
		.addClass('floatRight')
		.append(selectHeight)
		.append('<label> Chart Size: </label> ')
		.append(dataLabels)
		.append('<label>Data Labels: </label>');

    var footer = jQuery(document.createElement('div'))
		.addClass('IFooter')
		.append(toolbar);

    selectHeight.jqxDropDownList({
        theme: theme,
        width: '60px',
        height: '17px',
        autoDropDownHeight: true,
        source: portletInstanceHeight,
        selectedIndex: 0
    });

    selectHeight.jqxDropDownList('selectItem', height);

    selectHeight.bind('select', function () {
        setHighChartSize(jQuery('#' + chart_id).highcharts(), jQuery(this).val(), jQuery('#' + chart_id).width());
        if (isUpdate) {
            var iid = jQuery(this).attr('id');
            updatePortletHeight(iid.substring(iid.lastIndexOf('_') + 1), jQuery(this).val());
        }
    });

    return footer;
};

var updatePortletHeight = function (instanceId, height) {
    console.log(instanceId + '-' + height);
    $j.ajax({
        url: '/api/ChangePortletHeight',
        type: 'POST',
        data: { 'instanceId': instanceId, 'height': height },
        cache: false,
        success: function () {
            console.log("Successfuly change portlet's height.");
        }
    });
};

var changeWHeight = function (chart_id, instanceId, height) {
    var chart = $j('#' + chart_id).highcharts();
    setHighChartSize(chart, height, $j('#' + chart_id).width());
    updatePortletHeight(instanceId, height);
};

var setHighChartSize = function (chart, height, width) {
    chart.setSize(width, height, false);
    chart.redraw();
};

var toggleDataLabels = function (chart) {
    $j.each(chart.series, function (i, data) {
        var enabled = chart.series[i].options.dataLabels.enabled;
        chart.series[i].update({
            dataLabels: {
                enabled: !enabled
            }
        });
        chart.series[i].options.dataLabels.enabled = !enabled;
    });

    chart.redraw();
};