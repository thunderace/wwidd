////////////////////////////////////////////////////////////////////////////////
// General Button Control
////////////////////////////////////////////////////////////////////////////////
/*global jQuery, wraith, window */
var app = app || {};

app.widgets = function (widgets, $, wraith) {
	widgets.button = function (caption, onClick) {
		var self = wraith.widget.create();
			
		//////////////////////////////
		// Getters / setters

		self.caption = function (value) {
			if (typeof value !== 'undefined') {
				caption = value;
				return this;
			} else {
				return caption;
			}
		};

		self.onClick = function (value) {
			if (typeof value !== 'undefined') {
				onClick = value;
				return this;
			} else {
				return onClick;
			}
		};
		
		//////////////////////////////
		// Overrides

		self.contents = null;
		
		self.html = function () {
			return [
				'<span id="', self.id, '" class="w_button ', onClick ? '' : 'idle', '" ', self.disabled() ? 'disabled="disabled"' : '', '>',
				this.contents ?
					this.contents() :
					'<span class="caption">' + (caption || '') + '</span>',
				'</span>'
			].join('');
		};
		
		return self;
	};
	
	//////////////////////////////
	// Static event bindings
	
	$('.w_button').live('click', function (event, popup) {
		var $this = $(this).closest('.w_button'),
				self = wraith.lookup($this),
				onClick = self.onClick();

		// calling handler
		if (onClick && !self.disabled()) {
			return onClick.call(this);
		}
	});
	
	return widgets;
}(app.widgets || {},
	jQuery,
	wraith);
