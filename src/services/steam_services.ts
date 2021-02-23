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

        const glockStats: WeaponStaticProps = this.constructWeaponProps(stats, 11, 50, 64);
        const deagleStats: WeaponStaticProps = this.constructWeaponProps(stats, 12, 49, 63);
        const eliteStats: WeaponStaticProps = this.constructWeaponProps(stats, 13, 51, 65);
        const fivesevenStats: WeaponStaticProps = this.constructWeaponProps(stats, 14, 52, 66);
        const xm1014Stats: WeaponStaticProps = this.constructWeaponProps(stats, 15, 61, 75);
        const mac10Stats: WeaponStaticProps = this.constructWeaponProps(stats, 16, 59, 73);
        const ump45Stats: WeaponStaticProps = this.constructWeaponProps(stats, 17, 60, 74);
        const p90Stats: WeaponStaticProps = this.constructWeaponProps(stats, 18, 58, 72);
        const awpStats: WeaponStaticProps = this.constructWeaponProps(stats, 19, 53, 67);
        const ak47Stats: WeaponStaticProps = this.constructWeaponProps(stats, 20, 54, 68);
        const augStats: WeaponStaticProps = this.constructWeaponProps(stats, 21, 55, 69);
        const famasStats: WeaponStaticProps = this.constructWeaponProps(stats, 22, 56, 70);
        const g3sg1Stats: WeaponStaticProps = this.constructWeaponProps(stats, 23, 57, 71);
        const m249Stats: WeaponStaticProps = this.constructWeaponProps(stats, 24, 62, 76);
        const hkp2000Stats: WeaponStaticProps = this.constructWeaponProps(stats, 136, 137, 138);
        const p250Stats: WeaponStaticProps = this.constructWeaponProps(stats, 140, 141, 139);
        const sg556Stats: WeaponStaticProps = this.constructWeaponProps(stats, 142, 143, 144);
        const scar20Stats: WeaponStaticProps = this.constructWeaponProps(stats, 146, 147, 144);
        const ssg08Stats: WeaponStaticProps = this.constructWeaponProps(stats, 150, 148, 149);
        const mp7Stats: WeaponStaticProps = this.constructWeaponProps(stats, 153, 151, 152);
        const mp9Stats: WeaponStaticProps = this.constructWeaponProps(stats, 154, 155, 156);
        const novaStats: WeaponStaticProps = this.constructWeaponProps(stats, 158, 159, 157);
        const negevStats: WeaponStaticProps = this.constructWeaponProps(stats, 161, 162, 160);
        const sawedoffStats: WeaponStaticProps = this.constructWeaponProps(stats, 165, 163, 164);
        const bizonStats: WeaponStaticProps = this.constructWeaponProps(stats, 168, 166, 167);
        const tec9Stats: WeaponStaticProps = this.constructWeaponProps(stats, 169, 170, 171);
        const mag7Stats: WeaponStaticProps = this.constructWeaponProps(stats, 174, 172, 173);
        const m4a1Stats: WeaponStaticProps = this.constructWeaponProps(stats, 177, 182, 185);
        const galilarStats: WeaponStaticProps = this.constructWeaponProps(stats, 178, 183, 186);
        const taserStats: WeaponStaticProps = this.constructWeaponProps(stats, 181, 184);

        return {
            totalContributionScore,
            totalheadShotsKills,
            totalPlantedBombs,
            totalDefusedBombs,
            totalKillsKnife,
            totalKillsGrenade,
            totalKillsMolotov,
            totalKillsDecoy,
            glockStats,
            deagleStats,
            eliteStats,
            fivesevenStats,
            xm1014Stats,
            mac10Stats,
            ump45Stats,
            p90Stats,
            awpStats,
            ak47Stats,
            augStats,
            famasStats,
            g3sg1Stats,
            m249Stats,
            hkp2000Stats,
            p250Stats,
            sg556Stats,
            scar20Stats,
            ssg08Stats,
            mp7Stats,
            mp9Stats,
            novaStats,
            negevStats,
            sawedoffStats,
            bizonStats,
            tec9Stats,
            mag7Stats,
            m4a1Stats,
            galilarStats,
            taserStats,
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

    constructWeaponProps(stats: Array<any>,kills: number, shots?: number, hits?: number) {
        return {
            kills: stats[kills].value,
            shots: shots ? stats[shots].value : 0,
            hits: hits ? stats[hits].value : 0,
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