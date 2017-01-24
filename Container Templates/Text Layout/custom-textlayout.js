/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Text Layout
 * dkevey@unimelb.edu.au based on Squiz templates
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateTextLayout';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.1',
    className: 'content-template-textlayout',
    classNameInit: 'content-template-textlayout--initialised',

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

      var populateTemplateThumbs = function(){
       $('.content-template-textlayout').each(function(){
           var $thisPrime = $(this);
           
           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_5452"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_5452_field"]', $thisPrime);
           
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