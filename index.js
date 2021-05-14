const ipc = require('electron')
	.ipcRenderer
let nodeRequirePath = ipc.sendSync('getRequirePath') + 'node_modules/';
window.$ = window.jQuery = require(nodeRequirePath + 'jquery');
var path = require(nodeRequirePath + 'path');
var fs = require('fs');
var _ = require(nodeRequirePath + 'lodash');
var Client = require('ssh2')
	.Client;

var treeViewJSON;


$(document)
	.ready(function() {




		$(document).on("dragover", "span.nav-group-item", function(e) {
			e.preventDefault();
			$(e.target).addClass('dropBorder').removeClass('noDropBorder');
		}).bind("dragleave drop", function(e) {
			e.preventDefault();
			$(e.target).removeClass('dropBorder').addClass('noDropBorder');
		});

		$(document)
			.on('click', '.icon.opener', handleOpenerClick);
		$(document)
			.on('click', '.nav-item-text', handleItemClick);
		$(document)
			.on('click', '.clickable-nav-item', handleFileItemClick);
		$(document)
			.on('keydown', '.folder-item', handleFileItemKeyDown);


		// var treeViewJSON = {
		// items: [{
		// 	name: 'Servers',
		// 	id: 'folder-1',
		// 	type: 'folder',
		// 	data: {},
		// 	folderChildren: [{
		// 		name: 'new Folder',
		// 		type: 'folder'
		// 	}, {
		// 		name: 'Raspberry Pi 1',
		// 		id: 'file-1',
		// 		type: 'file',
		// 		extraInfo: {
		// 			ipAddress: '',
		// 			username: '',
		// 			password: ''
		// 		}
		// 	}, {
		// 		name: 'Raspberry Pi 2',
		// 		id: 'file-2',
		// 		type: 'file',
		// 		extraInfo: {
		// 			ipAddress: '',
		// 			username: '',
		// 			password: ''
		// 		}
		// 	}]
		// }, {
		// 	name: 'Packages',
		// 	id: 'folder-2',
		// 	type: 'folder',
		// 	folderChildren: [{
		// 		name: 'Disk Utils',
		// 		type: 'folder',
		// 		folderChildren: [{
		// 			name: 'List',
		// 			id: 'file-1',
		// 			type: 'file',
		// 			extraInfo: {
		// 				packageDir: 'diskUtils',
		// 				startPage: 'diskUtils.html'
		// 			},
		// 		}]
		// 	}]
		// }, {
		// 	name: 'Three',
		// 	id: 'folder-3',
		// 	type: 'folder',
		// 	data: {}
		// }]

		// }
		treeViewJSON = JSON.parse(localStorage.getItem('treeView'));
		if (!treeViewJSON) {
			console.log('defaulting items');
			treeViewJSON = {
				items: []
			}
		}
		buildTreeViewFromJSON('#files', treeViewJSON)
		//buildTreeView('#files', __dirname);

	});
