export default class HttpClient {
    BASE_URL;
    constructor() {
        this.BASE_URL = 'https://tech-culture-api-default-rtdb.europe-west1.firebasedatabase.app/'
    }
    getData = async (endpoint,chosen) => {
        const res = await fetch(this.BASE_URL + 'data/0/'+ endpoint +'_' + chosen+'.json')
        return await res.json()
    }

    getErrors = async (chosen) => {
        const res = await fetch(this.BASE_URL + 'errors_' +  chosen + '.json')
        return await res.json()
    }
}
