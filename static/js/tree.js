
(function(){

	var tree1,
		tree2,
		template;


	function selectNodes(tree, value){

		var nodes = tree.getSelectedNodes(true);

		$.each(nodes, function(index, node){
			if (node.key !== value){
				node.setSelected(false);
			}
		});

		var node = tree.getNodeByKey(String(value));

		if (node && !node.selected){
			node.setSelected();
			node.setActive();
		}
	}

	app.on('species1', function(value){
		selectNodes(tree1, value);
	});

	app.on('species2', function(value){
		selectNodes(tree2, value);
	});


	function initTree(selector, param, source){

		// see list of options at
		// http://www.wwwendt.de/tech/fancytree/doc/jsdoc/global.html#FancytreeOptions

		var options	= {
			source: source,
			icons: false,
			checkbox: true,
			clickFolderMode: 2,
			selectMode: 1
		};


		options.createNode = function(event, data){

			var node = data.node;

			if (node.children){
				node.folder = true;
				node.unselectable = true;
				node.hideCheckbox = true;
			}
		};


		options.renderTitle = function(event, data) {
			if (!data.node.statusNodeType){
				data.node.title = template(data.node);
			}
		};


		options.click = function(event, data){

			var node = data.node;

			if (node && !node.children && data.targetType == 'title'){
				node.setSelected(true);
			}
		};


		options.select = function(event, data){

			var sel = data.tree.getSelectedNodes(true);

			app.set(param, sel.length ? sel[0].key : '');

		};


		// creating the tree component
		var tree = $(selector).fancytree(options).fancytree("getTree");

		return tree;
	}


	function init(tree, tpl){

		template = Handlebars.compile(tpl);

		tree1 = initTree('#tree-1', 'species1', tree.data);
		tree2 = initTree('#tree-2', 'species2', tree.data);
	}


	app.getNode = function(key){
		return tree1.getNodeByKey(String(key));
	};


	app.selectTab = function(i){

		var selected = 's-sidebar-tab-selected',
			hidden = 's-hidden';

		if (i == 2) {
			$('#tab-1').removeClass(selected);
			$('#tab-2').addClass(selected);

			$('#wrap-1').addClass(hidden);
			$('#wrap-2').removeClass(hidden);
		}
		else {
			$('#tab-1').addClass(selected);
			$('#tab-2').removeClass(selected);

			$('#wrap-1').removeClass(hidden);
			$('#wrap-2').addClass(hidden);
		}
	};


	function extract(data){
		return data;
	}

	app.on('init', function(){

		var tree = $.getJSON('static/data/oma.json').then(extract),
			tpl = $.get('static/templates/tree.html').then(extract);

		return $.when(tree, tpl).then(init);

	});



})();
