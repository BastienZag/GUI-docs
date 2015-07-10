/***************************************************************************************************************************************************************
 *
 * Compile HTML files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'HTML: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Get all html files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.get = function() {
		App.debugging( 'HTML: Getting all HTML files', 'report' );

		var index = Fs.readFileSync( App.TEMPPATH + 'index.html', 'utf8');

		index = _.template( index )({ //render the index template
			_hasJS: App.selectedModules.js,
			_hasSVG: App.selectedModules.svg,
			blendURL: App.banner.getFlavourURL( App.selectedModules.brand ),
			blendURLBOM: App.banner.getFlavourURL( 'BOM' ),
			blendURLBSA: App.banner.getFlavourURL( 'BSA' ),
			blendURLSTG: App.banner.getFlavourURL( 'STG' ),
			blendURLWBC: App.banner.getFlavourURL( 'WBC' ),
			GUIRURL: App.GUIRURL + App.selectedModules.brand + '/blender/',
		});

		App.zip.queuing('html', false); //html queue is done
		App.zip.addFile( index, '/GUI-flavour/index.html' );

	};


	App.html = module;


}(App));