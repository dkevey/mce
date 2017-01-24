/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Timeline
 * @authors dcook@squiz.net, dkevey@unimelb.edu.au
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateTimeline';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.2.0',
    className: 'content-template-timeline',
    classNameInit: 'content-template-timeline--initialised',

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
      // Initialise all Content Template
      var self = this;
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Find the 'Content' section
        var $section = $contentTemplate.find('.section_1');

        // Initialise groups of two fields as sortable
        ContentTemplates.initSortableGroups($section, 4);

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

     });
     
		
      // On change of num_fields
      var $num_fields = $contentTemplates.find('[id$=_select_7063]');
      function onNumFieldsChanged() {
        var $contentTemplate = $(this).parents('.'+self.className);
        var num_fields = $(this).val();

       // Show each field if it is required (field inputs, and featured_item options)
        $contentTemplate.find('.sortableFieldContainer').each(function(){
          var index = $(this).val() || $(this).index() + 1;
          $(this).toggle( index <= num_fields );
        });

      }
      $num_fields.on('change', onNumFieldsChanged);
      $num_fields.each(onNumFieldsChanged);
		
		

    }, //onScreenLoad()

  };
}

if (!window[nam].initialised)
{
  window[nam].init();
}
// JavaScript Document