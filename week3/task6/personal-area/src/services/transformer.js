import HttpClient from "./HttpClient";

export default class Transformer{
    httpClient = new HttpClient()
    transformData = async (chosen) => {
        let data = {}
        const fields = [ 'timeout', 'zeroes', 'avg_price','str','errors','ctr','searches_current','bookings_current',
            'searches_previous','bookings_previous','clicks_previous','clicks_current']
        for(let field of fields) {
            const date = await this.httpClient.getData(field,chosen)
            if(date === null)
                throw new Error()
            data[field] = date
        }
        return data;
    }
    transformErrors =async (chosen) => {
        const res = await this.httpClient.getErrors(chosen)
        if(res === null)
            throw new Error()
        return res
    }
}


