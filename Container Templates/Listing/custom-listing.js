/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Listing
 * @authors: dcook@squiz.net, mvaldman@squiz.net, dkevey@unimelb.edu.au
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateListing';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.0',
    className: 'content-template-listing',
    classNameInit: 'content-template-listing--initialised',

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

	  // show/hide fields		
      var toggleAuthType = function(parentScope){
          
          var $templateSelectDefault = $('[id$="_metadata_field_select_1035_default"]',parentScope);
          var $authTypeSelect = $('[id$="_metadata_field_select_1032"]',parentScope);
          
          //these rows numbers can change if extra information (such as section descriptions are added or removed)
          var $parentRow = $('.row_3',parentScope);
          var $childRow = $('.row_4',parentScope);
          
          
          //uncheck and hide any redundant default checkboxes       
          if ($authTypeSelect.val() === 'parent'){
              
              $parentRow.show();
              $childRow.hide();
              console.log('parent selected');
              
          } else if ( $authTypeSelect.val() === 'selected-children'){
              
              $parentRow.hide();
              $childRow.show();
              console.log('child selected');              
          }
                  
          // toggle parent or child related asset fields when changing auth type
          $authTypeSelect.change(function(evt){

              if (evt.target.value === 'selected-children') {
    
                  $parentRow.hide();
                  $childRow.show();
                  console.log('child selected');
            
              } else if (evt.target.value === 'parent') {
                  
                  $parentRow.show();
                  $childRow.hide();
                  console.log('parent selected');
              }
          });
      };

	  // show thumbnails on toggle	
      var populateTemplateThumbs = function(){
       $('.content-template-listing').each(function(){
           var $thisPrime = $(this);
     
           toggleAuthType($thisPrime);
           
           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_1035"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_1035_field"]', $thisPrime);
           
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

      };  populateTemplateThumbs();

    }, //onScreenLoad()

  };
}


if (!window[nam].initialised)
{
  window[nam].init();
}