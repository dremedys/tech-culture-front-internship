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

let posts = []
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
 * @description changes fields of httpClient instance after making GET and POST
 */
const setResponseCat = () => {
    lastRequest.innerText = `Last requested url: 
                                ${httpClient.get_last_request_url()}`
    statusCode.innerText = 'Status code: ' + httpClient.get_last_response_status_code()
    catImg.src = 'https://ak.picdn.net/shutterstock/videos/1052490562/thumb/9.jpg?ip=x480'
    setTimeout(() => catImg.src = 'https://http.cat/' + httpClient.get_last_response_status_code(),
        800)

}

/**
 * getting data from server
 */
httpClient.get('posts')
    .then(postsFromGet => {
        posts = posts.concat(postsFromGet.slice(0,5))
        render()
    })
    .finally(setResponseCat);

/**
 * @description when user click button, data will be send to server and post added to the feed
 */
form.addEventListener('submit', e => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const body = document.getElementById('body').value
    /**
     * @description instance of httpClient send POST requests with body to server
     */
    httpClient.post('posts', {title,body})
        .then((post) => {
            console.log(post)
            posts.push(post)
            render()
        })
        .catch((e) => console.log(e))
        .finally(setResponseCat)
})

/**
 * function which renders FEED
 */
const render = () => {
    posts.sort(function(a, b) {
        return a.id - b.id;
    })
        feed.innerHTML = posts.map(createPost).join('')
}
