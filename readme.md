DasPico Content Management System
---------------------------------

This CMS is designed to be used with multiple back ends and provide a simple to integrate and use front end.

It's built on jQuery, jQuery UI, and TinyMCE

It expects the backed to provide JSON objects in a REST based style. 

Example Front End Integration
============================

Integrate into the web page using data-cms attributes. This initial values can be either loaded by the server
or added client side AJAX by DasPico.

### Basic integration without autoloading

	<link rel="stylesheet" href="ui-lightness/jquery-ui-1.8.9.custom.css" type="text/css"/>
	<style>
		.daspicocms-edit { background:#ededed; display:inline; padding:5px; }
	</style>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js" type="text/javascript"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="/javascripts/tiny_mce/jquery.tinymce.js"></script>

	<script src="/javascripts/jquery.daspicocms.js" type="text/javascript"></script>

	<script type="text/javascript">
		$(function() {
			$('div[data-cms]').daspicocms({
				showedits:true,
				contentResource:'contents/{id}.json'
			});
		});		
	</script>

	... 

	<div id="main-content" data-cms="main">CMS Content</div>


Example Back End Interface
=========================

Assumptions:

* Security is handled in the back end interface.
* The PUT method will create the content if it doesn't exist.

	GET /contents/{pageid}.json

	content {
		value:<p>CMS content</p>
	}



	PUT /contents/{pageid}.json

	<p>New CMS Content</p>


	content {
		value:<p>New CMS Content</p>
	}


License
-------
BSD License
