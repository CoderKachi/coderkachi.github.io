// Script for a parallax effect on video backgrounds
// Non functional, WIP

// Lerping
function lerp(start, end, t) 
{
    return start * (1 - t) + end * t;
}

// Constants
const yOffset = -150;

// Variables
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
});

function updateBackgroundPosition() 
{
    const videoBackground = document.querySelector('.video_background');

    currentOffsetX = lerp(currentOffsetX, targetOffsetX, 0.03);
    currentOffsetY = lerp(currentOffsetY, targetOffsetY, 0.03);
    videoBackground.style.transform = `translate(${currentOffsetX}px, ${currentOffsetY}px)`;

    requestAnimationFrame(updateBackgroundPosition);
}

// Start
updateBackgroundPosition();

