import { AxiosStatic } from 'axios';
import {Agent} from "https";


export class LiveClient {
    api: AxiosStatic;
    url: string;
    https: any;
    // apiKey: string;

    constructor(axios: AxiosStatic) {
        this.api = axios;
        // this.apiKey = apiKey;
        this.https = new Agent();

        this.url = "";
    }

    async compareNames(summoner: string) {
        // const {summonerName} = await this.getActiveName();

        // if (summonerName === summoner) {
        //     return true;
        // } else {
        //     return false;
        // }
       return await this.getActiveName();

    }

    async getActiveName(): Promise<any> {
        this.url = this.createUrl();
        const httpsAgent = this.constructAgent();

        const {data}: any = await this.api.get(this.url, {httpsAgent})
        // const {summonerName} = data;
        // return {summonerName};
        return data;
    }

    createUrl(){
        return `https://127.0.0.1:2999/liveclientdata/allgamedata`;
    }

    constructAgent() {
        return (
            new Agent({
                rejectUnauthorized: false,
            })
        )
    }
}