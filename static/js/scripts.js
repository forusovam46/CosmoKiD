document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize the solar system animation
    function initializeSolarSystemAnimation() {
        const solarSystem = document.getElementById('solar-system-animation');
        if (solarSystem) {
            solarSystem.innerHTML = `
                <div class="sun"></div>
                <div class="orbit orbit1"><div class="planet planet1"></div></div>
                <div class="orbit orbit2"><div class="planet planet2"></div></div>
                <div class="orbit orbit3"><div class="planet planet3"></div></div>
            `;
        }
    }

    // Handle logo visibility
    const homeButton = document.getElementById('home-button');
    const largeLogo = document.getElementById('large-logo');

    function updateLogoVisibility() {
        if (window.location.pathname === '/' || window.location.pathname === '/index') {
            // On the home page, show the large logo and hide the home button
            if (largeLogo) {
                largeLogo.style.opacity = 1;
                largeLogo.style.visibility = 'visible';
            }
            if (homeButton) {
                homeButton.classList.remove('visible');
            }
        } else {
            // On other pages, hide the large logo and show the home button
            if (largeLogo) {
                largeLogo.style.opacity = 0;
                largeLogo.style.visibility = 'hidden';
            }
            if (homeButton) {
                homeButton.classList.add('visible');
            }
        }
    }

    // Intercept link clicks to manually manage history state and update visibility
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const url = link.getAttribute('href');
            history.pushState(null, '', url); // Update the browser history
            updateLogoVisibility(); // Update the logo visibility
            // Simulate navigation by fetching the content
            fetch(url).then(response => response.text()).then(html => {
                document.querySelector('main').innerHTML = new DOMParser().parseFromString(html, 'text/html').querySelector('main').innerHTML;
                // Re-initialize the solar system animation if we navigate to the solar system page
                if (url.includes('solar_system')) {
                    initializeSolarSystemAnimation();
                }
            });
        });
    });

    // Run the update function on page load
    updateLogoVisibility();

    // Update on back/forward navigation
    window.addEventListener('popstate', updateLogoVisibility);

    // Initialize the solar system animation on page load if the page is solar_system
    if (window.location.pathname.includes('solar_system')) {
        initializeSolarSystemAnimation();
    }
});
