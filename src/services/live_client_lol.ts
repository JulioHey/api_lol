import { AxiosStatic } from 'axios';
import {Agent} from "https";


export class LiveClient {
    api: AxiosStatic;
    url: string;
    https: any;

    constructor(axios: AxiosStatic) {
        this.api = axios;
        this.https = new Agent();

        this.url = "";
    }

    async compareNames(summoner: string) {
        const data = await this.getActiveName();

        // return data.activePlayer.summonerName;
        // // const {summonerName} = await this.getActiveName();

        // // console.log(summonerName);

        if (data.activePlayer.summonerName === summoner) {
            return true;
        } else {
            return false;
        }

    }

    async getActiveName(): Promise<any> {
        try {
            this.url = this.createUrl();
            const httpsAgent = this.constructAgent();
    
            const {data}: any = await this.api.get(this.url, {httpsAgent});

            const {activePlayer} = data;

            return {activePlayer};
        } catch(error) {
            return error
        }

        // return data;
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