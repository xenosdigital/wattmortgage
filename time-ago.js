$(document).ready(function () {
    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diff = Math.abs(now - past); // Time difference in milliseconds

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    $('.review-time').each(function () {
        const dateText = $(this).text(); // Get the original date text
        const relativeTime = timeAgo(dateText); // Calculate the time ago
        $(this).text(relativeTime); // Update the text on the page
    });
});
