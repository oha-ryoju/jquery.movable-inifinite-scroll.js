$.fn.movableInifiniteScroll = function() {
	var target = this;

	var touchX = 0;

	$(target).on('mousedown touchstart', function (event) {
		touchX = (event.type == 'touchstart')? event.originalEvent.touches[0].pageX : event.clientX;
		$(this)
			.data('down', true)
			.data('x', touchX);
		
		return false;
		
	})
		.css({'overflow': 'hidden', 'cursor': 'move'})
		.data('scrollLeft', 0)

	$(target).on('mousemove touchmove', function (event) {
		if ($(target).data('down') == true) {
			touchX = (event.type == 'touchmove')? event.originalEvent.touches[0].pageX : event.clientX;
			var scrollLeft = -($(target).data('scrollLeft') + $(target).data('x') - touchX);
			var width = $(target).children().eq(0).width();

			var count = Math.floor(-scrollLeft / width);

			$(target).children().eq(0).css({left: scrollLeft + ((count != 0 && count % 2 != 0)? width * (count + 1): width * (count))});
			$(target).children().eq(1).css({left: scrollLeft + ((count % 2 == 0)? width * (count + 1): width * (count))});
			
			return false;
		}
	})
	
	$(target).on('mouseup touchend', function (event) {
		//No available pageX

		$(target)
			.data('down', false)
			.data('scrollLeft', $(target).data('scrollLeft') + $(target).data('x') - touchX);
	});

	return this;
}