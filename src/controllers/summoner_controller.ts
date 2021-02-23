import {
    Request,
    Response
} from 'express';

import { AxiosStatic } from 'axios';

import {
    getSummoner
} from '../services/riot_services';

import {
    LiveClient
} from '../services/live_client_lol';


export class SummonerController {
    getSummoner: getSummoner;
    LiveClient: LiveClient;

    constructor(apiKey: string, axios: AxiosStatic) {
        this.getSummoner = new getSummoner(apiKey, axios);
        this.LiveClient = new LiveClient(axios);
    }

    basicInfo = async (request: Request, response: Response) => {
        try {
            const { name } = request.body;

            const userInfo = await this.getSummoner.getInfoByName(name);
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    basicStatus = async (request: Request, response: Response) => {
        try {
            const { name } = request.body;

            const userInfo = await this.getSummoner.getStatus(name);
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }



    authenticate = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.LiveClient.compareNames(userName);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

}