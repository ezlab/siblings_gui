
(function(){

	function include(file){
		document.write('<script src="static/js/' + file + '" type="text/javascript"><\/script>');
	}

	include('application.js');
	include('errors.js');
	include('navigation.js');
	include('render.js');
	include('pages.js');
	include('params.js');
	include('sidebar.js');
	include('tree.js');

})();
