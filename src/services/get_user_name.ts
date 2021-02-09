import axios, { AxiosStatic } from 'axios';


export class getSummoner {
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
        console.log(response.data);

        return response.data;
    }

    createUrl(apiKey: string, summonerName: string, server?: string){
        const url = `https://${server ? server : "br1"}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
        return url;
    }

}