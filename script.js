async function loadHTML(targetElementId, url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }

        const htmlText = await response.text();

        document.getElementById(targetElementId).innerHTML = htmlText;
    } catch(error) {
        console.error("Error loading dynamic HTML:", error);
    }
}