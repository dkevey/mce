/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Navigation
 * @authors dcook@squiz.net, dkevey@unimelb.edu.au
 * @requires ContentTemplates
 */
 
var nam = 'ContentTemplateNavigation';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.2.0',
    className: 'content-template-navigation',
    classNameInit: 'content-template-navigation--initialised',

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
      // Initialise Content Templates
      var self = this;
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      // Initialise each ContentTemplate
      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Initialise sortable elements for Navigation - works in edit and admin
        var heading_ids=[853,855,857,859,861,863];
        var content_ids=[854,856,858,860,862,864];
        ContentTemplates.initSortable($contentTemplate, heading_ids, content_ids);

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

      });

      // ----- Event handlers for all ContentTemplateNavigation (not delegated because it's unnecessary) 
	  

      // on change of authoring_type
      $contentTemplates.find('[id$=_select_847]').on('change', function(){
        var $contentTemplate = $(this).parents('.'+self.className);
        var authoring_type = $(this).val();

        // wysiwyg show/hide
        $.each([
          $contentTemplate.find('.sectionHeading_1'), // section title
          $contentTemplate.find('.sortable'), // wysiwyg content
          $contentTemplate.find('[id$=_select_849]').parents(ContentTemplates.rowSelector), // num_fields
          $contentTemplate.find('[id$=_select_850]').parents(ContentTemplates.rowSelector), // default_selected
        ], function(){
          $(this).toggle(authoring_type == 'wysiwyg');
        });

        // folder show/hide
		 $.each([
          $contentTemplate.find('[id$=_related_asset_848_ra_container]').parents(ContentTemplates.rowSelector), // parent_asset
		  $contentTemplate.find('[id$=_text_5303]').parents(ContentTemplates.rowSelector), // nav_title
		  $contentTemplate.find('[id$=_text_5304]').parents(ContentTemplates.rowSelector), // nav_description
        ], function(){
          $(this).toggle(authoring_type == 'folder');
        });
	
      }).trigger('change');

      // on change of num_fields
      $contentTemplates.find('[id$=_select_849]').on('change', function(){
        var $contentTemplate = $(this).parents('.'+self.className);
        var num_fields = $(this).val();

        // Show each field if it is required (wysiwyg inputs, and default_selected options)
        $contentTemplate.find('.sortableFieldContainer, [id$=_select_850] option').each(function(){
          $(this).toggle( $(this).index()+1 <= num_fields );
        });

        var $default_selected = $contentTemplate.find('[id$=_select_850]');
        if ($default_selected.val() > num_fields){
          $default_selected.val(num_fields);
        }
      }).trigger('change');

      // All those 'change's has caused EES to think we have unsaved changes when we don't.
      // Actually todo: refactor thses event handlers to be named functions, and call the functions rather than trigger ui events
      //typeof EasyEditComponentsToolbar !== 'undefined' && EasyEditComponentsToolbar.disableSaveButton();

    }, //screenLoad()

  };
}


if (!window[nam].initialised)
{
  window[nam].init();
}
