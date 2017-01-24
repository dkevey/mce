$(document).ready(function() {
  var numOccurrences = $('[data-type="filter"]').length; // How many ocurrences are there?
  var occurrences = $('[data-type="filter"]'); // Get each occurence for processing

  
  $(occurrences).each(function(index) {  // For each occurrence
    var useButton = $(this).data('usebutton'),
        paginate = $(this).data('paginate');

    $(this).attr('data-type', 'filter' + index);

	  /* *** CALCULATE SHOW MORE BUTTON *** */
	  var remainingItems = $(this).find('li, article');
	  var remainingItemsCount = $(remainingItems).length;
	  var showMoreDefault = 12; // Default number of items to show if paginate not set
	
    function pagination(compareAgainst, listing) { // Create a function for re-use further down the script
	    
		  $(remainingItems).each(function() {
	        $(this).addClass('hidden-item');
	    });	    
	    
      if (remainingItemsCount > compareAgainst) { // If there are more items than the 'compareAgainst' value
        $(listing).after('<div class="showMore'+index+' center"><p><a href="#" class="button soft">Show more</a></p></div>'); // Show the button
        $(remainingItems).each(function(index) {
          if (index < compareAgainst) { // If this item is in a lower position than the paginate value, show it
            $(this).removeClass('hidden-item').addClass('visible-item');
          }
        });
      } else { // Otherwise show all of them and don't show the button
        $(remainingItems).each(function(index) {
          $(this).removeClass('hidden-item').addClass('visible-item');
        });
      }
    }
	
    if (useButton) { // If the 'show more' button is to be used     
      if (paginate) { // If paginate value has been used
        pagination(paginate, this); // Set pagination based on the "paginate" variable provided
      } else { // If paginate isn't used
        pagination(showMoreDefault, this); // Set pagination based on the default
      }

      // Button behaviour function (Written by Squiz)
      (function($) {
        'use strict';
          
        var $blockListingMore = $('.showMore' + index),
          $blockListing = $('.ctnewsevents[data-type="filter' + index + '"]');
 
        function addRemoveClass(el) { // On-click display behaviour for use further down
          el.hide();
          el.removeClass('hidden-item').addClass('visible-item')
          el.fadeIn();
        }
  
        if ($blockListingMore.length) {
          $blockListingMore.find('a').on('click', function(e) { // When the button is clicked
            e.preventDefault(); // Prevent it from behaving like a normal web link
  
            var $this = $(this);
            var $hiddenItem = $blockListing.find('.hidden-item'); // Get all hidden items
            var $hiddenFirst = $hiddenItem.eq(0); // Get the first hidden item
            var $hiddenCount = $hiddenItem.length;  // How many hidden items are there?
            var $showCount = $hiddenCount - 1; 
  
            if ($hiddenCount > showMoreDefault) { // if there are more hidden items than the showMoreDefault value
              $hiddenItem.each(function(index) { // Show the next number of hidden items up to the showMoreDafult value, then stop
                var $hidden = $(this);
                if (index < showMoreDefault) {
                  setTimeout(function() {
                    addRemoveClass($hidden);
                  }, 100 * index);
                } else {
                  return false;
                }
              });
            } else { // If there are fewer hiddent items than the showMoreDefault value
              $hiddenItem.each(function(index) { // Show all remaining hidden items
                var $hidden = $(this);
                setTimeout(function() {
                  addRemoveClass($hidden);
                }, 100 * index);
              });
              $blockListingMore.remove(); // Then remove the button
            }
          });
        }
      }(jQuery));
      
    } else { // If set to not use button
      if (paginate) { // If paginate value has been used
        pagination(paginate); // Set number of items to view based on the "paginate" variable provided
        $(this).find('div.showMore').remove(); // remove button (that gets inserted via function above)
      } else { // If paginate isn't used, show everything
        $(remainingItems).each(function(index) {
          $(this).removeClass('hidden-item').addClass('visible-item');
        });
      }
    }       
  }); // End each
});
