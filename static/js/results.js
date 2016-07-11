
(function(){

	function updateContent(content){
		$('#content').html(content);
	}


	function speciesName(key){
		var node = app.getNode(key);
		return node ? node.data.name : '';
	}


	function renderMatches(response){

		var state = app.state();

		var	matches = {
			state: state,
			species1: speciesName(state.species1),
			species2: speciesName(state.species2),
			filter: state.filter,
			colnames: response.colnames,
			data: response.data.slice(0, 100)
		};

		app.render('matches.html', matches).then(updateContent);
	}


	function requestMatches(){

		var state = app.state(),
			url = 'http://siblings.ch/api/matches';

		url += '/' + state.species1;
		url += '/' + state.species2;
		url += '/?limit=100&idtype=Source';

		var cfg = {
			url: url,
			method: 'POST',
			data: JSON.stringify({'filter': state.filter || ''}),
			processData: false,
			contentType: 'application/json',
			dataType: 'json'
		};

		app.request(cfg).then(renderMatches);
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
