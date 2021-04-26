const httpClient = new HttpClient('https://jsonplaceholder.typicode.com/');

const feed = document.getElementById('news')
const statusCode = document.getElementById('status-code')
const catImg = document.getElementById('cat')
const lastRequest = document.getElementById('last-request')

const createPost = post =>
    `<div class="post">
        <p>${post.title}</p>
        <p>${post.body}</p>
        </div>`


httpClient.get('posts')
    .then(posts => {
        feed.innerHTML = '<h1>Feed</h1>' + posts.map(createPost).join('')
    })
    .finally(() => {
        lastRequest.innerText = `Last requested url: 
                                ${httpClient.last_request_url}`
        statusCode.innerText = 'Status code: ' + httpClient.last_response_status_code
        catImg.src = 'https://http.cat/' + httpClient.last_response_status_code
    });

