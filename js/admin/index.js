$(function()
{
	$('.widget:not(.widget-medium,.widget-small,.widget-package) .widget-content').mCustomScrollbar({theme: 'dark-thin'});
	$('.widget-small-config').bind('click', function(e){window.location = intelli.config.admin_url + '/plugins';});

	$('.widget-medium .js-stats').each(function(i, obj)
	{
		var $this = $(obj);
		var data = $this.data();
		$this.sparkline(data.array.split(','), {type: 'bar', barColor: '#f26d7e', height: '65px', barWidth: '10px', barSpacing: '4px', zeroAxis: 'false'});
	});

	$('.widget-package .js-stats').each(function(i, obj)
	{
		var $this = $(obj);
		var data = $this.data();

		var statGroups = data.array.split('|');
		var statLabels = data.statuses.split('|');

		if (statGroups.length > 0)
		{
			var max = data.max || 100;
			$this.sparkline('html', {fillColor: false, changeRangeMin: 0, lineWidth: 2, spotRadius: 0, spotColor: '', chartRangeMax: max, height: '65px', width: '280px'});
			var colors = ['#2ecc71', '#f39c12', '#3498db', '#7f8c8d', '#a864a8', '#95a5a6'];
			var colorIndex = 1;

			for (var j = 0; j <= statGroups.length; j++)
			{
				if (!statGroups[j]) continue;

				$this.sparkline(statGroups[j].split(','), {composite: true, lineWidth: 2, spotRadius: 0, spotColor: '', fillColor: false, lineColor: colors[colorIndex - 1], changeRangeMin: 0, chartRangeMax: max, height: '65px', width: '280px',
					tooltipPrefix: statLabels[j].charAt(0).toUpperCase() + statLabels[j].slice(1) + ' - '
				});

				if (colorIndex == colors.length) colorIndex = 0;
				colorIndex++;
			}
		}
	});

	if ($('#js-disabled-widgets-list').length) // CUSTOMIZATION MODE
	{
		var dc_widget_tools =
			'<div class="widget-tools">'+
			  '<div class="widget-tools-btns">'+
			    '<a href="#" class="js-dc-disable"><i class="i-switch"></i></a> '+
			  '</div>'+
			'</div>';
		//var dc_quick_link_tools = $('<li class="dc-form"><form class="sap-form"><label>Add quick link</label><input type="text" placeholder="Shor name ..." class="input-small"><select class="input-small"><option>-- Choose link --</option><option>sadfasdfsadf</option><option>sadfasdfsadf</option></select><a href="#" class="js-dc-add-link btn btn-primary btn-small btn-block">Add</a></form></li>');

		$('.widget')
			.css({bottom: 0, opacity: 1})
			.not('.widget-small-config').append(dc_widget_tools);

		var i;
		var disabledWidgetsList = String($('#js-disabled-widgets-list').val()).split(',');
		for (i in disabledWidgetsList)
		{
			$('#widget-' + disabledWidgetsList[i])
				.find('.widget-tools').addClass('widget-tools-disabled');
		}

		$('#js-cmd-save').on('click', function(e)
		{
			$(this).attr('href', $(this).attr('href') + '&list=' + disabledWidgetsList.join(','));
		});

		$('.js-dc-disable').on('click', function(e)
		{
			e.preventDefault();

			var $tools = $(this).closest('.widget-tools');

			var widgetId  = $(this).closest('.widget').attr('id');
			widgetId = widgetId.split('widget-')[1];

			if (!$tools.hasClass('widget-tools-disabled'))
			{
				// $('span', this).text('Switch OFF');
				$tools.addClass('widget-tools-disabled').closest('.widget').addClass('widget-disabled');
				disabledWidgetsList.push(widgetId);
			}
			else
			{
				// $('span', this).text('Switch ON');
				$tools.removeClass('widget-tools-disabled').closest('.widget').removeClass('widget-disabled widget-inactive').addClass('widget-active');
				disabledWidgetsList.splice(disabledWidgetsList.indexOf(widgetId), 1);
			}
		});
	}
});

$(window).load(function()
{
	if (!$('#js-disabled-widgets-list').length)
	{
		$('#widget-preloader').remove();
		$('.widget:not(.widget-inactive)').each(function(i)
		{
			var item = $(this);
			setTimeout(function()
			{
				item.animate({bottom: 0, opacity: 1});
			}, i * 150);
		});
	}
});