document.addEventListener('DOMContentLoaded', function() {
    // Logo becomes home button functionality
    const homeButton = document.getElementById('home-button');
    const largeLogo = document.getElementById('large-logo');

    function updateLogoVisibility() {
        if (window.location.pathname === '/' || window.location.pathname === '/index') {
            // On the home page, show the logo and hide the home button
            if (largeLogo) {
                largeLogo.style.opacity = 1;
                largeLogo.style.visibility = 'visible';
            }
            if (homeButton) {
                homeButton.classList.remove('visible');
            }
        } else {
            // On other pages, hide the logo and show the home button
            if (largeLogo) {
                largeLogo.style.opacity = 0;
                largeLogo.style.visibility = 'hidden';
            }
            if (homeButton) {
                homeButton.classList.add('visible');
            }
        }
    }

    // Function to handle navigation and content fetching
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevents the browser from and refreshing the page to insure smoothness
            const url = link.getAttribute('href');
            history.pushState(null, '', url); // Update the browser history
            updateLogoVisibility(); // Update the logo visibility
            fetch(url).then(response => response.text()).then(html => {
                document.querySelector('main').innerHTML = new DOMParser().parseFromString(html, 'text/html').querySelector('main').innerHTML;
            });
        });
    });
    updateLogoVisibility();
    window.addEventListener('popstate', updateLogoVisibility);
    
});
