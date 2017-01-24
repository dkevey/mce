/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - News or Events listing
 * dkevey@unimelb.edu.au based on Squiz templates
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateNewsEvents';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.1',
    className: 'content-template-newsevents',
    classNameInit: 'content-template-newsevents--initialised',

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
        // console.log(self.name, self.version, 'initialised');
      }

    },

    onScreenLoad: function() {
      // Initialise all Content Template listing
      var self = this;
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');      

      var toggleTemplateType = function(parentScope){
          
          var $assetTypeSelect = $('[id$="_metadata_field_select_5555"]',parentScope);
	  	  
		  // define the rows you want to show and hide
		  var $eventTypeRow = $('.row_1',parentScope);
		  var $newsTemplateRow = $('.row_2',parentScope); 
		  
		  // show or hide additional fields in template
		  // note: this fires on page load
		   if ($assetTypeSelect.val() === 'news')	
			  
			    {
              	  $eventTypeRow.hide();
              	  $newsTemplateRow.show();
				
			 	} else if ($assetTypeSelect.val() === 'events') 
				
				{
				  $eventTypeRow.show();
				  $newsTemplateRow.hide();
              	} 
		     
          // toggle additional fields when changing template
		  // note: after page load this is how you change templates - basically the same as above
          $assetTypeSelect.change(function(evt){

             if  (evt.target.value === 'events') 
				  
				{
                  $eventTypeRow.show();
				  $newsTemplateRow.hide();
            
              } else if (evt.target.value === 'news') 
				  
				{
                  $eventTypeRow.hide();
              	  $newsTemplateRow.show();
              }
          });
      };

      var populateTemplateThumbs = function(){
       $('.container-template-newsevents').each(function(){
           var $thisPrime = $(this);
     
           toggleTemplateType($thisPrime);
           
           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_5557"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_5557_field"]', $thisPrime);
           
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