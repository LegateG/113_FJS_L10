// --- Task 1: GET request with fetch() ---

// Required DOM elements
const fetchBtn = document.getElementById('fetchBtn');
const resultsDiv = document.getElementById('results');

// Event listener for fetch() button
fetchBtn.addEventListener('click', () => {
    // API endpoint
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    
    resultsDiv.innerHTML = '<p>Fetching data with fetch()...</p>';

    fetch(apiUrl)
        .then(response => {
            // If the response is unsuccessful (404, 500 etc), throw error
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display data if successful
            resultsDiv.innerHTML = `
                <div class="post">
                    <p class="post-title">${data.title}</p>
                    <p>${data.body}</p>
                </div>
            `;
        })
        .catch(error => {
            // Show error if unsuccessful
            resultsDiv.innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
            console.error('Fetch Error:', error);
        });
});

// --- Task 2: GET Request with XMLHttpRequest ---

// Selecting DOM element for XHR button
const xhrBtn = document.getElementById('xhrBtn');

// Event listener for XHR button
xhrBtn.addEventListener('click', () => {
    // API endpoint
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/2';
    
    resultsDiv.innerHTML = '<p>Fetching data with XHR...</p>';
    
    // Creating a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Opening URL for GET request
    xhr.open('GET', apiUrl, true);
    
    // This function will run upon request completion
    xhr.onload = function() {
        // If 200 (OK)
        if (xhr.status >= 200 && xhr.status < 300) {
            // Parsing incoming JSON data
            const data = JSON.parse(xhr.responseText);
            // Displaying data
            resultsDiv.innerHTML = `
                <div class="post">
                    <p class="post-title">${data.title}</p>
                    <p>${data.body}</p>
                </div>
            `;
        } else {
            // Error display
            resultsDiv.innerHTML = `<p class="error">Error fetching data: Server responded with status ${xhr.status}</p>`;
            console.error('XHR Error:', xhr.statusText);
        }
    };
    
    // This will run if there2s a network error
    xhr.onerror = function() {
        resultsDiv.innerHTML = '<p class="error">Error fetching data: Network request failed.</p>';
        console.error('XHR Network Error');
    };
    
    xhr.send();
});
