/**
 * UniMelb MCE Container Templates
 * Global Authoring Scripts
 *
 * @authors dcook@squiz.net
 * @requires Edit+ 5.3 or Matrix 5.3 Admin
 * @requires jQuery
 * @requires jQuery.ui
 */
console.log('contentTemplates.js');

/**
 * ContentTemplates (singleton)
 */
var nam = 'ContentTemplates'; //Not window.name as this conflicts with Admin interface
if (!window[nam]) {
  window[nam] = {
    // Constants
    name: nam,
    version: '0.1.7',
    className: 'content-template',
    classNameInit: 'content-template--initialised',
    rowSelector: '.row, .content-template .sq-backend-row',
    multiTextDelim: '; ', //Note:  must urldecode before delimiting
    multiTextNull: '\b', // Character to indicate empty value (can't be empty string because matrix will strip it; can't be space because matrix will accidentally add a semi-colon to the last value; can't be NUL or it will cause a fatal error)
      //todo: check this in multiple browsers. I think in firefox it appears as a box. better to add class .empty and hide text anyway.
    onCommitHandlers: [], //hmm should have just utilised jqueyr custom events

    // Variables
    // loadWait: [], //array of callbacks to call when this object is initialised

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

          EasyEditEventManager.bind('EasyEditSaveClick',function(){
            if (EasyEditScreens.currentScreen == 'contentPageStandard') {
              self.onCommit();
            }
          });

        } else {
          // Initialise for Admin Interface

          $(document).ready($.proxy(self.onScreenLoad,self));

          // Ensure onCommit occurs before native matrix handler
          var main_form_onsubmit = window.main_form.onsubmit; //form_on_submit()
          window.main_form.onsubmit = function(){
            $.proxy(self.onCommit,self)(); // Call ContentTemplates.onSubmit
            return main_form_onsubmit(); // Call native matrix onsubmit
          };
        }

        this.initialised = true;
        console.log(self.name, self.version, 'initialised');
      }
    },

    onScreenLoad: function() {
      var self = this;

      // Generic initialisation for all ContentTemplates
      $('.'+self.className+':not(.'+self.classNameInit+')').each(function(){
        var $contentTemplate = $(this);

        // Ensure 'use default' is unchecked for all fields
        $contentTemplate.find('.sq-metadata-default-wrapper [id$=_default]:checked').each(function(){
          $(this).click();
        });

        // Add classname so we can style section description
        // $contentTemplate
        //  .find(self.rowSelector)
        //  .find('span:contains("Section Description")')
        //  .parents(self.rowSelector)
        //  .addClass('section-description');

        // Show any WYSIWIGS that got randomly hidden. They get hidden because of `.viper__box, .plus .ees_viperEditCallToAction {display: none;}`. Will investigate later.
        //$('.htmlarea-div').each(function() {
        //  $(this).show();
        //});

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

      });

    }, //onScreenLoad()

    onCommit: function() {
      var self = this;
      console.log('onCommit');

      // Execute each registered handler
      for (var i = 0; i < self.onCommitHandlers.length; i++) {
        self.onCommitHandlers[i]();
      }
    },

    /**
     * Initialises one set of sortable rows for a contentTemplate, grouped by heading (text) and content (wysiwyg).
     * Supports Admin and Edit+
     */
    initSortable: function($contentTemplate, heading_ids, content_ids){
      var self = this;

      // Group elements with .sortableFieldContainers
      for (i=0; i < heading_ids.length; i++) {
        $($contentTemplate
          .find('[id$=_wysiwyg_'+content_ids[i]+'_contents_div], [id$=_wysiwyg_'+content_ids[i]+'_contents_div_viper], [id$=_text_'+heading_ids[i]+'_value]')
          .parents(self.rowSelector).get().reverse())
          .wrapAll('<div class="sortableFieldContainer"/>');
      }

      // Place all .sortableFieldContainers inside wrapper .sortable
      var $sortableFieldContainers = $contentTemplate.find('.sortableFieldContainer')
          .append('<a class="sortHandle alignLeft dragIcon" title="Drag to re-arrange" href="#"></a>');
          $sortableFieldContainers.wrapAll('<tr><td colspan="2" class="sortable ees_directChildrenList"/></tr>'); // Table elements are required for admin interface. .ees_directChildrenList is required for sortHandle styling.

      // init jquery.ui.sortable
      // see relatedAsset https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L961
      // or  multipleText https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L996
      var $sortable = $contentTemplate.find('.sortable');
      $sortable.sortable({
        axis:       'y',
        handle:     '.dragIcon',
        // cancel:     'li.markedForDeletion',
        stop:       function(event,ui){
          // Tell EES that something has been changed
          self.unsavedChanges(true);

          // Re-set all assetids in field names in the new order
          // TODO: probably use the method defined in initSortableGroups instead
          var i=0;
          $sortable.find('.sortableFieldContainer').each(function(id){
            // Heading
            var $heading = $(this).find('input[type=text][id*=_value]');
            if ($heading.length){
              var heading_id = $heading.attr('id').replace(/metadata_field_text_\d+/, 'metadata_field_text_'+heading_ids[i]);
              $heading
                .attr('id',heading_id)
                .attr('name',heading_id);
            }

            // Content WYSIWYG
            var $content = $(this).find('div[id*=metadata_field_wysiwyg_][id*=_contents_div]');
            if ($content){
              var content_id = $content.attr('id').replace(/metadata_field_wysiwyg_\d+_contents_div/, 'metadata_field_wysiwyg_'+content_ids[i]+'_contents_div');
              $content
                .attr('id',content_id)
                .attr('name',content_id);
            }

            i++;
          }); //each .sortableFieldContainer
        }, //stop()
      });
    }, //initSortable()


    /**
     * Initialises groups of fields in a metadata section as sortable.
     * All groups must be the same number of fields.
     * Supports Admin and Edit+
     *
     * @param $section    Either .editSection or .sq-backend-section-table
     * @param numFields   Number of fields to group together
     */
    initSortableGroups: function($section, numFields){
      var self = this;

      // Collect assetids
      var assetids = $section.find('[id]').map(function(){
        var numbers = this.id.match(/\d+/g);
        return numbers.length >= 2 ? numbers[1] : ""; // get the second number in the id, or blank string if none
      });

      // Group elements with .sortableFieldContainers
      var rows = $section.find(self.rowSelector).get();
      for (i=0; i < rows.length; i+=numFields) {
        $(rows.slice(i+0, i+numFields)).wrapAll('<div class="sortableFieldContainer"/>');
      }

      // Prepare and wrap .sortableFieldContainers
      var $sortableFieldContainers = $section.find('.sortableFieldContainer')
        .append('<a class="sortHandle alignLeft dragIcon" title="Drag to re-arrange" href="#"></a>');
      $sortableFieldContainers.wrapAll('<tr><td colspan="2" class="sortableGroups ees_directChildrenList"/></tr>'); // Table elements are required for admin interface. .ees_directChildrenList is required for sortHandle styling.


      // init jquery.ui.sortable
      var $sortable = $section.find('.sortableGroups');
      $sortable.sortable({
        axis:       'y',
        handle:     '.dragIcon',
        // cancel:     'li.markedForDeletion',
        stop:       function(event,ui){
          // Tell EES that something has been changed
          self.unsavedChanges(true);

          // Re-set field assetids in field id/names in the new order
          $sortable.find('[id]').each(function(i){
            var numbers = this.id.match(/\d+/g);
            if (numbers.length >= 2) {
              // get the second number in the id
              var assetid = numbers[1];

              // Replace assetid in field id and name
              var newid = this.id.replace(assetid, assetids[i]);
              // var newname = this.name.replace(assetid, assetids[i]);
              $(this).attr('id', newid);
              $(this).attr('name', newid);
            }
          }); //each

        }, //stop()
      });
    }, //initSortableGroups()


    /**
     * Initialises a group of Multiple Text fields
     * @param JQuery selector
     * see also https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/EasyEditBodycopyManager.js#L2531
     */
    initMultiTextGroup: function(selector){
      var self = this;
      var $sortable = $(selector).find('.sortable');
      var $values = $(selector).find('.values input');
      var values = {};

      /** Functions **/
      /**
       * Add a new sortable line
       * @return $sortableFieldContainer
       */
      function addNewItem($sortable,values,i) {
        var $template = $sortable.find('.sortableFieldContainer.template');
        var $sortableFieldContainer = $template.clone();
        if (typeof i == 'undefined'){
          i = $sortable.find('.sortableFieldContainer').length - 1;
        }

        // Make IDs unique
        $sortableFieldContainer.find('[id*=":i:"]').each(function(){
          this.id = this.id.replace(/:i:/g, i);
          this.id = this.id.replace(/:/g, '');
        });

        if (values !== '') {
          // Set values for each field
          for (var j in values) {
            var value = multiTextUnEscape(values[j][i]);
            var $field = $sortableFieldContainer.find('[name*='+j+']');
            $field.val(value);
            if (value === self.multiTextNull) {
              $field.addClass('blank');
            }
          }
        }

        $sortableFieldContainer.removeClass('hidden template');
        $sortable.append($sortableFieldContainer);

        return $sortableFieldContainer;
      }

      function deleteOption(e) {
        e.preventDefault();

        self.unsavedChanges(true);

        if (typeof EasyEditComponentsToolbar !== 'undefined') {
          // Edit+
          var $link  = jQuery(this);
          var $li    = $link.parents('.child');
          var $inputs = $li.find('input, textarea, select');
          if ($li.hasClass('markedForDeletion')) {
              // Get the old value
              $li.removeClass('markedForDeletion').removeClass('defaultMode');
              $inputs.attr('disabled',false).removeClass('deleted');

          } else {
              // Store the old value
              $li.addClass('markedForDeletion').addClass('defaultMode');
              $inputs.attr('disabled',true).addClass('deleted');
          }// End if

        } else {
          // Admin interface
          var $sortableFieldContainer = $(this).parents('.sortableFieldContainer');
          $sortableFieldContainer.remove();
        }
      }

      function onFocus(e) {
        // If this field has null character, clear it
        if (this.value === self.multiTextNull) {
          this.value = '';
        }
        $(this).removeClass('blank');

        // If last line is not empty
        var $nonEmptyInputs = $sortable.find('.sortableFieldContainer').last().find('.multitext__input, .viper__input').filter(function(){return this.value.length > 0});
        if($nonEmptyInputs.length > 0){
          // Add new item
          var $sortableFieldContainer = addNewItem($sortable, '');
          // Initialise new WYSIWYG field
          self.initWysiwygs();
        }
      }


      // If not a blank line, add a character to each empty field to ensure it gets saved correctly
      function onBlur(e) {
        var $sortableFieldContainer = $(this).parents('.sortableFieldContainer');
        var $inputs = $sortableFieldContainer.find('.multitext__input, .viper__input');
        var nonEmptyInputs = [],
            emptyInputs = [];

        $inputs.each(function(){
          if (this.value.length > 0){
            nonEmptyInputs.push(this);
          } else {
            emptyInputs.push(this);
          }
        });

        if (nonEmptyInputs.length > 0)
        {
          for (var i = 0; i < emptyInputs.length; i++) {
            emptyInputs[i].value = self.multiTextNull;
            $(emptyInputs[i]).addClass('blank');
          };
        }
      }

      function onCommit(){
        console.log('MultiTextGroup:onCommit');
        $sortable.find('.multitext__input, .viper__input').each(function(){
          this.value = multiTextEscape(this.value); //escape special characters so they don't inadvertedly split fields
          // this.value = htmlEscape(this.value); // i think matrix is handling this anyway.
        });

        //Ensure template fields aren't submitted
        $sortable.find('.sortableFieldContainer.template .multitext__input, .sortableFieldContainer.template .viper__input').each(function(){
          this.disabled = true;
        });

      }

      /**
       * Escape strings for storage within a multitext field.
       * See also Frontend Layout.
       * ; -> %3B
       * \n -> %0A
       */
      function multiTextEscape(str) {
        //change semicolons and line-breaks so they don't inadvertedly split fields (urlencode, just because it seemed like a good escape sequence)
        return str && str.replace(/;/g, '%3B').replace(/\n/g, '%0A');
      }
      function multiTextUnEscape(str) {
        return str && str.replace(/%0A/g, '\n').replace(/%3B/g, ';');
      }

      /** Initialise **/
      var num_values = 0;
      $values.each(function(){
        values[this.name] = this.value.split(self.multiTextDelim);
        if (values[this.name].length > num_values) {
          num_values = values[this.name].length;
        }
      });

      // Generate elements with .sortableFieldContainers
      if (num_values >= 1) {
        for (var i=0; i < num_values; i++) {
          addNewItem($sortable, values, i);
        }
      } else {
        addNewItem($sortable, '');
        addNewItem($sortable, '');
      }
      addNewItem($sortable,'');

      // Initialise wysiwygs
      self.initWysiwygs();

      // init jquery.ui.sortable
      // eg multipleText https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L996
      $sortable.sortable({
        axis:       'y',
        handle:     '.dragIcon',
        // cancel:     'li.markedForDeletion',
        stop:       function(event,ui){
          // Tell EES that something has been changed
          self.unsavedChanges(true);
        },
      });

      /** Event Handlers **/
      $sortable.on('click', '.assetDeleteOption', deleteOption);
      $sortable.on('focus', 'input[type=text], textarea, .viper__editable', onFocus);
      $sortable.on('blur', 'input[type=text], textarea, .viper__editable', onBlur);
      self.onCommitHandlers.push(onCommit);

      $sortable.on('change', 'input, textarea, .viper__editable', self.unsavedChanges);
      $sortable.on('keyup', 'input, textarea, .viper__editable', self.unsavedChanges);

    }, //initMultiTextGroup()


    /**
     * Set up all ContentTemplate wysiwygs on the page.
     * Ensures any wysiwygs added after screenLoad are initialised.
     */
    initWysiwygs: function(){
      var self = this;
      var viper;

      if (typeof EasyEditScreens !== 'undefined') {
        var bodycopyManager = EasyEditScreens.screen[EasyEditScreens.currentScreen].bodycopyManager;
        viper = bodycopyManager.getViper(); // Get EES' global instance of Viper
        bodycopyManager.attachWysiwygEvents(); // Ensure newly created wysiwygs are initialised by EES
      }

      if (viper) {
        // For each .viper__container
        $('div[id$="_wysiwyg_container"].viper__container:not(.viper__initialised)', bodycopyManager.containerId).each(function(){
          var $container = $(this);

          // Set wysiwyg value from source .viper__input field.
          $container.find('.viper__editable').html($container.find('.viper__input').val());

          // Mark as initialised (hide .viper__input)
          $container.addClass('viper__initialised');
        });


        // Register Event callbacks: trigger equivalent event on .viper__input
        // On change
        viper.registerCallback('Viper:nodesChanged', 'EES', function(e, done) {
          console.log('Viper:nodesChanged');
          if ($(e).length) {
            var $container = $(e).parents('.viper__container'); //sometimes e is the text, sometimes it's the .viper__editable? just get the container and go from there.

            self.unsavedChanges();

            if ($container) {
              var $editable = $container.find('.viper__editable');
              var $input = $container.find('.viper__input');

              // Whenever the wysiwyg content is updated, our .viper__input updates as well.
              // We do this now instead of waiting until commit so we can always treat .viper__input as the single source of truth.
              setTimeout(function() { // why a timeout? I don't know, but don't mess with it if it works.
                $input.val($editable.html());
              }, 1);

              $input.trigger('change');
            }
          }
          done();
        });

        // On focus
        viper.registerCallback('Viper:focused', 'EES', function(e, done) {
          $(this.element).parents('.viper__container').find('.viper__input').trigger('focus');
        });

        // On blur
        viper.registerCallback('Viper:clickedOutside', 'EES', function(e, done) {
          $(this.element).parents('.viper__container').find('.viper__input').trigger('blur');
        });

        self.wysiwygsInitialised = true;
      }
    }, //initViper()


    unsavedChanges: function(unsaved) {
      unsaved = (typeof unsaved !== 'undefined' ? unsaved : true);

      if (typeof EasyEditComponentsToolbar !== 'undefined') {
        if (unsaved) {
          EasyEditComponentsToolbar.enableSaveButton();
        } else {
          EasyEditComponentsToolbar.disableSaveButton();
        }
      }
    }
  }
}


if (!window[nam].initialised)
{
  window[nam].init();
}

/** Utilities **/
/* http://stackoverflow.com/a/7124052/421243 */
function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

}

// I needed the opposite function today, so adding here too:
function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}
