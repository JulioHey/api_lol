import {
    Request,
    Response
} from 'express';

import {
    getSummoner
} from './get_user_name';

import {
    getStatus
} from '../services/get_user_stats';

import {
    getMatchs
} from './get_matchs';


export class SummonerController {
    getSummoner: getSummoner;
    getStatus: getStatus;
    getMatchs: getMatchs;

    constructor(apiKey: string) {
        this.getSummoner = new getSummoner(apiKey);
        this.getStatus = new getStatus(apiKey);
        this.getMatchs = new getMatchs(apiKey);
    }

    info = async (request: Request, response: Response) => {
        try {
            const { name } = request.body;

            const userInfo = await this.getSummoner.getInfo(name);
            return response.send(userInfo);
        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    }

    status = async (request: Request, response: Response) => {
        try {
            const { summonerId } = request.body;

            const userInfo = await this.getStatus.getInfo(summonerId);
            return response.send(userInfo);
        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    }

    matchs = async (request: Request, response: Response) => {
        try {
            const { accountId } = request.body;

            const userInfo = await this.getMatchs.getInfo(accountId);
            return response.send(userInfo);
        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    }
}