/**
 * Edit+ Plugin to show and hide metadata fields, depending on the page template selected
 */
EasyEdit.plugins.showandhideFields = {

  /**
   * Initialise the plugin
   */
  init: function() {
    var self = this;

    // Add a function to the after ees load event
    EasyEditEventManager.bind('EasyEditScreenLoad', self.screenLoad);
  }, // End init

  screenLoad: function() {
      var templateList;
      // If Metadata screen is loaded

      if (EasyEditScreens.currentScreen == "metadataDefault") {

        // ** START UNIMELB CODE ** //

        // Identify the page template field and the current selection
        var pageTemplatefield = $('#ees_editMetadata .row:contains("Page type")').find("select.typeSelect");
        // Identify the page template default checkbox
        var defaultTemplate = $('#ees_editMetadata .row:contains("Page type")').find("input.sq-form-field.defaultCheckbox");
        // Remove 'undefined' notes from form
        $('#ees_editMetadata .row_0 .notes').remove();
        // Identify all elements that can be shown or hidden
        var allRows = $('#ees_editMetadata .row');
        var allHeadings = $('#ees_editMetadata h4');
        var allSections = $('#ees_editMetadata .editSection');
        var everything = $(allRows).add(allHeadings).add(allSections);
        var exampleImage = $('#ees_editMetadata .row:contains("Page template")').find(".sq-backend-smallprint");

        // Create a function for looking up the edit sections  
        var containsTitle = function(str) {
          return $('#ees_editMetadata h4:contains("' + str + '")').next().andSelf();
        };
        // Assign each section to a variable
        var designSection = $(containsTitle("Design"));
        var contactSection = $(containsTitle("Contact"));
        var tagsSection = $(containsTitle("Tags"));
        var seoSection = $(containsTitle("SEO"));

        // Create a function for looking up the individual edit fields
        var contains = function(str) {
          return '#ees_editMetadata .row:contains("' + str + '")';
        };
        // Assign each edit field to a variable
        // DESIGN SECTION
        var headerText = $(contains("Header text"));
        var headerSubline = $(contains("Header subline"));
        var headerHeroButtonLink = $(contains("Header hero button link"));
        var headerHeroButtonText = $(contains("Header hero button text"));
        var bannerImage = $(contains("Banner image"));
        var tabbedNav = $(contains("Tabbed navigation"));
        
        // NEWS SECTION
        var moreEmail = $(contains("More information email address"));
        var authorName = $(contains("Author name"));
        var authorBio = $(contains("Short author bio"));

        //CONTENT SECTION
        var introText = $(contains("Introductory text"));
        var jumpNav = $(contains("Jump navigation"));
        var buttonText = $(contains("Button text"));
        var asideContent = $(contains("Aside content"));
        var contactName = $(contains("Contact name"));
        var contactEmail = $(contains("Contact email address"));
        var contactPhone = $(contains("Contact phone number"));
        var projectStatus = $(contains("Project status"));
        var cohortType = $(contains("Cohort or Degree type"));
        var keyword = $(contains("Keyword"));

        //SEO SECTION
        var twitterHandle = $(contains("Twitter handle"));
        var pageDescription = $(contains("Page description"));

        // Create a function to insert page template image example
        var imageID = function(str) {
          return $(exampleImage).css({
            "display": "block",
            "clear": "both",
          }).html('<img src="./?a=' + str + '" />');
        };

        // Create a function to insert page template documentation link
        var documentationID = function(str) {
          return $(exampleImage).append('<ul><li><a href="./?a=' + str + '" target="_blank">Documentation</a></li></ul>');
        };

        // Main function to define the fields hide for each template
        function pageTemplateSettings() {

          // First show all fields, rows and sections
          $(everything).show();
          $(exampleImage).hide();

          // Update the current page template selection
          var pageTemplate = $(pageTemplatefield).find(":selected").text();
          console.log(pageTemplate);

          // Define each page template and the fields, or sections to hide
          if (pageTemplate === "Custom page") {
            $(imageID("1608"));
            $(documentationID("1184"));
            $(headerText).hide();
            $(headerSubline).hide();
            $(asideContent).hide();
          }
          if (pageTemplate === "Inside page with no header") {
            $(imageID("1609"));
            $(contactSection).hide();
          }
          if (pageTemplate === "Announcement-style layout") {
            $(imageID("3820"));
            $(contactSection).hide();
          }
          if (pageTemplate === "Pursuit-style layout") {
            $(imageID("3821"));
            $(contactSection).hide();
            $(moreEmail).hide();
          }
        }

        // Run the main function on initial load.
        $(pageTemplatefield).ready(pageTemplateSettings);
        // Trigger the main function when the page template field is changed.
        $(pageTemplatefield).change(pageTemplateSettings);
        // Trigger the main function when the page template default field is clicked.
        $(defaultTemplate).click(pageTemplateSettings);

                       alert('Edit field hiding javascript initiated');

        // ** END UNIMELB CODE ** //
      } // end if Metadata screen
    } // End afterLoad
};
