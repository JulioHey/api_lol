import {
    Request,
    Response
} from 'express';

import { AxiosStatic } from 'axios';

import {
    APIARRAY
} from './achivements_array';

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
    SteamAPI: SteamAPI;

    constructor(apiKey: string, axios: AxiosStatic, steamAPIKEY: string) {
        this.getSummoner = new getSummoner(apiKey, axios);
        this.SteamAPI = new SteamAPI(steamAPIKEY, axios, APIARRAY);
    }

    info = async (request: Request, response: Response) => {
        try {
            const { name } = request.body;

            const userInfo = await this.getSummoner.getInfoByName(name);
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    status = async (request: Request, response: Response) => {
        try {
            const { name } = request.body;

            const userInfo = await this.getSummoner.getStatus(name);
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    getStatics = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.SteamAPI.getStatics(userName);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }
}