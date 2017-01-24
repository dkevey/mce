/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Header
 * dkevey@unimelb.edu.au based on Squiz templates
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateHeader';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.2.0',
    className: 'content-template-header',
    classNameInit: 'content-template-header--initialised',

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
      
      // start custom content template
      var toggleTemplateType = function(parentScope){
          
          var $templateSelect = $('[id$="_metadata_field_select_740"]',parentScope);
		  var $templateSelectDefault = $('[id$="_metadata_field_select_740_default"]',parentScope);
          var $templateSelectDefaultLabel = $('[for$="_metadata_field_select_740_default"]',parentScope);
		  
		  var $imageSelectField = $('[id$="_metadata_field_related_asset_741_default"]',parentScope);
          var $imageSelectFieldLabel = $('[for$="_metadata_field_related_asset_741_default"]',parentScope);
          
		  var $buttonTextField = $('[id$="_metadata_field_related_asset_744_default"]',parentScope);
          var $buttonTextFieldLabel = $('[for$="_metadata_field_related_asset_744_default"]',parentScope);
		  
		  var $buttonLinkField = $('[id$="_metadata_field_related_asset_745_default"]',parentScope);
          var $buttonLinkFieldLabel = $('[for$="_metadata_field_related_asset_745_default"]',parentScope);
		  
		  var $authorNameField = $('[id$="_metadata_field_related_asset_746_default"]',parentScope);
          var $authorNameFieldLabel = $('[for$="_metadata_field_related_asset_746_default"]',parentScope);
		  
		  var $authorLocationField = $('[id$="_metadata_field_related_asset_747_default"]',parentScope);
          var $authorLocationLabel = $('[for$="_metadata_field_related_asset_747_default"]',parentScope);
		  	  
		  // define the rows you want to show and hide
		  var $backgroundImageRow = $('.row_1',parentScope);
		  var $buttonTextRow = $('.row_4',parentScope);
		  var $buttonLinkRow = $('.row_5',parentScope);
		  var $authorNameRow = $('.row_6',parentScope);
          var $authorLocationRow = $('.row_7',parentScope);

        // show/hide additional fields in template
        // note: this fires on page load
            if ($templateSelect.val() === 'article-mid-align')

                {
                    $authorNameRow.show();
                    $authorLocationRow.show();
                    $buttonTextRow.hide();
                    $buttonLinkRow.hide();
                    $backgroundImageRow.show();

                } else if ($templateSelect.val() === 'article-bottom-align' ||
                    $templateSelect.val() === 'header-image-bottom-align' ||
                    $templateSelect.val() === 'header-image-bottom-align-flat' ||
                    $templateSelect.val() === 'header-image-box' ||
                    $templateSelect.val() === 'header-banner-course' ||
                    $templateSelect.val() === 'header-image-course' ) 

                {
                    $authorNameRow.hide();
                    $authorLocationRow.hide();
                    $buttonTextRow.hide();
                    $buttonLinkRow.hide(); 
                    $backgroundImageRow.show();

                } else if ( $templateSelect.val() === 'header-image-mid-align' ||
                    $templateSelect.val() === 'header-image-mid-align-enhanced' ||
                    $templateSelect.val() === 'header-banner-simple')

                {
                    $authorNameRow.hide();
                    $authorLocationRow.hide();
                    $buttonTextRow.show();
                    $buttonLinkRow.show(); 
                    $backgroundImageRow.show();

                } else if ( $templateSelect.val() === 'header-blue')

                {
                    $authorNameRow.hide();
                    $authorLocationRow.hide();
                    $buttonTextRow.hide();
                    $buttonLinkRow.hide(); 
                    $backgroundImageRow.hide();
                } 

            // toggle additional fields when changing template and update thumbnails
            // note: after page load this is how you change templates - basically the same as above
          $templateSelect.change(function(evt){

            if  (evt.target.value === 'header-blue' )

                {
                    $authorNameRow.hide();
                    $authorLocationRow.hide();
                    $buttonTextRow.hide();
                    $buttonLinkRow.hide(); 
                    $backgroundImageRow.hide();

                } else if (evt.target.value === 'header-image-mid-align' ||
                           evt.target.value === 'header-image-mid-align-enhanced' ||
                           evt.target.value === 'header-banner-simple' )

                {
                    $authorNameRow.hide();
                    $authorLocationRow.hide();
                    $buttonTextRow.show();
                    $buttonLinkRow.show();
                    $backgroundImageRow.show();

                } else if (evt.target.value === 'article-bottom-align'||
                           evt.target.value === 'header-image-bottom-align' ||
                           evt.target.value === 'header-image-bottom-align-flat' ||
                           evt.target.value === 'header-image-box' ||	
                           evt.target.value === 'header-banner-course' ||	 
                           evt.target.value=== 'header-image-course') 
                {
                    $authorNameRow.hide();
                    $authorLocationRow.hide();
                    $buttonTextRow.hide();
                    $buttonLinkRow.hide();
                    $backgroundImageRow.show();

                } else if ( evt.target.value === 'article-mid-align' ) 

                {
                    $authorNameRow.show();
                    $authorLocationRow.show();
                    $buttonTextRow.hide();
                    $buttonLinkRow.hide();
                    $backgroundImageRow.show();
                }
          });
      };

        // populate the thumbnails
        var populateTemplateThumbs = function(){
            $('.content-template-header').each(function(){
            var $thisPrime = $(this);

            toggleTemplateType($thisPrime);

            //if template selector type is a dropdown
            var $selectElm = $('select[id$="_metadata_field_select_740"]', $thisPrime);
            var $selectElmParent = $('[id$="_metadata_field_select_740_field"]', $thisPrime);

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
      // end custom content template

    }, //onScreenLoad()
  };
}

if (!window[nam].initialised)
{
  window[nam].init();
}