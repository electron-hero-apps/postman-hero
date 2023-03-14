var currentEditableItem;
var oldText;
var currentListItem;
var lastUpdate;
var newDoc;

const {
	remote
} = require('electron')
const {
	Menu,
	MenuItem
} = remote

const contextMenu = new Menu()

contextMenu.append(new MenuItem({
	label: 'New Collection',
	click() {
		// var filePath = localStorage.getItem('currentPath');
		// var fileContent = "";
		// var filename = "untitled.txt";
		// fs.writeFile(path.join(filePath, filename), fileContent, (err) => {
		// 	if (err) throw err;
		// 	buildTreeView('#files', localStorage.getItem('currentPath'))
		// });
		console.log('adding here....');
		treeViewJSON.items.push({
			name: 'New Collection',
			id: 'folder-1',
			type: 'folder',
			data: {},
			folderChildren: []
		});
		localStorage.setItem('treeView', JSON.stringify(treeViewJSON));
		$('#files').empty();
		buildTreeViewFromJSON('#files', treeViewJSON)

	}
}))



const fileContextMenu = new Menu();

fileContextMenu.append(new MenuItem({
	label: 'Rename',
	click() {
		console.log('here in rename click');

		// console.log($(currentListItem).data().path[0].name = 'Fuck You');
		// $('#files').empty();
		// console.log(JSON.stringify(treeViewJSON));
		// localStorage.setItem('treeView', JSON.stringify(treeViewJSON));
		// buildTreeViewFromJSON('#files', treeViewJSON);

		$(currentListItem).attr('contenteditable', true);
		oldText = $(currentListItem).html();
		lastUpdate = oldText;
		$(currentListItem).focus();


	}
}));

fileContextMenu.append(new MenuItem({
	label: 'Delete',
	click() {
		if (confirm("Are you sure?") === true) {
			//var filePath = localStorage.getItem('currentPath');
			var filePath = $(currentListItem).data('path');

			fs.unlink(filePath, function(err, data) {
				if (err) {
					alert(err)
				}
				buildTreeView('#files', localStorage.getItem('currentPath'))
			});
		}
	}
}));


const folderContextMenu = new Menu();

folderContextMenu.append(new MenuItem({
	label: 'Rename',
	click() {
		console.log('here in rename click');
		$(currentListItem).attr('contenteditable', true);
		oldText = $(currentListItem).html();
		$(currentListItem).focus();
	}
}));

folderContextMenu.append(new MenuItem({
	label: 'Delete',
	click() {
		if (confirm("Are you sure?") === true) {
			var index = treeViewJSON.items.indexOf($(currentListItem).data('folderJSON'));
			treeViewJSON.items.splice(index,1);
			localStorage.setItem('treeView', JSON.stringify(treeViewJSON));
			$('#files').empty();
			buildTreeViewFromJSON('#files', treeViewJSON)
		}
	}
}));

folderContextMenu.append(new MenuItem({
	label: 'Add Document',
	click() {
		var index = treeViewJSON.items.indexOf($(currentListItem).data('folderJSON'));
		console.log('index === ' + index);
		console.log('json === ' + JSON.stringify(treeViewJSON.items[index]));
		var children = (treeViewJSON.items[index].folderChildren);
		console.log(children.length);
		console.log(typeof(children));
		newDoc = {
			name: 'New document',
			id: 'file-1',
			type: 'file',
			data: {}
		}
		children.push(newDoc);
		$('#files').empty();
		console.log(JSON.stringify(treeViewJSON));
		localStorage.setItem('treeView', JSON.stringify(treeViewJSON));

		buildTreeViewFromJSON('#files', treeViewJSON);
	}
}));

folderContextMenu.append(new MenuItem({
	label: 'Add Sub-Folder',
	click() {
		// if (confirm("Are you sure?") === true) {
		// 	var filePath = localStorage.getItem('currentPath');
		// 	var filename = $(currentListItem).html();
		// 	fs.unlink(path.join(filePath, filename), function(err, data) {
		// 		if (err) {
		// 			alert(err)
		// 		}
		// 		buildTreeView('#files', localStorage.getItem('currentPath'))
		// 	});
		// }
	}
}));



// folderContextMenu.append(new MenuItem({
// 	label: 'New File',
// 	click() {
// 		console.log('new file...');
// 		var folderPath = $(currentListItem).data('path');
// 		console.log(folderPath);
// 		var fileContent = 'no information yet';
// 		var filename = "untitled.txt";
// 		fs.writeFile(path.join(folderPath, filename), fileContent, (err) => {
// 			if (err) throw err;
// 			buildTreeView('#files', localStorage.getItem('currentPath'))
// 		});
// 	}
// }));
//
// folderContextMenu.append(new MenuItem({
// 	label: 'New Folder',
// 	click() {
// 		var folderPath = $(currentListItem).data('path');
// 		fs.mkdir(path.join(folderPath, 'New Folder'), function(err, data){
// 			console.log(err);
// 			console.log('created');
// 		});
// 	}
// }));


window.addEventListener('contextmenu', (e) => {
    console.log('here in context');
	e.preventDefault();
	var x = e.clientX;
	var y = e.clientY;
	var el = document.elementFromPoint(x, y);
	if ($(el).hasClass('nav-group-collections')) {
		console.log('here in nav-group')
		currentListItem = el;
		contextMenu.popup({
			window: remote.getCurrentWindow()
		})
	}

	// if ($(el).hasClass('file-item')) {
	// 	currentListItem = el;
	// 	fileContextMenu.popup({
	// 		window: remote.getCurrentWindow()
	// 	})
	// }
	//
	if ($(el).hasClass('folder-item')) {
		console.log('here in folder item')
		currentListItem = el;
		folderContextMenu.popup({
			window: remote.getCurrentWindow()
		})
	}

	if ($(el).hasClass('file-item')) {
		console.log('here in file item')
		currentListItem = el;
		fileContextMenu.popup({
			window: remote.getCurrentWindow()
		})
	}



}, false)


// function handleFileItemRightClick(event) {
// 	console.log('here in right click')
// 	currentEditableItem = $(this);
// 	$(this).attr('contenteditable', true);
// 	oldText = $(this).html();
// 	$(this).focus();
// 	event.stopPropagation();
// }

function handleFileItemKeyDown(event) {

	lastUpdate = $(currentListItem).html();

	if (event.keyCode === 13 || event.keyCode === 27) {

		if (event.keyCode === 27) {
			$(currentListItem).html(oldText);
		}

		if (event.keyCode === 13) {


			$(currentListItem).html = lastUpdate;

			_.find(treeViewJSON, function(value, key){
				console.log(value);
			});
			console.log('done');



			// var index = treeViewJSON.items.indexOf($(currentListItem).data('folderJSON'));
			// treeViewJSON.items[index].name = $(currentListItem).html();
			// localStorage.setItem('treeView', JSON.stringify(treeViewJSON));
			// $('#files').empty();
			// buildTreeViewFromJSON('#files', treeViewJSON)
		}

		$(currentListItem).removeAttr('contenteditable');
		$(currentListItem).blur();

	}
}
