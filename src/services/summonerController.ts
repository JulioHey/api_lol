import {
    Request,
    Response
} from 'express';

import { AxiosStatic } from 'axios';

import {
    getSummoner
} from './get_user_name';


import {
    getMatchs
} from './get_matchs';

import {
    SteamAPI
} from './steam';


export class SummonerController {
    getSummoner: getSummoner;
    getMatchs: getMatchs;
    SteamAPI: SteamAPI;

    constructor(apiKey: string, axios: AxiosStatic, steamAPIKEY: string) {
        this.getSummoner = new getSummoner(apiKey, axios);
        this.getMatchs = new getMatchs(apiKey, axios);
        this.SteamAPI = new SteamAPI(steamAPIKEY, axios);
    }

    info = async (request: Request, response: Response) => {
        try {
            const { name } = request.body;

            const userInfo = await this.getSummoner.getInfoByName(name);
            return response.send(userInfo);
        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    }

    status = async (request: Request, response: Response) => {
        try {
            const { name } = request.body;

            const userInfo = await this.getSummoner.getStatus(name);
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

    getStatics = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.SteamAPI.getStatics(userName);
            return response.send(userInfo);
        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    }
}