import { AxiosStatic } from 'axios';

import {
    RiothandleDataService
} from './noAsyncServices/riot_service_no_async';


// this class has all the methods that will be used fro fetching data from Riot Api
export class RiotAPI {
    api: AxiosStatic;
    riotAPIKey: string;

    // Here I use RiothandleDataService where all the data is handled ant it return in the way that we want
    riothandleDataService: RiothandleDataService;
    // Url propertie that will be reused in all http requests
    url: string;

    constructor(riotAPIKey: string, axios: AxiosStatic) {
        this.api = axios;
        this.riotAPIKey = riotAPIKey;
        this.riothandleDataService = new RiothandleDataService();

        this.url = "";
    }

    // All valorant methods are not working with my API key
    async getValMatchHistory(summonerId: string, server?: string) {
        const {puuid} = await this.getIdByName(summonerId, server);

        const response = await this.getMatchByPuuidVal(puuid, server);

        return response;
    }

    async getMatchByPuuidVal(puuid: string, server: string = 'br') {
        const finalURL = `val/match/v1/matchlists/by-puuid/${puuid}?api_key=${this.riotAPIKey}`;

        this.url = this.riothandleDataService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data; 
    }

    async getIdByName(summoner: string, server?: string) {
        const encodedSummoner = this.riothandleDataService.encodeSummonerName(summoner);

        const finalURL = `lol/summoner/v4/summoners/by-name/${encodedSummoner}?api_key=${this.riotAPIKey}`        

        this.url = this.riothandleDataService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    async getStatusByID(summonerId: string, server?: string) {
        const finalURL = `lol/league/v4/entries/by-summoner/${summonerId}?api_key=${this.riotAPIKey}`        

        this.url = this.riothandleDataService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data[0];
    }

    
    async getStatus(summoner: string, server?: string) {
        const {id} = await this.getIdByName(summoner, server);

        const data = await this.getStatusByID(id, server);

        const playerData = this.riothandleDataService.handlePlayerData(data);

        return playerData;
    }

    async getPlayerHistoryById(id: string, server?: string) {
        const finalURL = `lol/match/v4/matchlists/by-account/${id}?api_key=${this.riotAPIKey}`;

        this.url = this.riothandleDataService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    async getMatchInfoByGameId(gameId: string, server?: string) {
        const finalURL = `lol/match/v4/matches/${gameId}?api_key=${this.riotAPIKey}`;

        this.url = this.riothandleDataService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    // Here you will send summonerName and receive Basic MatchData from the matchs you have specified in the function
    async getBasicMatchesInfo(summoner: string, server?: string, startMatch: number = 0, finalMatch: number = 5) {
        const {accountId} = await this.getIdByName(summoner, server);
       
        // GetMatchIds
        const fullMatchData = await this.getPlayerHistoryById(accountId, server);

        // Slice MatchArray
        const selectedmatches = this.riothandleDataService.sliceMatchesArray(fullMatchData, startMatch, finalMatch);

        let BasicMatchsData: Array<any> = [];

        // Map for each id, and push data from reponse
        const PromiseData = selectedmatches.map(async (element: any) => {
            const matchData = await this.getMatchInfoByGameId(element.gameId);

            // Handle match data
            const basicData = this.riothandleDataService.handleBasicMatchData(matchData, summoner);
            BasicMatchsData.push({basicData, gameId: element.gameId});
        });

        await Promise.all(PromiseData);

        return BasicMatchsData;
    }

    // Data that will be shown when the "dropDown" match, very specific data from one match;
    async getFullMatchInfo(matchId: any,server?: string) {
        const matchData = await this.getMatchInfoByGameId(matchId, server);

        const response = this.riothandleDataService.handleMatchData(matchData);

        return response;
    }

}