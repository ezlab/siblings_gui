
(function(){

	var fields = {},
		lists = {};


	function submit(e){
		if ((e.keyCode || e.which) == 13){
			$(this).blur();
			window.setTimeout(function(){
				$('#submit-button').click();
			}, 0);
		}
	}


	function bind(){

		var field = $(this),
			name = field.attr('data-field');

		function getState(){
			field.filter('DIV').html(app.get(name));
			field.filter('INPUT,SELECT').val(app.get(name));
		}

		app.on('ready', getState);
		app.on(name, getState);

		function setState(){
			app.set(name, field.val());
		}

		if (this.tagName == 'INPUT'){
			field.blur(setState);
			field.keypress(submit);
		}

		if (this.tagName == 'SELECT'){
			field.change(setState);
		}

		fields[name] = field;
	}



	app.on('init', function(){

		$('input[data-field]').each(bind);
		$('select[data-field]').each(bind);
		$('.s-sidebar-data').each(bind);

	});



})();
