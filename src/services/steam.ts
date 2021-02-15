import {
    AxiosStatic
} from 'axios';




export class SteamAPI {
    api: AxiosStatic;
    baseurl: string;
    apiKey: string;

    apiLabels: Array<string>;
    labels: Array<string>;

    constructor(apiKey: string,axios: AxiosStatic, apiLabelsArray: Array<any>) {
        this.api = axios;
        this.baseurl = "http://api.steampowered.com";
        this.apiKey = apiKey;

        const Labels = this.getArrays(apiLabelsArray);

        this.labels = Labels[1];
        this.apiLabels = Labels[0];
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
            
            // this.getValuableIndex(status.playerstats.stats);
            const formatedData = this.getValuableInfo(status.playerstats.stats);

            const formatedAchievments = this.formatAchievements(status.playerstats.achievements);

            return [formatedData, formatedAchievments];
        } catch {
            return "User not found"
        }
    }

    getValuableInfo(stats: Array<any>) {
        const totalKills = stats[0].value;
        const totalDeaths = stats[1].value;

        const totalMathesWon = stats[102].value;
        const totalMathes = stats[103].value;

        const totalMVPs = stats[90].value;
        const totalHits = stats[39].value;
        const totalFired = stats[40].value;

        const accuracy = totalHits / totalFired;

        // const totalContributionScore = stats[40].value;

        return {
            totalKills,
            totalDeaths,
            totalMathesWon,
            totalMathes,
            totalMVPs,
            totalHits,
            totalFired,
            accuracy
        }
        
    }

    getArrays(apiLabelArray: Array<any>) {
        const apiLabels: Array<string> = [];
        const Labels: Array<string> = [];

        apiLabelArray.map((element) => {
            apiLabels.push(element.api_label);
            Labels.push(element.label);
        });

        return [apiLabels, Labels];

    }

    formatAchievements(apiArray: Array<any>) {
        const labels: Array<string> = []

        apiArray.map((element) => {
            const index = this.apiLabels.indexOf(element.name);

            labels.push(this.labels[index]);
        });

        return labels;
    }

    getValuableIndex(stats: Array<any>) {
        

        stats.map((element, index) => {
            if (element.name === "total_shots_hit") {
                console.log(index) 
            }
        })
    }

}