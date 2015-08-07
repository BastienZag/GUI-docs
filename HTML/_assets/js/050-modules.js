/***************************************************************************************************************************************************************
 *
 * Modules toggeling
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
		App.debugging( 'Modules: Initiating', 'report' );

		if( $('.js-modules').length ) {
			App.debugging( 'Modules: Found instance', 'report' );

			//////////////////////////////////////////////////| CHECKING DEPENDENCIES
			$('.js-blender-version').on('change', function() {
				App.debugging( 'Modules: Version selected', 'interaction' );

				var $this = $(this);
				var module = $this.attr('id');
				var $selected = $this.find('option:selected');
				var version = $selected.attr('data-version');
				var $version = $('.js-blender-module' + module + ' .js-blender-version' + version);
				var $modules = $('.js-blender-module' + module + ' .js-blender-versionhtml');

				if( $this.val() !== 'nil' ) {
					$modules.removeClass('is-visible');
					$version.addClass('is-visible');
				}
			});
		}
	};


	App.module = module;


}(App));


// start the module
App.module.init();