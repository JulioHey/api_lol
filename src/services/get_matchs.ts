import axios, { AxiosStatic } from 'axios';


export class getMatchs {
    api: AxiosStatic;
    url: string;
    apiKey: string;

    constructor(apiKey: string) {
        this.api = axios;
        this.apiKey = apiKey;

        this.url = "";
    }

    async getInfo(summoner: string, server?: string) {
        this.url = this.createUrl(this.apiKey, summoner, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    createUrl(apiKey: string, accountid: string, server?: string){
        const url = `https://${server ? server : "br1"}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountid}?api_key=${apiKey}`
        return url;
    }

}