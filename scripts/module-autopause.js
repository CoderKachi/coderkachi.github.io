export function loadVideoObservers(container) 
{
    const videos = container.querySelectorAll("video.card_video");

    const settings = {threshold: 0.75};

    const observer = new IntersectionObserver(handleVideoIntersection, settings);

    for (const video of videos)
    {
        observer.observe(video);
    }
}

function handleVideoIntersection(entries) 
{
    entries.forEach(processVideoEntry);
}

function processVideoEntry(entry) 
{
    const video = entry.target;

    if (entry.isIntersecting) 
    {
        // Load the video (only once)
        const source = video.querySelector("source");
        if (source && !source.src)
        {
            source.src = source.dataset.src
            video.load();
        }

        // Play the video
        video.play();
    } 
    else 
    {
        video.pause();
    }
}