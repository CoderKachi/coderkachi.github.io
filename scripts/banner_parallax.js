// Script for a parallax effect, will probably make it more general later
// Only works on the banner for now

// Lerping
function lerp(start, end, t) 
{
    return start * (1 - t) + end * t;
}

// Constants
const yOffset = -170;

// Variables
let prevMouseX = 0;
let prevMouseY = 0;
let targetOffsetX = 0;
let targetOffsetY = 0;
let currentOffsetX = 0;
let currentOffsetY = 0;

document.addEventListener('mousemove', function(event) 
{
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    targetOffsetX = (mouseX - windowCenterX) / 20;
    targetOffsetY = ((mouseY - windowCenterY) / 20) + yOffset;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
});

function updateBackgroundPosition() 
{
    const banner = document.getElementById('banner');

    currentOffsetX = lerp(currentOffsetX, targetOffsetX, 0.03);
    currentOffsetY = lerp(currentOffsetY, targetOffsetY, 0.03);
    banner.style.backgroundPositionX = `calc(50% + ${-currentOffsetX}px)`;
    banner.style.backgroundPositionY = `calc(50% + ${-currentOffsetY}px)`;

    requestAnimationFrame(updateBackgroundPosition);
}

// Start
updateBackgroundPosition();
