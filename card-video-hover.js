$(document).ready(function() {
    $(".home_layout_card, .home_cta_card").hover(function() {
        // Find the video element inside the hovered card and play it
        $(this).find('.video-element video').get(0).play();
    }, function() {
        // Find the video element inside the hovered card and pause it
        $(this).find('.video-element video').get(0).pause();
    });
});
