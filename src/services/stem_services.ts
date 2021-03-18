import {
    AxiosStatic
} from 'axios';


import {
    SteamHandleDataService
} from './noAsyncServices/stem_service_no_async';


export class SteamAPI {
    api: AxiosStatic;
    apiKey: string;
    steamHandleDataService: SteamHandleDataService

    constructor(
        apiKey: string,
        axios: AxiosStatic,
        // Array Label for conversion of the Achievments labels
        apiLabelsArray: Array<any>
    ) {
        this.api = axios;
        this.apiKey = apiKey;
        this.steamHandleDataService = new SteamHandleDataService(apiLabelsArray)
    }

    getSteamIDByUserName = async (userName: string) => {
        const apiURL = this.steamHandleDataService.constructURL(`/ISteamUser/ResolveVanityURL/v0001/?key=${this.apiKey}&vanityurl=${userName}`)
        
        const response = await this.api.get(apiURL);

        return String(response.data.response.steamid);
    }

    getPlayerStatistcsByID = async (steamID: any) => {
        const apiURL = this.steamHandleDataService.constructURL(`/ISteamUserStats/GetUserStatsForGame/v002/?appid=730&key=${this.apiKey}&steamid=${steamID}`)
    
        const response = await this.api.get(apiURL);

        // return apiURL;

        return response.data;
    }

    getStatusByName = async (userName: string) => {
        const steamID = await this.getSteamIDByUserName(userName);

        const status = await this.getPlayerStatistcsByID(steamID);

        return status;
    }

    getStatics = async (userName: string) => {
        try {
            const status = await this.getStatusByName(userName);

            this.steamHandleDataService.getValuableIndex(status.playerstats.stats);
            
            const formatedData = this.steamHandleDataService.getValuableInfo(status.playerstats.stats);

            const formatedAchievments = await this.steamHandleDataService.formatAchievements(status.playerstats.achievements);

            return [formatedData, formatedAchievments];
        } catch(error) {
            return error;
        }
    }

    getWeaponsStats = async (userName: string) => {
        try {
            const status = await this.getStatusByName(userName);

            const response = this.steamHandleDataService.formatWeaponsStats(status.playerstats.stats);
    
            return response;
        } catch(error) {
            return error;
        }
    }


}