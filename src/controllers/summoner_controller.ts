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

import {
    Test
} from '../services/test';


export class SummonerController {
    getSummoner: getSummoner;
    LiveClient: LiveClient;
    Test: Test;

    constructor(apiKey: string, axios: AxiosStatic) {
        this.getSummoner = new getSummoner(apiKey, axios);
        this.LiveClient = new LiveClient(axios);
        this.Test = new Test();
    }

    basicInfo = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.getSummoner.getIdByName(userName);
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

    history = async (request: Request, response: Response) => {
        try {
            const { gameId } = request.body;

            const userInfo = await this.getSummoner.getFullMatchInfo(gameId);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    basicHistory = async (request: Request, response: Response) => {
        try {
            const { userName, server, startMatch, finalMatch } = request.body;

            const userInfo = await this.getSummoner.getBasicMatchesInfo(userName, server, startMatch, finalMatch);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    valorantMatch = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.getSummoner.getValMatchHistory(userName);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    teste = async (request: Request, response: Response) => {
        try {
            const { userName, server, startMatch, finalMatch } = request.body;

            const userInfo = await this.Test.getChampionsIds();
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

}