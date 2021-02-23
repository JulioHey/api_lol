import {
    Request,
    Response
} from 'express';

import { AxiosStatic } from 'axios';


import {
    SteamAPI
} from '../services/steam_services';



export class SteamController {
    SteamAPI: SteamAPI;

    constructor(axios: AxiosStatic, steamAPIKEY: string, achievments: any) {
        this.SteamAPI = new SteamAPI(steamAPIKEY, axios, achievments);
    }

    getStats = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.SteamAPI.getStatics(userName);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

    getWeaponStats = async (request: Request, response: Response) => {
        try {
            const { userName } = request.body;

            const userInfo = await this.SteamAPI.getWeaponsStats(userName);
            
            return response.send(userInfo);
        } catch (error) {
            return response.json(error);
        }
    }

}