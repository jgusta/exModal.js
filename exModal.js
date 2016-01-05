/**
 call a div of content directly rather than bind to a link.

	$('#modalDiv').exModal();

 optionally store the returned object to use additional functions:

	 var modal = $('#modalDiv').exModal();
	 modal.exModal('lock');                  // adds attr modal-locked="true"
	 modal.exModal('unlock');                // adds attr modal-locked="false"
	 modal.exModal('close');                 // closes modal

 or you can chain the method if you don't need to store the object:
	$('#modalDiv').exModal().exModal('lock');

 you can pass in an object of options:

	 // default options
	 var myOptions = {
		top: 100,
		overlayOpacity: 0.5,
		closeButton: ".popover-close",  // a jQuery selector that closes the modal when clicked
		overlayID: "ex-overlay",       // the id of the overlay created
		bodyClass: "modal-open",        // class added to the body while active (for hiding scrollbars mainly)
		overlayStyle: {                 // a $.css() style object
			'position':'fixed',
			'z-index':'100',
			'top':'0px',
			'left':'0px',
			'height':'100%',
			'width':'100%',
			'background':'#000'
		},
		fadeInTime: 200,
		fadeOutTime: 200,
		afterLoad: function(){},        // callback after modal fades in. Callback is passed the root object
		afterClose: function(){}        // callback after modal fades out. Callback is passed the root object
		beforeFade: function(){}        // callback right before modal fades in. A chance to tweak the css of
										//   the modal before fading in. Callback is passed the root object
	}
	 $('#modalDiv').exModal(myOptions);

 the modal will close when the overlay is clicked, unless modal-locked="true" is set on the target div.
 .exModal('close') and clicking the closeButton element will always close modal, regardless of modal-locked="true"

 When active, this plugin will add bodyClass (default: "modal-open") class to your body element when running.
 If you have twitter bootstrap's css included, this will hide the scroll bar. If not you can include this style:

	.modal-open {
		overflow: hidden;
	}

 */

(function($){
	$.fn.exModal = function(method) {
		var exModalVersion = "1.1.4";
		var _root = this;
		var modal_frame = $(this);
		var body = $("body");
		var exModalReady = false;
		var methods = {
			init: exModalInit,
			lock: exModalLock,
			unlock: exModalUnlock,
			close: exModalClose,
			version: exModalGetVersion
		};
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			// run init function by default
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on exModal');
		}
		function exModalInit(options) {
			var exModalDefaultSettings = {
				top: 100,
				overlayOpacity: 0.5,
				closeButton: ".popover-close",
				overlayID: "ex-overlay",
				bodyClass: "modal-open",
				overlayStyle: {
					'position':'fixed',
					'z-index':'10000',
					'top':'0px',
					'left':'0px',
					'height':'100%',
					'width':'100%',
					'background':'#000'
				},
				fadeInTime: 200,
				fadeOutTime: 200,
				beforeFade: function(){},
				afterLoad: function(){},
				afterClose: function(){}
			};
			var settings = _root.settings = $.extend(exModalDefaultSettings, options);
			body.append("<div id=\"" + settings.overlayID + "\" style=\"display:none;\"></div>");
			var overlay = _root.overlay = $("#" + settings.overlayID);
			var close_button = $(settings.closeButton);
			overlay.css(settings.overlayStyle);
			return this.each(function() {
				(function() {
					overlay.on("click", function (event) {
						event.preventDefault();
						if (modal_frame.attr('modal-locked') != 'true') {
							exModalClose();
						}
					});
					close_button.on('click', function (event) {
						event.preventDefault();
						exModalClose();
					});
					var modal_width = modal_frame.outerWidth();
					body.addClass(settings.bodyClass);
					overlay.css({'display': 'block', opacity: 0});
					overlay.fadeTo(200, settings.overlayOpacity);
					modal_frame.css({
						'display': 'block',
						'position': 'fixed',
						'opacity': 0,
						'z-index': 11000,
						'left': 50 + '%',
						'margin-left': -(modal_width / 2) + "px",
						'top': settings.top + "px"
					});
					settings.beforeFade(_root);
					modal_frame.fadeTo(settings.fadeInTime, 1, function(){
						settings.afterLoad(_root);
					});
				})();
				_root.exModalReady = true;
			});
		}
		function exModalClose() {
			if(_root.exModalReady === true) {
				var overlay = _root.overlay;
				var settings = _root.settings;
				_root.exModalReady = false;
				overlay.fadeOut(settings.fadeOutTime, function () {
					overlay.remove();
					modal_frame.css({'display': 'none'});
					body.removeClass(settings.bodyClass);
					settings.afterClose(_root);
				});
			}
		}
		function exModalLock() {
			if(_root.exModalReady === true) {
				modal_frame.attr('modal-locked', 'true');
			}
		}
		function exModalUnlock() {
			if(_root.exModalReady === true) {
				modal_frame.attr('modal-locked', 'false')
			}
		}
		function exModalGetVersion() {
			return exModalVersion;
		}
	};
})(jQuery);
