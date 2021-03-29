import { AxiosStatic } from 'axios';

import {
    LOLHistoryService
} from './noAsyncServices/riot_service_no_async';


export class getSummoner {
    api: AxiosStatic;
    url: string;
    apiKey: string;
    historyService: LOLHistoryService;

    constructor(apiKey: string, axios: AxiosStatic) {
        this.api = axios;
        this.apiKey = apiKey;
        this.historyService = new LOLHistoryService();

        this.url = "";
    }

    async getValMatchHistory(summonerId: string, server?: string) {
        const {puuid} = await this.getIdByName(summonerId, server);

        // return puuid;

        const response = await this.getMatchByPuuidVal(puuid, server);

        return response;
    }

    async getFullMatchInfo(matchId: any,server?: string) {
        const matchData = await this.getMatchInfoByGameId(matchId, server);

        const response = this.historyService.handleMatchData(matchData);

        return response;
    }

    async getBasicMatchesInfo(summoner: string, server?: string, startMatch: number = 0, finalMatch: number = 5) {
        const {accountId} = await this.getIdByName(summoner, server);
        
        const fullMatchData = await this.getHistoryByID(accountId, server);

        const selectedmatches = this.historyService.sliceMatchesArray(fullMatchData, startMatch, finalMatch);

        let BasicMatchsData: Array<any> = [];

        const teste = selectedmatches.map(async (element: any) => {
            const matchData = await this.getMatchInfoByGameId(element.gameId);
            const basicData = this.historyService.handleBasicMatchData(matchData, summoner);
            BasicMatchsData.push({basicData, gameId: element.gameId});
        });

        await Promise.all(teste);

        return BasicMatchsData;
    }

    async getStatus(summoner: string, server?: string) {
        const {id} = await this.getIdByName(summoner, server);

        const data = await this.getStatusByID(id, server);

        const playerData = this.historyService.handlePlayerData(data);

        return playerData;
    }

    async getIdByName(summoner: string, server?: string) {
        const encodedSummoner = this.historyService.encodeSummonerName(summoner);

        const finalURL = `lol/summoner/v4/summoners/by-name/${encodedSummoner}?api_key=${this.apiKey}`        

        this.url = this.historyService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    async getStatusByID(summonerId: string, server?: string) {
        const finalURL = `lol/league/v4/entries/by-summoner/${summonerId}?api_key=${this.apiKey}`        

        this.url = this.historyService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data[0];
    }

    async getHistoryByID(id: string, server?: string) {
        const finalURL = `lol/match/v4/matchlists/by-account/${id}?api_key=${this.apiKey}`;

        this.url = this.historyService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    async getMatchInfoByGameId(gameId: string, server?: string) {
        const finalURL = `lol/match/v4/matches/${gameId}?api_key=${this.apiKey}`;

        this.url = this.historyService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    async getMatchByPuuidVal(puuid: string, server: string = 'br') {
        const finalURL = `val/match/v1/matchlists/by-puuid/${puuid}?api_key=${this.apiKey}`;

        this.url = this.historyService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data; 
    }

    async getChampionsMasteryWithUserID(id: string, server: string = 'br1') {
        const finalURL = `lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${this.apiKey}`;

        this.url = this.historyService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data;
    }

    async getIfMatchIsWin(gameId: string, summonerName: string, server: string = 'br1') {
        const matchData = await this.getMatchInfoByGameId(gameId, server);

        const {
            teams,
            participantIdentities
        } = matchData;

        return (this.historyService.getIfMathcIsWin(teams, participantIdentities, summonerName));
    }

    async getChampionWinRate(championId: number, accountId: string,summonerName: string , server: string='br1') {
        const matchesArray = await this.getPlayerGameWithChampion(championId, accountId, server);

        return await this.loopOfGamesIds(matchesArray, summonerName);
        // return this.getPlayerGameWithChampion(championId, accountId, server);
    }

    async getPlayerGameWithChampion(championId: number, accountId: string, server: string='br1') {
        const finalURL = `lol/match/v4/matchlists/by-account/${accountId}?champion=${championId}&api_key=${this.apiKey}`

        this.url = this.historyService.createUrl(finalURL, server);

        const response = await this.api.get(this.url);

        return response.data.matches;
    }

    async loopOfGamesIds(matchesArray: Array<any>, summonerName: string) {
        const numberOfMatches = matchesArray.length;

        var numberOfWins = 0;

        const promise = matchesArray.map(async (match) => {
            // if (await this.getIfMatchIsWin(match.gameId, summonerName)) {
            // }
            const isWin = await this.getIfMatchIsWin(match.gameId, summonerName);
            if (isWin) {
                numberOfWins += 1;
            }
        });

        await Promise.all(promise);

        return {numberOfWins, numberOfMatches};
    }

}