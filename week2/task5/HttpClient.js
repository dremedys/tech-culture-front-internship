/**
 *@description Custom class which implements GET and POST method
 */
class HttpClient{
    /**
     * @description the main API url
     * @type string
     */
    BASE_URL
    last_request_url
    last_response_status_code
    last_error_info

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


    async post(endpoint,body) {
        this.last_request_url = this.BASE_URL + endpoint

        return fetch(this.BASE_URL.concat(endpoint),body)
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
     *
     * @returns field of the class last_error_info
     */
    getLastErrorInfo(){
        return this.last_error_info
    }

    /**
     *
     * @returns field of the class last_response_status_code
     */
    getLastResponseStatusCode(){
        return this.last_response_status_code
    }

    /**
     *
     * @returns field of the class last_request_url
     */
    getLastRequestUrl(){
        return this.last_request_url
    }
}

