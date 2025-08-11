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
