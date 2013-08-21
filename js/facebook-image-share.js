/**
* Facebook Image Sharing 
* Core
*
* @author	MarQuis L. Knox <opensource@marquisknox.com>
* @license	AGPL v3
* @link		http://www.gnu.org/licenses/agpl-3.0.html
* @link		https://github.com/MarQuisKnox
*
* @since 	Thursday, August 22, 2013 / 01:28 AM GMT+1 mknox
* @edited 	$Date$ $Author$
* @version 	$Revision: 1 $
*
* @package	Facebook Image Share
*/

$(document).ready(function() {
	
	$('img').each(function() {
		$(this).addClass('social-image-share');
	});	
		
	$('.social-image-share').on({		
	    mouseenter: function () {	    	
			if( !$(this).hasClass('isWrapped') ) {
				$('img.social-image-share.isWrapped').not(this).parent('.whiteOverlayContainer').find('.facebookShare').remove();
				$('img.social-image-share.isWrapped').not(this).parent('.whiteOverlayContainer').find('.whiteOverlay').remove();
				$('img.social-image-share.isWrapped').not(this).unwrap();							
				$('img.social-image-share.isWrapped').not(this).removeClass('isWrapped');
				
				var height	= $(this).height();
				var width	= $(this).width();
				
				IMG_POS_X = $(this).offset().left + width;
				IMG_POS_Y = $(this).offset().top + height;				
				
				$(this).addClass('isWrapped');
				$(this).wrap( $('#imageOverlayTemplate').html() );
				$(this).parent('.whiteOverlayContainer').height( height );
				$(this).parent('.whiteOverlayContainer').width( width );
				$(this).parent('.whiteOverlayContainer').find('.whiteOverlay').height( height );
				$(this).parent('.whiteOverlayContainer').find('.whiteOverlay').width( width );
			}
	    }
	});
	
	$('.facebookShare').live('click', function(event) {
		event.preventDefault();		
		
		var imageUrl = $(this).parent('.whiteOverlayContainer').find('.social-image-share').attr('src');
		imageUrl = location.href + '/' + imageUrl;
		
		// @link	https://developers.facebook.com/docs/reference/dialogs/feed/
		FB.ui({
			  method: 'feed',
			  // The link attached to this post
			  link: location.href,
			  /*
			   * The URL of a picture attached to this post. 
			   * The picture must be at least 200px by 200px. 
			   */
			  picture: imageUrl,
			  // The name of the link attachment.
			  name: document.title,
			  /*
			   * The caption of the link (appears beneath the link name). 
			   * If not specified, this field is automatically 
			   * populated with the URL of the link.
			   */
			  caption: document.title,
			  /* 
			   * The description of the link 
			   * (appears beneath the link caption). If not specified, 
			   * this field is automatically populated by information 
			   * scraped from the link, typically the title of the page.
			   */
			  description: document.title
		}, function( response ) {
			
		});	
	});
	
});