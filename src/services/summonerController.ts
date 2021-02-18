import {
    Request,
    Response
} from 'express';

import { AxiosStatic } from 'axios';

import achievments from './achievmentsOrdered.json';

import {
    getSummoner
} from './get_user_name';

import {
    Test
} from './test';

import {
    SteamAPI
} from './steam';

import {
    LiveClient
} from './live_client_lol';


export class SummonerController {
    getSummoner: getSummoner;
    SteamAPI: SteamAPI;
    // Test: Test;
    LiveClient: LiveClient;

    constructor(apiKey: string, axios: AxiosStatic, steamAPIKEY: string) {
        this.getSummoner = new getSummoner(apiKey, axios);
        this.SteamAPI = new SteamAPI(steamAPIKEY, axios, achievments);
        this.LiveClient = new LiveClient(axios);
        // this.Test = new Test();
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

    name = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.LiveClient.compareNames(userName);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    // Testes
    // teste = async (request: Request, response: Response) => {
    //     try {
    //         const { userName } = request.body;

    //         const userInfo = await this.Test.notNumber();
            
    //         return response.send(userInfo);
    //     } catch (error) {
    //         return response.json(error);
    //     }
    // }
}