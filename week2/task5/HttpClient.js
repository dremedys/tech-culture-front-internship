/**
 *@description Custom class which implements GET and POST method
 */
class HttpClient{
    /**
     * @description the main API url
     * @type string
     */
    BASE_URL
    /**
     * @type string
     * @description last url
     */
    last_request_url
    last_response_status_code
    last_error_info

    /**
     *
     * @param BASE_URL string
     */
    constructor(BASE_URL) {
        this.BASE_URL = BASE_URL
    }

    /**
     * @description method to make GET request to the server with endpoint
     * @param endpoint
     * @returns {Promise<Response>}
     */
    async get(endpoint) {
        this.last_request_url = this.BASE_URL + endpoint

        return fetch(this.BASE_URL.concat(endpoint))
            .then(response => {
                this.last_response_status_code = response.status
                if(response.ok)
                    return response.json();
                else
                    this.last_error_info = response.statusText
            })
            .then((json) => {
                return json;
            });
    }
    /**
     * @description method to make GET request to the server with endpoint
     * @param endpoint point which was added to main url to make POST
     * @returns {Promise<Response>}
     */
    async post(endpoint, data = {}) {
        return  await fetch(this.BASE_URL+endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            response => {
                this.last_response_status_code = response.status
                if(response.ok)
                    return response.json();
                else
                    this.last_error_info = response.statusText
            })
            .then((json) => {
                return json;
            }
        ).catch((e)=> console.log('error'));

    }

    /**
     *
     * @returns field of the class last_error_info
     */
    get_last_error_info(){
        return this.last_error_info
    }

    /**
     *
     * @returns field of the class last_response_status_code
     */
    get_last_response_status_code(){
        return this.last_response_status_code
    }

    /**
     *
     * @returns field of the class last_request_url
     */
    get_last_request_url(){
        return this.last_request_url
    }
}

