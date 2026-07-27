import { loadVideoObservers } from './module-autopause.js';
import { loadCollapsibles } from './module-collapsible.js';

// Script for dynamically loading content
document.addEventListener("DOMContentLoaded", function() 
{
    // Reference for dynamic container div
    var contentDiv = document.getElementById("dynamic_content");

    // Fetch HTML content from a path
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
    async function loadContent(contentName, targetID = null) 
    {
        // Clear existing dynamic content
        contentDiv.innerHTML = "";
        let contentHTML = null;

        switch (contentName) 
        {
            case "home":
                contentHTML = await fetchAndLoadHTML("pages/home.html");
                break;
            case "projects":
                contentHTML = await fetchAndLoadHTML("pages/projects.html");
                break;
            case "contact":
                contentHTML = await fetchAndLoadHTML("pages/contact.html");
                break;
            case "highlights":
                contentHTML = await fetchAndLoadHTML("pages/highlights.html");
                break;
            default:
                contentDiv.innerHTML = "<h1>404 Not Found</h1><p>Page not found.</p>";
                return;
        }

        if (contentHTML)
        {
            contentDiv.innerHTML = contentHTML;
            await populateCardSlots();

            if (contentName == "highlights")
            {
                contentDiv.querySelectorAll(".card").forEach(
                    card => card.classList.add("card-highlight")
                );
            }

            loadCollapsibles(contentDiv);
            loadVideoObservers(contentDiv);

            // Scroll to target
            if (targetID)
            {
                const target = document.getElementById(targetID)

                const offset = 280;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                if (target)
                {
                    const scrollDelay = 300;

                    setTimeout(() =>
                    {
                        window.scrollTo({top: offsetPosition, behaviour: "smooth"});
                    }, scrollDelay);
                }
            }
        }

        // Update button styles
        updateButtonStyles(contentName);
    }

    // CARDS
    async function populateCardSlots()
    {
        const cardSlots = contentDiv.querySelectorAll(".card_slot");

        for (const cardSlot of cardSlots)
        {
            const cardName = cardSlot.getAttribute("data-card");
            if (cardName)
            {
                const cardHTML = await fetchAndLoadHTML(`content/${cardName}.html`);
                if (cardHTML)
                {
                    cardSlot.outerHTML = cardHTML;
                }
            }
        }
    }

    // NAVIGATION
    // Function to update styles of navigation buttons
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

    // Add event listeners to navigation buttons
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

    // Add event listeners to project buttons
    document.addEventListener("click", function(event)
    {
        const button = event.target.closest(".project-button");

        if (!button)
            return;

        loadContent(button.dataset.page, button.dataset.target);
    });

    loadContent("home");
});
