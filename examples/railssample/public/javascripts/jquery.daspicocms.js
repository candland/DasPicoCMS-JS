/* DasPico CMS
 *
 * Copyright (c) 2011, Dusty Candland
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright notice, 
 *       this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice, 
 *       this list of conditions and the following disclaimer in the documentation 
 *       and/or other materials provided with the distribution.
 *     * Neither the name of the <ORGANIZATION> nor the names of its contributors may 
 *       be used to endorse or promote products derived from this software without 
 *       specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */
(function($) {

	$.fn.daspicocms = function(options) {
		// plugin default options
		var defaults = {
			autoload:false,
      showedits:true,
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
      },
      dialogopts:{
        autoOpen:false,
        modal:true,
        width:800,
        height:400,
      },
      contentResource:'/contents/{id}.json',
      getContentValue:function(data) { return data.content.value; }
		};

		// extends defaults with options provided
		if (options) {
			$.extend(defaults, options);
		}

    // err if no id// err if no id


		// iterate over matched elements
		var contents = this;
    
    var $dialog = $('<div></div>')
      .html('<form id="cms-form"><input type="hidden" name="_method" value="put"/><textarea id="content_value" name="content[value]" rows="10" cols="80" style="width: 98%; height:100%" class="tinymce"></textarea></form>')
      .dialog(defaults.dialogopts);
    $('textarea.tinymce').tinymce(defaults.tinymceopts)

    contents.each(function(index) {
      var content = $(contents[index]);
      var contentId = content.attr('data-cms');

      if (defaults.autoload) {
        content.html('loading...');
        $.getJSON(buildContentUrl(defaults, getContentId(content)), {}, function(data) {
          content.html(defaults.getContentValue(data));
        });
      } // /autoload
      
      if (defaults.showedits) {
        content.after(function(ndex) {
          return $('<div>edit</div>')
          .attr('data-cms', contentId) 
          .addClass('daspicocms-edit')
          .click(function(evnt) { 
            $dialog.dialog('option', {
              title:contentId,
              buttons:{
                cancel:function() { $(this).dialog('close'); },
                save:function() { 
                  console.log('saving content');
                  var dialogBox = $(this);
                  $.post(buildContentUrl(defaults, getContentId(content)), $("#cms-form").serialize(), function(data) {
                    content.html(defaults.getContentValue(data))
                    $(dialogBox).dialog('close'); 
                  });
                }
              },
              open: function() { 
                console.log('test '+buildContentUrl(defaults, getContentId(content)));
                $.getJSON(buildContentUrl(defaults, getContentId(content)), {}, function(data) {
                  $('textarea.tinymce').val(defaults.getContentValue(data));
                });
              }
            });
            $dialog.dialog('open');
          });
        });
      } // /showedits
		});

    return this;
	};

	// private functions definition
	function getContentId(element) {
    return encodeURIComponent(window.location.pathname + '#' + $(element).attr('data-cms'));
  }

  function buildContentUrl(options, contentId) {
    return options.contentResource.replace(/\{id\}/, contentId);
  }

})(jQuery);

