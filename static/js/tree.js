
(function(){


	function init(tree, tpl){

		var options	= {
			source: tree.data,
			icons: false,
			checkbox: true,
			selectMode: 3
		};


		var template = Handlebars.compile(tpl);

		options.renderTitle = function(event, data) {
			if (!data.node.statusNodeType){
				data.node.title = template(data.node);
			}
		};

		function title(event, data) {
			if (!data.node.statusNodeType){
				data.node.title = app.templates.tree(data.node);
			}
		};

		// creating the tree component
		var tree = $(".s-sidebar-tree1").fancytree(options).fancytree("getTree");
	}


	function extract(data){
		return data;
	}

	app.on('init', function(){

		var tree = $.getJSON('static/data/oma.json').then(extract),
			tpl = $.get('static/templates/tree.html').then(extract);

		return $.when(tree, tpl).then(init);

	});



})();
