/**
 * UniMelb Metadata show hide
 * @authors dkevey@unimelb.edu.au
 */
 
EasyEdit.plugins.metadataShowHide = {
  init: function() {
    var self = this;
      // Add a function to the screen load event
      EasyEditEventManager.bind('EasyEditScreenLoad', function() {
      //check if we are on the metadata screen, if so, call this function
      if (EasyEditScreens.getCurrentScreenName() == 'Metadata') {
         // initate the function
         iniMetadataShowHide();
         console.log('Metadata show hide plugin loaded');
      }
    });
  }
};

function iniMetadataShowHide() {
    // uncheck all the check boxes - note this may affect conditional settings on paint layouts
    $("span").find('.sq-metadata-default-wrapper [id$=_default]:checked').each(function(){
        $(this).click();
    });

    // Add classname so we can style section description
    $("div").find('span:contains("Section Description")') 
        .parent(self.rowSelector)
        .addClass('section-description');

      // alert('metadata loaded');
	
	
	// Identify the page template field and the current selection
    var pageTemplatefield = $('#ees_editMetadata .row:contains("Page type")').find("select.typeSelect");
    // Identify the page template default checkbox
    var defaultTemplate = $('#ees_editMetadata .row:contains("Page type")').find("input.sq-form-field.defaultCheckbox");
    // Remove 'undefined' notes from form
    $('#ees_editMetadata .row_0 .notes').remove();
 
	
	
	
}