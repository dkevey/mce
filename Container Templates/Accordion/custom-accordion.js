/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Accordion
 * @authors dcook@squiz.net, dkevey@unimelb.edu.au
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateAccordion';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.2.0',
    className: 'content-template-accordion',
    classNameInit: 'content-template-accordion--initialised',

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
        // Initialise all Content Template Ordered List Steps
        var self = this;
        var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

        $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Find the 'Content' section - works in edit only but less code to write
        var $section = $contentTemplate.find('.section_1');

        // Initialise groups of two fields as sortable
        ContentTemplates.initSortableGroups($section, 2);

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());
     });

        // on change of authoring_type
        $('[id$=_select_799]').on('change', function(){
            // wysiwyg show/hide
            $(this)
                .parents('.content-template')
                .find('[id$=_text_803_value], [id$=_wysiwyg_804_contents_div], [id$=_wysiwyg_804_contents_div_viper]')
                .parents('.sortableFieldContainer')
                .toggle($(this).val() == 'wysiwyg');
            $(this)
                .parents('.content-template')
                .find('[id$=_select_801]')
                .parents('.row, .content-template .sq-backend-row')
                .toggle($(this).val() == 'wysiwyg');

            // folder show/hide
            $(this)
                .parents('.content-template')
                .find('[id$=_select_802], [id$=_related_asset_800_ra_container]')
                .parents('.row, .content-template .sq-backend-row')
                .toggle($(this).val() == 'folder');

            // set num_fields
                var $num_fields = $(this)
                    .parents('.content-template')
                    .find('[id$=_select_801]');

                    if ($(this).val() == 'folder') {
                        $num_fields.val(1); //set to 1 to hide all wysiwyg fields
                    }
                        $num_fields.trigger('change');
                    }).trigger('change');

            // on change of num_fields show hide content
            $('[id$=_select_801]').on('change', function(){

                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_805_value], [id$=_wysiwyg_806_contents_div], [id$=_wysiwyg_806_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 2);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_807_value], [id$=_wysiwyg_808_contents_div], [id$=_wysiwyg_808_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 3);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_809_value], [id$=_wysiwyg_810_contents_div], [id$=_wysiwyg_810_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 4);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_811_value], [id$=_wysiwyg_812_contents_div], [id$=_wysiwyg_812_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 5);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_813_value], [id$=_wysiwyg_814_contents_div], [id$=_wysiwyg_814_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 6);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_815_value], [id$=_wysiwyg_816_contents_div], [id$=_wysiwyg_816_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 7);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_817_value], [id$=_wysiwyg_818_contents_div], [id$=_wysiwyg_818_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 8);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_819_value], [id$=_wysiwyg_820_contents_div], [id$=_wysiwyg_820_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 9);
                $(this)
                    .parents('.content-template')
                    .find('[id$=_text_821_value], [id$=_wysiwyg_822_contents_div], [id$=_wysiwyg_822_contents_div_viper]')
                    // .parents('.row, .content-template .sq-backend-row')
                    .parents('.sortableFieldContainer')
                    .toggle($(this).val() >= 10);
            }).trigger('change');

    }, //onScreenLoad()

  };
}

if (!window[nam].initialised)
{
  window[nam].init();
}
// JavaScript Document