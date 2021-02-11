import {
    AxiosStatic
} from 'axios';

export class SteamAPI {
    api: AxiosStatic;
    baseurl: string;
    apiKey: string;

    constructor(apiKey: string,axios: AxiosStatic) {
        this.api = axios;
        this.baseurl = "http://api.steampowered.com";
        this.apiKey = apiKey;
    }

    getSteamIDByUserName = async (userName: string) => {
        const apiURL = this.constructURL(`/ISteamUser/ResolveVanityURL/v0001/?key=${this.apiKey}&vanityurl=${userName}`)
        
        const response = await this.api.get(apiURL);

        return String(response.data.response.steamid);
    }

    constructURL(finalURL: string) {
        const baseURL = this.baseurl;
        
        const newURL = baseURL.concat(finalURL)

        return newURL;
    }

    getPlayerStatistcsByID = async (steamID: any) => {
        const apiURL = this.constructURL(`/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${this.apiKey}&steamid=${steamID}`)
    
        const response = await this.api.get(apiURL);

        return response.data;
    }

    getStatics = async (userName: string) => {
        try {
            const steamID = await this.getSteamIDByUserName(userName);

            const status = await this.getPlayerStatistcsByID(steamID);
            
            this.getValuableIndex(status.playerstats.stats);

            return status.playerstats.stats;
        } catch {
            return "User not found"
        }
    }

    getValuableInfo(stats: any) {
        const totalKills = stats[0].value;
        const totalDeaths = stats[1].value;

        const totalMathesWon = stats[102].value;
        const totalMathes = stats[103].value;
        
        const totalMVPs = stats[90].value;
    }

    getValuableIndex(stats: Array<any>) {
        stats.map((element, index) => {
            if (element.name === "total_mvps") {
                console.log(index) 
            }
        })
    }

}