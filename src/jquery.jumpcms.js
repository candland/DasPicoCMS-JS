/*
* A jQuery plugin template
* Basically used as personal reference
*
* Author: Andy Goh (hantu)
* Website: http://www.andygoh.net
*
* Revisions:
* 0.1 - Initial commit
*
* References:
* http://www.learningjquery.com/2007/10/a-plugin-development-pattern
* http://docs.jquery.com/Plugins/Authoring
*
* Notes:
* - Good idea to name your file jquery.pluginName.js
*   thx: https://github.com/hantu/jquery-plugin-template
*/
(function($) {

	$.fn.jumpcms = function(options) {
		// plugin default options
		var defaults = {
			autoload:false
		};

		// extends defaults with options provided
		if (options) {
			$.extend(defaults, options);
		}
	
		if (!'contentResource' in options)
			throw 'Please provide restroot in the options.';

		// iterate over matched elements
		var contents = this;
		return this.after(function(index) {
			return $('<div>edit</div>')
				.attr('data-target', $(contents[index]).attr('id')) // err if no id
				.attr('data-cms', $(contents[index]).attr('data-cms')) // err if no id
				.addClass('jumpcms-edit')
				.click(function(evnt) { 
					var contentId = encodeURIComponent(window.location.pathname + '#' + $(evnt.target).attr('data-cms'));
					var targetId = $(evnt.target).attr('data-target');

					$('<div></div>').load(options.contentResource + '/' + contentId).dialog({
						modal:true,
						title:$(evnt.target).attr('data-cms'),
						buttons:{
							cancel:function() { $(this).dialog('close'); },
							save:function() { console.log('saving content');$(this).dialog('close'); }
						}
					});

					console.log(contentId+'\n'+targetId); 
				});
		});
	};

	// public functions definition
	$.fn.jumpcms.functionName = function(foo) {
		return this;
	};

	// private functions definition
	function foobar() {}

})(jQuery);

