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
			autoload:false,
      tinymceopts:{
        // Location of TinyMCE script
        script_url : '/javascripts/tiny_mce/tiny_mce.js',

        // General options
        theme : "advanced",
        plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

        // Theme options
        theme_advanced_buttons1 : "mylistbox,mysplitbutton,bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,bullist,numlist,undo,redo,link,unlink",
        theme_advanced_buttons2 : "",
        theme_advanced_buttons3 : "",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_statusbar_location : "bottom",
        theme_advanced_resizing : true,

        // Drop lists for link/image/media/template dialogs
        template_external_list_url : "lists/template_list.js",
        external_link_list_url : "lists/link_list.js",
        external_image_list_url : "lists/image_list.js",
        media_external_list_url : "lists/media_list.js",

      }
		};

		// extends defaults with options provided
		if (options) {
			$.extend(defaults, options);
		}
	
		if (!'contentResource' in defaults)
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

					$('<div><form id="jumpcms-edit"><textarea id="value" name="value" rows="10" cols="80" style="width: 98%" class="tinymce"></textarea></form></div>')
          .dialog({
						modal:true,
						title:$(evnt.target).attr('data-cms'),
            width:800,
            height:400,
						buttons:{
							cancel:function() { $(this).dialog('close'); },
							save:function() { 
                console.log('saving content');
                $.post(defaults.contentResource + '/' + contentId, $("#jumpcms-edit").serialize(), function(data) {
                  $(this).dialog('close'); 
                });
              }
						},
            open: function() { 
              $.getJSON(defaults.contentResource + '/' + contentId + '.json', {}, function(data) {
                console.log(defaults.tinymceopts);
                $('textarea.tinymce').val(data.content.value).tinymce(defaults.tinymceopts);
              });
              
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

