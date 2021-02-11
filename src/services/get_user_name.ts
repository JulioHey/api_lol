import { AxiosStatic } from 'axios';


export class getSummoner {
    api: AxiosStatic;
    url: string;
    apiKey: string;

    constructor(apiKey: string, axios: AxiosStatic) {
        this.api = axios;
        this.apiKey = apiKey;

        this.url = "";
    }

    async getInfoByName(summoner: string, server?: string) {
        const finalURL = `/summoner/v4/summoners/by-name/${summoner}?api_key=${this.apiKey}`        

        this.url = this.createUrl( finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    createUrl( finalURL: string, server?: string){
        const baseURL = `https://${server ? server : "br1"}.api.riotgames.com/lol`

        const url = baseURL.concat(finalURL);
        return url;
    }

    async getStatusByID(summonerId: string, server?: string) {
        const finalURL = `/league/v4/entries/by-summoner/${summonerId}?api_key=${this.apiKey}`        

        this.url = this.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    async getStatus(summoner: string, server?: string) {
        const {id} = await this.getInfoByName(summoner, server);

        const data = await this.getStatusByID(id, server);

        return data;
    }
}