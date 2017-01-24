/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Ordered List Steps
 * @authors dcook@squiz.net, dkevey@unimelb.edu.au
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateOrderedList';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.2.0',
    className: 'content-template-orderedlist',
    classNameInit: 'content-template-orderedlist--initialised',

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
      // Initialise all Content Template Ordered List Steps
      var self = this;
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Find the 'Content' section
        var $section = $contentTemplate.find('.section_1') || $contentTemplate.find('.sq-backend-section-table')[2];

        // Initialise groups of two fields as sortable
        ContentTemplates.initSortableGroups($section, 2);

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

     });
     
        // on change of num_fields show hide content
        $('[id$=_select_6879]').on('change', function(){

            $(this)
                .parents('.content-template')
                .find('[id$=_text_6883_value], [id$=_wysiwyg_6884_contents_div], [id$=_wysiwyg_6884_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 2);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6885_value], [id$=_wysiwyg_6886_contents_div], [id$=_wysiwyg_6886_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 3);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6887_value], [id$=_wysiwyg_6888_contents_div], [id$=_wysiwyg_6888_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 4);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6889_value], [id$=_wysiwyg_6890_contents_div], [id$=_wysiwyg_6890_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 5);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6891_value], [id$=_wysiwyg_6892_contents_div], [id$=_wysiwyg_6892_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 6);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6893_value], [id$=_wysiwyg_6894_contents_div], [id$=_wysiwyg_6894_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 7);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6895_value], [id$=_wysiwyg_6896_contents_div], [id$=_wysiwyg_6896_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 8);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6897_value], [id$=_wysiwyg_6898_contents_div], [id$=_wysiwyg_6898_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 9);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6899_value], [id$=_wysiwyg_6900_contents_div], [id$=_wysiwyg_6900_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 10);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6924_value], [id$=_wysiwyg_6925_contents_div], [id$=_wysiwyg_6925_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 11);
            $(this)
                .parents('.content-template')
                .find('[id$=_text_6926_value], [id$=_wysiwyg_6927_contents_div], [id$=_wysiwyg_6927_contents_div_viper]')
                // .parents('.row, .content-template .sq-backend-row')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() >= 12);
            }).trigger('change'); // end toggle

    }, //onScreenLoad()

  };
}

if (!window[nam].initialised)
{
  window[nam].init();
}
// JavaScript Document