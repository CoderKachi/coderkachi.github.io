export function loadCollapsibles(container) 
{
    const collapsibles = container.querySelectorAll(".collapsible");
    collapsibles.forEach(setupCollapsible);
}

function setupCollapsible(button) 
{
    const panel = button.nextElementSibling; // 'collapsible-panel' should always be placed after 'collapsible'

    button.addEventListener("click", () => toggleCollapsible(button, panel));
    panel.addEventListener("transitionend", () => onTransitionEnd(panel)); // Triggers when collapsible-panel.maxHeight transition ends
}

function toggleCollapsible(button, panel) 
{
    const isOpen = panel.classList.contains("open");
    const icon = button.querySelector(".collapsible_icon");

    if (isOpen) 
    {
        closePanel(button, panel, icon);
    } 
    else 
    {
        openPanel(button, panel, icon);
    }
}

function closePanel(button, panel, icon) 
{
    // Set to current scrollHeight
    panel.style.maxHeight = panel.scrollHeight + "px";

    // Then close
    requestAnimationFrame(() => 
    {
        panel.style.maxHeight = "0px";
        panel.classList.remove("open");
        button.classList.remove("active");
        if (icon) icon.classList.replace("fa-minus", "fa-plus");
    });
}

function openPanel(button, panel, icon) 
{
    // Set to closed maxHeight
    panel.style.maxHeight = "0px";
    panel.classList.add("open");
    button.classList.add("active");

    // Then open
    requestAnimationFrame(() => 
    {
        panel.style.maxHeight = panel.scrollHeight + "px";
    });

    if (icon) icon.classList.replace("fa-plus", "fa-minus");
}

function onTransitionEnd(panel) 
{
    if (panel.classList.contains("open")) 
    {
        panel.style.maxHeight = "none";
    }
}
