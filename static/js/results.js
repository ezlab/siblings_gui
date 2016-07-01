
(function(){

	function updateContent(content){
		$('#content').html(content);
	}


	function renderMatches(response){

		var matches = {
			colnames: response.colnames,
			data: response.data.slice(0, 100)
		};

		app.render('matches.html', matches).then(updateContent);
	}


	function requestMatches(){

		var state = app.state(),
			url = 'http://siblings.ch/api/matches'

		url += '/' + state.species1;
		url += '/' + state.species2;

		app.load(url).then(renderMatches);
	}

	app.on('navigate', function(params){

		if (!params.species1 || !params.species2){
			return;
		}

		app.set('view', 'data');


		$('#content').html('<div class="s-loading">Loading..</div>');

		requestMatches();
	});


})();
