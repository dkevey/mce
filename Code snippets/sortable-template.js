/**
 * UniMelb MCE Container Templates
 * Check List - Authoring Scripts
 *
 * @authors dcook@squiz.net
 * @requires ContentTemplates
 */

var checklist = 'ContentTemplateCheckList';
if (!window[checklist]) {
  window[checklist] = {
    name: nam,
    version: '0.2.0',
    className: 'content-template-checklist',
    classNameInit: 'content-template-checklist--initialised',

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
      // Initialise all Content Template Check List
      var self = window[checklist];
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Find the 'Content' section
        var $section = $contentTemplate.find('.section_1') || $contentTemplate.find('.sq-backend-section-table')[2];

        // Initialise groups of fields as sortable 
        ContentTemplates.initSortableGroups($section, 1);
         
        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

     });
     

                // on change of num_fields show hide content
				$('[id$=_select_6959]').on('change', function(){

					$(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6964_contents_div], [id$=_wysiwyg_6964_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 2);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6966_contents_div], [id$=_wysiwyg_6966_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 3);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6968_contents_div], [id$=_wysiwyg_6968_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 4);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6970_contents_div], [id$=_wysiwyg_6970_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 5);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6972_contents_div], [id$=_wysiwyg_6972_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 6);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6974_contents_div], [id$=_wysiwyg_6974_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 7);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6976_contents_div], [id$=_wysiwyg_6976_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 8);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6978_contents_div], [id$=_wysiwyg_6978_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 9);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6980_contents_div], [id$=_wysiwyg_6980_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 10);
				  $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6982_contents_div], [id$=_wysiwyg_6982_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 11);
				   $(this)
					.parents('.content-template')
					.find('[id$=_wysiwyg_6984_contents_div], [id$=_wysiwyg_6984_contents_div_viper]')
					// .parents('.row, .content-template .sq-backend-row')
					.parents('.sortableFieldContainer')
					.toggle($(this).val() >= 12);
					  }).trigger('change'); // end toggle
		
		



    }, //onScreenLoad()

  };
}


if (!window[checklist].initialised)
{
  window[checklist].init();
}
// JavaScript Document