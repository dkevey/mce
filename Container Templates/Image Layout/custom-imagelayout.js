/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Image Layout
 * dkevey@unimelb.edu.au based on Squiz templates
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateImageLayout';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.1',
    className: 'content-template-imagelayout',
    classNameInit: 'content-template-imagelayout--initialised',

    init: function() {
      var self = this;

      if (!this.initialised) {

        // Initialise container editor when authoring interface is ready
        if (typeof EasyEditEventManager != 'undefined'){

          // Initialise for Edit+ each time Content tab is loaded
          EasyEditEventManager.bind('EasyEditScreenLoad',function(){
            if (EasyEditScreens.currentScreen == 'contentPageStandard') {
              self.onScreenLoad();
            }
          });

        } else {

          // Initialise for Admin Interface
          $(document).ready($.proxy(self.onScreenLoad,self));
        }

        this.initialised = true;
        console.log(self.name, self.version, 'initialised');
      }

    },

    onScreenLoad: function() {
      // Initialise all Content Template listing
      var self = this;		
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      $contentTemplates.each(function(){
        var $contentTemplate = $(this);
         
        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

     });	
      // show hide fields
      var toggleTemplateType = function(parentScope){
          
          var $templateSelect = $('[id$="_metadata_field_select_5908"]',parentScope);
	  	  
		  // define the rows you want to show and hide
		  var $headingRow = $('.row_1',parentScope);
		  
		  // show or hide additional fields in template
		  // note: this fires on page load
		   if ($templateSelect.val() === 'full-width' ||
			   $templateSelect.val() === 'fullwidth-bottom')
			  
			    {
              	  $headingRow.hide();
				
			 	} else if ($templateSelect.val() === 'fullwidth-mid')
				
				{
				  $headingRow.show();
              	} 
		     
          // toggle additional fields when changing template
		  // note: after page load this is how you change templates - basically the same as above
          $templateSelect.change(function(evt){

             if  (evt.target.value === 'fullwidth-mid')

				{
                  $headingRow.show();
            
              } else if (evt.target.value === 'fullwidth-bottom' ||
						 evt.target.value === 'full-width' )

				{
                  $headingRow.hide();
              }
          });
      };
		
	  // toggle thumbnails	
      var populateTemplateThumbs = function(){
       $('.content-template-imagelayout').each(function(){
           var $thisPrime = $(this);

           toggleTemplateType($thisPrime);

           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_5908"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_5908_field"]', $thisPrime);

           // test to see if selector is a dropdown not radio buttons
           if ($selectElm.length > 0) {
               $('<div>', {class: 'select-thumb'}).appendTo($selectElmParent);
               $('.select-thumb', $thisPrime).addClass('selected-' + $selectElm.val() );
               $selectElm.change(function(evt){
                   $('.select-thumb', $thisPrime).prop('class','select-thumb');
                   $('.select-thumb', $thisPrime).addClass('selected-' + evt.target.value );
               });
           }
       });

      }; populateTemplateThumbs();


    }, //onScreenLoad()

  };
}

if (!window[nam].initialised)
{
  window[nam].init();
}