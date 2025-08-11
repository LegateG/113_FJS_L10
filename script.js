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

// --- Task 3: POST Request with fetch() ---

// Form elements
const postForm = document.getElementById('postForm');
const postTitleInput = document.getElementById('postTitle');
const postBodyInput = document.getElementById('postBody');

// Event listener for form submission
postForm.addEventListener('submit', (event) => {
    // Block default form submission
    event.preventDefault();

    // API endpoint
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    
    // Data from the form
    const postData = {
        title: postTitleInput.value,
        body: postBodyInput.value,
        userId: 1, // sample user ID
    };
    
    resultsDiv.innerHTML = '<p>Sending POST request...</p>';
    
    fetch(apiUrl, {
        method: 'POST', // request method
        headers: {
            'Content-Type': 'application/json; charset=UTF-8', // Content type
        },
        body: JSON.stringify(postData), // convert data to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Display the success result
        resultsDiv.innerHTML = `
            <p class="success">Post created successfully!</p>
            <div class="post">
                <p><strong>ID:</strong> ${data.id}</p>
                <p class="post-title">${data.title}</p>
                <p>${data.body}</p>
            </div>
        `;
        postForm.reset(); // reset the form
    })
    .catch(error => {
        // error display
        resultsDiv.innerHTML = `<p class="error">Error creating post: ${error.message}</p>`;
        console.error('POST Error:', error);
    });
});

// --- Task 4: PUT request with XMLHttpRequest  ---

// DOM elements for PUT request and ID input
const putBtn = document.getElementById('putBtn');
const postIdInput = document.getElementById('postId');

// Event listener for PUT button click
putBtn.addEventListener('click', () => {
    const postId = postIdInput.value;
    
    // Check if postId is provided
    if (!postId) {
        resultsDiv.innerHTML = '<p class="error">Please enter a Post ID to update.</p>';
        return;
    }
    
    // Dynamic API endpoint
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    
    // Data to update
    const updateData = {
        id: postId,
        title: postTitleInput.value,
        body: postBodyInput.value,
        userId: 1,
    };
    
    resultsDiv.innerHTML = `<p>Sending PUT request for post ID: ${postId}...</p>`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', apiUrl, true);
    
    // Setting header for JSON content
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            // Başarılı yanıtı ekranda göster
            resultsDiv.innerHTML = `
                <p class="success">Post ${data.id} updated successfully!</p>
                <div class="post">
                    <p class="post-title">${data.title}</p>
                    <p>${data.body}</p>
                </div>
            `;
            postForm.reset();
        } else {
            resultsDiv.innerHTML = `<p class="error">Error updating post: Server responded with status ${xhr.status}</p>`;
            console.error('PUT Error:', xhr.statusText);
        }
    };
    
    xhr.onerror = function () {
        resultsDiv.innerHTML = '<p class="error">Error updating post: Network request failed.</p>';
        console.error('PUT Network Error');
    };
    
    // Sending the PUT request with JSON formatted data
    xhr.send(JSON.stringify(updateData));
});
