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
        const encodedSummoner = this.encodeSummonerName(summoner);

        const finalURL = `/summoner/v4/summoners/by-name/${encodedSummoner}?api_key=${this.apiKey}`        

        this.url = this.createUrl( finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    encodeSummonerName(summoner: string) {
        const ç = /ç/ig;
        const space = / /ig;

        const newSummoner1 = summoner.replace(ç, "%C3%A7");
        const newSummoner2 = newSummoner1.replace(space, "%20");

        return newSummoner2;
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

        return response.data[0];
    }

    async getStatus(summoner: string, server?: string) {
        const {id} = await this.getInfoByName(summoner, server);

        const data = await this.getStatusByID(id, server);

        const playerData = this.handlePlayerData(data);

        return playerData;
    }

    handlePlayerData(data: any) {
        const tier = this.translateTier(data.tier);
        const {
            rank,
            leaguePoints,
            wins,
            losses,
            summonerName
        } = data;

        const matches = wins + losses;
        const winRatio = wins / matches;

        return {
            tier,
            rank,
            leaguePoints,
            wins,
            summonerName,
            losses,
            matches,
            winRatio
        };
    }

    translateTier(tier: string) {
        switch (tier) {
            case "IRON": {
                return "Ferro";
            }
            case "BRONZE": {
                return "Bronze";
            }
            case "SILVER": { 
                return "Prata";
            }
            case "GOLD": {
                return "Ouro";
            }
            case "PLATINUM": {
                return "Platina";
            }
            case "DIAMOND": {
                return "Diamante";
            }
            case "MASTER": {
                return "Mestre";
            }
            case "GRANDMASTER": {
                return "Grão-Mestre";
            }
            case "CHALLANGER": {
                return "Desafiante";
            }
        }
    }
}