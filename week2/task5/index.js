/**
 *
 * @type {HttpClient} created instance for jsonplaceholder
 */
const httpClient = new HttpClient('https://jsonplaceholder.typicode.com/');

const feed = document.getElementById('news')
const statusCode = document.getElementById('status-code')
const catImg = document.getElementById('cat')
const lastRequest = document.getElementById('last-request')
const form = document.querySelector('form')

/**
 *
 * @param post object of post
 * @returns {string} HTML block to show beatified post
 */
const createPost = post =>
    `<div class="post">
        <p>${post.title}</p>
        <p>${post.body}</p>
        </div>`

/**
 * updating Response statuses after request
 */
const setResponseCat = () => {
    lastRequest.innerText = `Last requested url: 
                                ${httpClient.last_request_url}`
    statusCode.innerText = 'Status code: ' + httpClient.last_response_status_code
    catImg.src = 'https://http.cat/' + httpClient.last_response_status_code
}

/**
 * getting data from server
 */
httpClient.get('posts')
    .then(posts => {
        feed.innerHTML = '<h1>Feed</h1>' + posts.map(createPost).join('')
    })
    .finally(setResponseCat);

/**
 * sending data to the server
 */
form.addEventListener('submit', e => {
    e.preventDefault()

    // getting key and values from the form
    const formData = new FormData(form);

    httpClient.post('posts', formData)
        .then(res => {
            console.log('success');
        })
        .catch(() => console.log('caught error'))
        .finally(setResponseCat)
})
