
(function(){

	var names = ['species1', 'species2'];


	function updateState(params, state){

		if (!params.species1 || !params.species2){
			return;
		}

		$.each(names, function(index, name){
			app.set(name, params[name]);
		});

	}


	function sendRequest(){

		var params = {},
			state = app.state();

		$.each(names, function(index, name){
			params[name] = state[name];
		});

		app.navigate('', params);
	}


	function init(){

		//app.set('species1', '83332');
		//app.set('species2', '83332');

		$('#submit-button').click(sendRequest);
	}


	app.on('navigate', updateState);
	app.on('init', init);

})();

