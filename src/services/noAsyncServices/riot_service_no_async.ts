export class LOLHistoryService {
    encodeSummonerName(summoner: string) {
        const ç = /ç/ig;
        const space = / /ig;

        const newSummoner1 = summoner.replace(ç, "%C3%A7");
        const newSummoner2 = newSummoner1.replace(space, "%20");

        return newSummoner2;
    }

    createUrl( finalURL: string, server: string = "br1"){
        const baseURL = `https://${server}.api.riotgames.com/`;

        const url = baseURL.concat(finalURL);

        return url;
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

    handleBasicMatchData(data: any, summonerName: string) {
        try {const {participantIdentities, participants, teams} = data;

            const teamData = this.getTeamData(teams);

            const {arrayPlayerInfo, playerId} = this.getPlayersNicksAndId(participantIdentities, summonerName);

            const newParcipantsArray = this.handleBasicPlayersData(participants, arrayPlayerInfo, teamData, playerId);

            const sortedPlayerArray = this.sortPlayersByRoll(newParcipantsArray);
            return {sortedPlayerArray, teamData};
        } catch(error) {
            console.log(error)
            return error;
        }
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

    sliceMatchesArray(data: any, firstMatch: number = 0, lastMatch:number = 5) {
        const {matches} = data;

        const selectedmatches = matches.slice(firstMatch, lastMatch);

        return selectedmatches;
    }

    handleMatchData(data: any) {
        const {participantIdentities, participants, teams} = data;

        const teamData = this.getTeamData(teams);

        const baseParticipantsArray = this.getPlayersNicks(participantIdentities);

        const newParcipantsArray = this.handleFullPlayersData(participants, baseParticipantsArray, teamData);

        const sortedPlayerArray = this.sortPlayersByRoll(newParcipantsArray);

        return {sortedPlayerArray, teamData};
    }

    getPlayersNicks(participantsIdentities: Array<any>) {
        const arrayPlayerInfo: Array<any> = [];


        participantsIdentities.map((element) => {
            arrayPlayerInfo.push({
                summonerName: element.player.summonerName
            });
        });

        return arrayPlayerInfo;
    }

    getPlayersNicksAndId(participantsIdentities: Array<any>, summonerName: string) {
        const arrayPlayerInfo: Array<any> = [];

        var playerId: string = "";

        participantsIdentities.map((element) => {
            if (element.player.summonerName === summonerName) {
                playerId = element.participantId
            }
            arrayPlayerInfo.push({
                summonerName: element.player.summonerName
            });
        });

        return {arrayPlayerInfo, playerId};
    }

    handlePlayerRole(data: any, side: string) {
        let sum = 0;
        if (side === "red") {
            sum  = 5;
        }

        switch (data.timeline.lane) {
            case "MIDDLE":
                return ["MidLaner", (3 + sum)];
            case "JUNGLE":
                return ["Jungler", (2 + sum)];
            case "TOP":
                return ["TopLaner", (1 + sum)];
            case "BOTTOM":
                if (data.timeline.role === "DUO_SUPPORT") {
                    return ["Support", (5 + sum)];
                } else {
                    return ["AdCarry", (4 + sum)];
                }
        }
    }

    handleFullPlayersData(participants: Array<any>, baseParticipantsArray: Array<any>, teamArray: Array<any>) {
        participants.map((element, index) => {
            const side = index > 4 ? "red" : "blue";

            const playerRole = this.handlePlayerRole(element, side);

            baseParticipantsArray[index].roll = playerRole;
            baseParticipantsArray[index].spell1 = element.spell1Id;
            baseParticipantsArray[index].spell2 = element.spell2Id;
            baseParticipantsArray[index].champLevel = element.champLevel;
            baseParticipantsArray[index].champion = element.championId;
            baseParticipantsArray[index].damageDealt = element.stats.totalDamageDealtToChampions;

            baseParticipantsArray[index].kda = this.contructKDA(element.stats);
            baseParticipantsArray[index].items = this.constructItemsData(element.stats);

            if (side === "blue") {
                teamArray[0].totalDamageDealt += element.stats.totalDamageDealtToChampions;
            } else {
                teamArray[1].totalDamageDealt += element.stats.totalDamageDealtToChampions;
            }
        });

        return baseParticipantsArray;
    }

    handleBasicPlayersData(participants: Array<any>, baseParticipantsArray: Array<any>, teamArray: Array<any>, summonerId: any) {
        participants.map((element, index) => {
            const side = index > 4 ? "red" : "blue";

            const playerRole = this.handlePlayerRole(element, side);

            baseParticipantsArray[index].roll = playerRole;

            if (element.participantId === summonerId) {
                baseParticipantsArray[index].spell1 = element.spell1Id;
                baseParticipantsArray[index].spell2 = element.spell2Id;
                baseParticipantsArray[index].champLevel = element.champLevel;
                baseParticipantsArray[index].damageDealt = element.stats.totalDamageDealtToChampions;
    
                baseParticipantsArray[index].kda = this.contructKDA(element.stats);
                baseParticipantsArray[index].items = this.constructItemsData(element.stats);
            }
            baseParticipantsArray[index].champion = element.championId;

        });

        return baseParticipantsArray;
    }

    sortPlayersByRoll(baseParticipantsArray: Array<any>) {
        const sortedPlayerArray = baseParticipantsArray.sort((a, b) => a.roll[1] - b.roll[1]);

        return sortedPlayerArray;
    }

    contructKDA(data: any) {
        return {
            kills: data.kills,
            deaths: data.deaths,
            assists: data.assists,
        }
    }

    constructItemsData(data: any) {
        return {
            item0: data.item0,
            item1: data.item1,
            item2: data.item2,
            item3: data.item3,
            item4: data.item4,
            item5: data.item5,
            item6: data.item6,
        }
    }

    getTeamData(data: any) {
        return [{
            win: data[0].win,
            towers: data[0].towerKills,
            barons: data[0].baronKills,
            dragons: data[0].dragonKills,
            bans: [
                data[0].bans[0].championId,
                data[0].bans[1].championId,
                data[0].bans[2].championId,
                data[0].bans[3].championId,
                data[0].bans[4].championId,
            ],
            totalDamageDealt: 0
        },
        {
            win: data[1].win,
            towers: data[1].towerKills,
            barons: data[1].baronKills,
            dragons: data[1].dragonKills,
            bans: [
                data[1].bans[0].championId,
                data[1].bans[1].championId,
                data[1].bans[2].championId,
                data[1].bans[3].championId,
                data[1].bans[4].championId,
            ],
            totalDamageDealt: 0
        }]
    }
}