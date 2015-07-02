/***************************************************************************************************************************************************************
 *
 * Collect and zip all files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Archiver = require('archiver');


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Zip: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Zip all files up and send to response
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getZip = function() {
		App.debugging( 'Zip: Compiling zip', 'report' );

		App.response.writeHead(200, {
			'Content-Type': 'application/zip',
			'Content-disposition': 'attachment; filename=GUI-flavour.zip',
		});

		App.zip.archive.pipe( App.response );

		App.zip.archive.finalize(); //send to server

		//clearning up
		App.zip.archive = Archiver('zip'); //new archive
		App.zip.files = []; //empty files
		module.queue = {}; // empty queue

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Add a file to the zip archive
	//
	// @param   content      [string]  The content of the file
	// @param   archivePath  [string]  The path this file will have inside the archive
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.addFiles = function( content, archivePath ) {
		App.debugging( 'Zip: Adding file: ' + archivePath, 'report' );

		if(typeof content !== 'string') {
			App.debugging( 'Zip: Adding file: Zipfile can only be string, is ' + (typeof content), 'error' );
		}
		else {
			App.zip.files.push({ //collecting all files
				content: content,
				name: archivePath,
			});
		}


		if( App.zip.isQueuingEmpty() ) { //if this is the last file, add them all to the archive

			App.zip.files.forEach(function( file ) {
				App.zip.archive.append( file.content, { name: file.name } );
			});

			App.zip.getZip(); //finalize the zip
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Add or remove a type to queue so we can wait for all to be finished
	//
	// @param   type           [string]   Identifier for a type of file we are waiting for
	// @param   _isBeingAdded  [boolean]  Whether or not this type is added or removed from the queue
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.queuing = function( type, _isBeingAdded ) {
		App.debugging( 'Zip: Queuing files', 'report' );

		if( _isBeingAdded ) {
			App.debugging( 'Zip: Queue: Adding ' + type, 'report' );

			App.zip.queue[type] = true;
		}
		else {
			if( App.zip.queue[type] ) {
				App.debugging( 'Zip: Queue: Removing ' + type, 'report' );

				delete App.zip.queue[type];
			}
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Check if the queue is empty
	//
	// @return  [boolean]  Whether or not it is...
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.isQueuingEmpty = function() {
		App.debugging( 'Zip: Checking queue', 'report' );

		for( var prop in App.zip.queue ) {
			if( App.zip.queue.hasOwnProperty(prop) ) {
				App.debugging( 'Zip: Queue: Still things in the queue', 'report' );

				return false;
			}
		}

		App.debugging( 'Zip: Queue: Queue is empty', 'report' );
		return true;
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Global vars
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.queue = {}; //global object to hold queue
	module.archive = Archiver('zip'); //class to add files to zip globally
	module.files = []; //an array of all files to be added to the archive


	App.zip = module;


}(App));