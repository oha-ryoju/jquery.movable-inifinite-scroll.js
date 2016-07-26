$.fn.movableInifiniteScroll = function() {
	var target = this;

	$(target).mousedown(function (event) {
		$(this)
			.data('down', true)
			.data('x', event.clientX)
			.data('y', event.clientY);
		
		return false;
		
	})
		.css({'overflow': 'hidden', 'cursor': 'move'})
		.data('scrollLeft', 0);

	$(target).mousemove(function (event) {
		if ($(target).data('down') == true) {

			var scrollLeft = -($(target).data('scrollLeft') + $(target).data('x') - event.clientX);
			var width = $(target).find('li').width();

			var count = Math.floor(-scrollLeft/width);

			$(target).children().eq(0).css({left: scrollLeft + ((count != 0 && count % 2 != 0)? width * (count + 1): width * (count))});
			$(target).children().eq(1).css({left: scrollLeft + ((count % 2 == 0)? width * (count + 1): width * (count))});
			
			return false;
		}
	})
	
	$(target).mouseup(function (event) {
		$(target)
			.data('down', false)
			.data('scrollLeft', $(target).data('scrollLeft') + $(target).data('x') - event.clientX);
	});

	return this;
}