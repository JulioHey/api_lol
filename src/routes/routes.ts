import {
    Router
} from 'express';

import * as dotenv from 'dotenv';

import axios from 'axios';

import {
    SummonerController
} from '../services/summonerController';


dotenv.config();

const RiotApiKey = process.env.RIOT_KEY ? process.env.RIOT_KEY : "";
const SteamApiKey = process.env.STEAM_KEY ? process.env.STEAM_KEY : "";

const router = Router();

const getSummonerController = new SummonerController(RiotApiKey, axios, SteamApiKey);

router.get("/summoner", getSummonerController.info);
router.get("/name", getSummonerController.name);
router.get("/status", getSummonerController.status);
router.get("/steamId", getSummonerController.getStatics);
// router.get("/teste", getSummonerController.teste);

export default router;