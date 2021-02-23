import {
    AxiosStatic
} from 'axios';

interface WeaponStaticProps {
    kills:number
    hits:number
    shots:number 
}


export class SteamAPI {
    api: AxiosStatic;
    baseurl: string;
    apiKey: string;

    apiLabels: Array<any>;

    constructor(apiKey: string,axios: AxiosStatic, apiLabelsArray: Array<any>) {
        this.api = axios;
        this.baseurl = "http://api.steampowered.com";
        this.apiKey = apiKey;

        // const Labels = this.getArrays(apiLabelsArray);

        // this.labels = Labels[1];
        // this.apiLabels = Labels[0];

        this.apiLabels = apiLabelsArray;
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
        const apiURL = this.constructURL(`/ISteamUserStats/GetUserStatsForGame/v002/?appid=730&key=${this.apiKey}&steamid=${steamID}`)
    
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

            this.getValuableIndex(status.playerstats.stats);
            
            const formatedData = this.getValuableInfo(status.playerstats.stats);

            const formatedAchievments = await this.formatAchievements(status.playerstats.achievements);

            return [formatedData, formatedAchievments];
        } catch(error) {
            return error;
        }
    }

    getWeaponsStats = async (userName: string) => {
        try {
            const status = await this.getStatusByName(userName);

            const response = this.formatWeaponsStats(status.playerstats.stats);
    
            return response;
        } catch(error) {
            return error;
        }
    }

    formatWeaponsStats(stats: Array<any>) {
        const totalContributionScore = stats[40].value;
        const totalheadShotsKills = stats[25].value;
        const totalPlantedBombs = stats[3].value;
        const totalDefusedBombs = stats[4].value;
        const totalKillsKnife = stats[9].value;
        const totalKillsGrenade = stats[10].value;
        const totalKillsMolotov = stats[179].value;
        const totalKillsDecoy = stats[180].value;

        const weaponStats = {
            glockStats: this.constructWeaponProps(stats, 11, "pistol", 50, 64),
            deagleStats: this.constructWeaponProps(stats, 12, "pistol", 49, 63),
            eliteStats: this.constructWeaponProps(stats, 13, "pistol", 51, 65),
            fivesevenStats: this.constructWeaponProps(stats, 14, "pistol", 52, 66),
            xm1014Stats: this.constructWeaponProps(stats, 15, "heavy", 61, 75),
            mac10Stats: this.constructWeaponProps(stats, 16, "smg", 59, 73),
            ump45Stats: this.constructWeaponProps(stats, 17, "smg", 60, 74),
            p90Stats: this.constructWeaponProps(stats, 18, "smg", 58, 72),
            awpStats: this.constructWeaponProps(stats, 19, "rifle", 53, 67),
            ak47Stats: this.constructWeaponProps(stats, 20, "rifle", 54, 68),
            augStats: this.constructWeaponProps(stats, 21, "rifle", 55, 69),
            famasStats: this.constructWeaponProps(stats, 22, "rifle", 56, 70),
            g3sg1Stats: this.constructWeaponProps(stats, 23, "rifle", 57, 71),
            m249Stats: this.constructWeaponProps(stats, 24, "heavy", 62, 76),
            hkp2000Stats: this.constructWeaponProps(stats, 136, "pistol", 137, 138),
            p250Stats: this.constructWeaponProps(stats, 140, "pistol", 141, 139),
            sg556Stats: this.constructWeaponProps(stats, 142, "rifle", 143, 144),
            scar20Stats: this.constructWeaponProps(stats, 146, "rifle", 147, 144),
            ssg08Stats: this.constructWeaponProps(stats, 150, "rifle", 148, 149),
            mp7Stats: this.constructWeaponProps(stats, 153, "smg", 151, 152),
            mp9Stats: this.constructWeaponProps(stats, 154, "smg", 155, 156),
            novaStats: this.constructWeaponProps(stats, 158, "heavy", 159, 157),
            negevStats: this.constructWeaponProps(stats, 161, "heavy", 162, 160),
            sawedoffStats: this.constructWeaponProps(stats, 165, "heavy", 163, 164),
            bizonStats: this.constructWeaponProps(stats, 168, "smg", 166, 167),
            tec9Stats: this.constructWeaponProps(stats, 169, "pistol", 170, 171),
            mag7Stats: this.constructWeaponProps(stats, 174, "heavy", 172, 173),
            m4a1Stats: this.constructWeaponProps(stats, 177, "rifle", 182, 185),
            galilarStats: this.constructWeaponProps(stats, 178, "rifle", 183, 186),
            taserStats: this.constructWeaponProps(stats, 181, "utility", 184),
        }

        return {
            totalContributionScore,
            totalheadShotsKills,
            totalPlantedBombs,
            totalDefusedBombs,
            totalKillsKnife,
            totalKillsGrenade,
            totalKillsMolotov,
            totalKillsDecoy,
            weaponStats
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

    constructWeaponProps(stats: Array<any>,kills: number, type: string, shots?: number, hits?: number) {
        let accuracy = null;

        if (hits && shots) {
            accuracy = (Math.round(stats[hits].value * 10000 / stats[shots].value))/100;
        }

        return {
            kills: stats[kills].value,
            shots: shots ? stats[shots].value : null,
            hits: hits ? stats[hits].value : null,
            type: type,
            accuracy: accuracy,
        }
    }

    // getArrays(apiLabelArray: Array<any>) {
    //     const apiLabels: Array<string> = [];
    //     const Labels: Array<string> = [];

    //     apiLabelArray.map((element) => {
    //         apiLabels.push(element.api_label);
    //         Labels.push(element.label);
    //     });

    //     return [apiLabels, Labels];

    // }

    formatAchievements(apiArray: Array<any>) {
        const founds: Array<any> = [];

        this.apiLabels.map( apiElement => {
            apiArray.some((element: any) => {
                if (element.name === apiElement.api_label) {
                    founds.push(apiElement);
                }
            });
        });

        return founds;
    }

    getValuableIndex(stats: Array<any>) {
        stats.map((element, index) => {
            if (element.name === "total_kills_taser") {
                console.log(index)
                console.log(element)
            }
            if (element.name === "total_shots_taser") {
                console.log(index) 
                console.log(element)

            }
            if (element.name === "total_hits_taser") {
                console.log(index) 
                console.log(element)

            }
        })
    }

}