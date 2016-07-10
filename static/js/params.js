
(function(){

	var names = ['species1', 'species2', 'filter'];


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
		$('#submit-button').click(sendRequest);
	}


	app.on('navigate', updateState);
	app.on('init', init);

})();

