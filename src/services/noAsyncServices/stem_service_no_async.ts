interface WeaponStaticProps {
    kills:number
    hits:number
    shots:number 
}

export class SteamHandleDataService {
    baseurl: string;
    apiLabels: Array<any>;

    constructor(
        // Array Label for conversion of the Achievments labels
        apiLabelsArray: Array<any>
    ) {
        this.baseurl = "http://api.steampowered.com";
        this.apiLabels = apiLabelsArray;
    }

    constructURL(finalURL: string) {
        const baseURL = this.baseurl;
        
        const newURL = baseURL.concat(finalURL)

        return newURL;
    }

    formatWeaponsStats(stats: Array<any>) {
        const Data = {
            totalContributionScore: stats[40].value,
            totalheadShotsKills: stats[25].value,
            totalPlantedBombs: stats[3].value,
            totalDefusedBombs: stats[4].value,
            totalKillsKnife: stats[9].value,
            totalKillsGrenade: stats[10].value,
            totalKillsMolotov: stats[179].value,
            totalKillsDecoy: stats[180].value,

            glockStats: this.constructWeaponProps(stats, 11, 50, 64),
            deagleStats: this.constructWeaponProps(stats, 12, 49, 63),
            eliteStats: this.constructWeaponProps(stats, 13, 51, 65),
            fivesevenStats: this.constructWeaponProps(stats, 14, 52, 66),
            xm1014Stats: this.constructWeaponProps(stats, 15, 61, 75),
            mac10Stats: this.constructWeaponProps(stats, 16, 59, 73),
            ump45Stats: this.constructWeaponProps(stats, 17, 60, 74),
            p90Stats: this.constructWeaponProps(stats, 18, 58, 72),
            awpStats: this.constructWeaponProps(stats, 19, 53, 67),
            ak47Stats: this.constructWeaponProps(stats, 20, 54, 68),
            augStats: this.constructWeaponProps(stats, 21, 55, 69),
            famasStats: this.constructWeaponProps(stats, 22, 56, 70),
            g3sg1Stats: this.constructWeaponProps(stats, 23, 57, 71),
            m249Stats: this.constructWeaponProps(stats, 24, 62, 76),
            hkp2000Stats: this.constructWeaponProps(stats, 136, 137, 138),
            p250Stats: this.constructWeaponProps(stats, 140, 141, 139),
            sg556Stats: this.constructWeaponProps(stats, 142, 143, 144),
            scar20Stats: this.constructWeaponProps(stats, 146, 147, 144),
            ssg08Stats: this.constructWeaponProps(stats, 150, 148, 149),
            mp7Stats: this.constructWeaponProps(stats, 153, 151, 152),
            mp9Stats: this.constructWeaponProps(stats, 154, 155, 156),
            novaStats: this.constructWeaponProps(stats, 158, 159, 157),
            negevStats: this.constructWeaponProps(stats, 161, 162, 160),
            sawedoffStats: this.constructWeaponProps(stats, 165, 163, 164),
            bizonStats: this.constructWeaponProps(stats, 168, 166, 167),
            tec9Stats: this.constructWeaponProps(stats, 169, 170, 171),
            mag7Stats: this.constructWeaponProps(stats, 174, 172, 173),
            m4a1Stats: this.constructWeaponProps(stats, 177, 182, 185),
            galilarStats: this.constructWeaponProps(stats, 178, 183, 186),
            taserStats: this.constructWeaponProps(stats, 181, 184),
        };


        return Data;
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