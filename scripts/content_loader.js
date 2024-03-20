// Script for dynamically loading content
document.addEventListener("DOMContentLoaded", function() 
{
    // Reference for container div
    var contentDiv = document.getElementById("dynamic_content");

    // Fetch HTML content from a path (or URL if you really want to)
    async function fetchAndLoadHTML(path) 
    {
        try 
        {
            const response = await fetch(path);
            const html = await response.text();
            return html;
        } 
        catch (error) 
        {
            console.error("Error fetching HTML content:", error);
            return null;
        }
    }

    // Load content based on navigation clicks
    async function loadContent(contentName) 
    {
        // Clear existing stuff
        contentDiv.innerHTML = "";

        switch (contentName) 
        {
            case "home":
                const homeHTML = await fetchAndLoadHTML("pages/home.html");
                if (homeHTML) 
                {
                    contentDiv.innerHTML = homeHTML;
                }
                break;
            case "projects":
                const aboutHTML = await fetchAndLoadHTML("pages/projects.html");
                if (aboutHTML) 
                {
                    contentDiv.innerHTML = aboutHTML;
                }
                break;
            case "contact":
                const contactHTML = await fetchAndLoadHTML("pages/contact.html");
                if (contactHTML) 
                {
                    contentDiv.innerHTML = contactHTML;
                }
                break;
            default:
                contentDiv.innerHTML = "<h1>404 Not Found</h1><p>Page not found.</p>";
        }

        // Update button styles
        updateButtonStyles(contentName);
    }

    // Function to update button styles
    function updateButtonStyles(selectedButtonId) 
    {
        // Get all buttons
        var navLinks = document.querySelectorAll("nav a");

        navLinks.forEach(function(link) 
        {
            if (link.id === selectedButtonId) 
            {
                link.classList.add("selected");
            } 
            else 
            {
                link.classList.remove("selected");
            }
        });
    }

    // Add event listeners to buttons
    var navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function(link) 
    {
        link.addEventListener("click", function(event) 
        {
            // Prevent default anchor behavior
            event.preventDefault();

            loadContent(link.id);
        });
    });
});
